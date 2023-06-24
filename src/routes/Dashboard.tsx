import { RecipeList } from "../components/RecipeList";
import { RecipeForm } from "../components/RecipeForm";
import React, { useEffect, useState } from "react";
import { useAddRecipeMutation, useDeleteRecipeMutation, useGetSingleRecipeQuery, useGetUserQuery, useUpdateRecipeMutation } from "../features/api/apiSlice";
import { guestAddRecipe, guestDeleteRecipe, guestUpdateRecipe } from "../features/guest/guestSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import { Logo } from "../components/Logo";
import { FolderTab } from "../components/FolderTab";
import { DetailedRecipeCard } from "../components/DetailedRecipeCard";
import { RecipeCard } from "../components/RecipeCard";
import { getDaysInMonth, getMonth } from "date-fns";
import { CalendarMonth } from "../components/CalendarMonth";
import '../App.css';
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState<{userId: string | null, recipeId: string}>({userId: '', recipeId: ''});
    const [isUpdate, setIsUpdate] = useState(false);
    const [guestRecipeId, setGuestRecipeId] = useState('');
    const [userStatus, setUserStatus] = useState('');

    const {userId} = useParams();

    const {data: user, isLoading, isSuccess, isError} = useGetUserQuery(userId && userId !== 'guest' ? userId : skipToken);

    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const dispatch = useAppDispatch();
    const isGuest = useAppSelector(state => state.guest.isGuest);
    const guestRecipe = useAppSelector((state) => {
        return state.guest.recipes.find(item => item.name === guestRecipeId);
    });

    const allGuestRecipes = useAppSelector(state => state.guest.recipes);

    const {data: recipe} = useGetSingleRecipeQuery(recipeInfo.userId && recipeInfo.userId !== 'guest' ? recipeInfo : skipToken);

    const shuffledRecipes = user ? [...user.shuffledRecipes] : [];

    const todayRecipe = user?.shuffledRecipes[0];

    const daysInMonth = getDaysInMonth(new Date());
    const month = getMonth(new Date());

    useEffect(() => {
        if (isLoading) setUserStatus('Loading user');
        if (isSuccess) setUserStatus(user.firstName);
        if (isError) setUserStatus('Error');
    },[isLoading, isSuccess, user, isError]);

    const handleIngredientChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        let valuesCopy: {name: string, measurement: string}[] = [...ingredientValues];
        valuesCopy[i][e.target.name as 'name' | 'measurement'] = e.target.value;
        setIngredientValues(valuesCopy);
    };

    const handleRecipeChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        let valuesCopy = [...recipeValues];
        valuesCopy[i].value = e.target.value;
        setRecipeValues(valuesCopy);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecipeName(e.target.value);
    }

    const addIngredientFields = () => {
        setIngredientValues([...ingredientValues, {name: "", measurement: ""}]);
    };

    const addRecipeFields = () => {
        setRecipeValues([...recipeValues, {value:""}]);
    }

    const removeIngredientFields = (i: number) => {
        const valuesCopy = [...ingredientValues];
        valuesCopy.splice(i, 1);
        setIngredientValues(valuesCopy);
    }

    const removeRecipeFields = (i: number) => {
        const valuesCopy = [...recipeValues];
        valuesCopy.splice(i, 1);
        setRecipeValues(valuesCopy);
    }

    const submit = async () => {
        const ingredients = [...ingredientValues];
        const ingredientTypes = document.querySelectorAll('option:selected');
        for (let i = 0; i < ingredients.length; i++) {
            ingredientTypes.forEach(e => {
                if (e.id === `ingredientMeasurementType${i}`)  ingredients[i].measurement += e.nodeValue;
            })
            
        }

        if (isGuest) {
            const recipe = {name: recipeName, ingredients, steps: recipeValues};
            if (isUpdate) {
                dispatch(guestUpdateRecipe(recipe));
            } else {
                dispatch(guestAddRecipe(recipe));
            }
        } else {
            try{
                const recipe = {name: recipeName, ingredients, steps: [...recipeValues], userId};
                if (isUpdate) {
                    await updateRecipe(recipe).unwrap();
                } else {
                    await addRecipe(recipe).unwrap();
                }
            } catch(err) {
                console.error(err);
            }
        }
        setIsUpdate(false);
        setIngredientValues([{name: '', measurement: ''}]);
        setRecipeName('');
        setRecipeValues([{value: ''}]);
    }

    // toggle form for recipe updates
    const toggleRecipeUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsUpdate(!isUpdate ? true : false);
        if (e.target instanceof HTMLButtonElement && e.target.dataset.id !== undefined) {
            if (isGuest) {
                setGuestRecipeId(e.target.dataset.id);
                if (guestRecipe) {
                    setIngredientValues(guestRecipe.ingredients);
                    setRecipeName(guestRecipe.name);
                    setRecipeValues(guestRecipe.steps);
                } else {
                    console.log(guestRecipe);
                    throw new Error('could not update guest recipe');
                }
            } else {
                setRecipeInfo({userId: userId as string, recipeId: e.target.dataset.id});
                setIngredientValues(recipe.ingredients);
                setRecipeName(recipe.name);
                setRecipeValues(recipe.steps);
            };

        } else {
            console.log(e.target);
            throw new Error('event target is neither button nor has valid data attribute');
        }
    }

    const removeRecipe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.target instanceof HTMLButtonElement && e.target.dataset.id !== undefined) {
            if (isGuest) {
                dispatch(guestDeleteRecipe(e.target.dataset.id));
            } else {
                try {
                    const recipe = {userId: userId as string, recipeId: e.target.dataset.id};
                    await deleteRecipe(recipe).unwrap();
                } catch (err) {
                    console.error(err);
                }
            }

        }
    }

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const toggleForm = () => {
        setShowForm(!showForm ? true : false);
    }

    

    return (
        <main className="relative flex flex-col w-full min-h-full">
            <Logo />
            <div className="flex flex-col w-full h-full items-center pointer-events-auto">
                <h2 className="text-2xl font-bold text-primary-text">Welcome {isGuest ? 'Guest' : userStatus} </h2>
                <div className="flex flex-col w-full h-full pt-16">
                    {/* color prop is for background color, tabTop for absolutely positioned 'tab' is for positioning from top of parent */}
                    <FolderTab color='bg-warmth'  tabTop={'top-16'} title="Today">
                        <div>
                            {todayRecipe && 
                            <DetailedRecipeCard name={todayRecipe.name} description={todayRecipe.description} ingredients={todayRecipe.ingredients} steps={todayRecipe.steps} _id={todayRecipe._id} />}
                        </div>
                    </FolderTab>
                    <FolderTab color='bg-sea-turtle'  title="Week" tabTop={'top-44'} >
                        {/* grid container */}
                        <div className="grid grid-cols-auto p-4 h-full w-full gap-3">
                            {weekDays.map((day, index) => {
                                return (
                                    <div key={index} className="flex flex-col items-center justify-center border border-primary-text rounded-md shadow-md" >
                                        <p className="font-bold">{day}</p>
                                        {
                                            shuffledRecipes.length > 0 || allGuestRecipes.length > 0 ?
                                            <RecipeCard recipeName={shuffledRecipes[index].name ?? allGuestRecipes[index].name} 
                                                id={shuffledRecipes[index]._id ?? allGuestRecipes[index].name}
                                                recipeUpdate={toggleRecipeUpdate}
                                                deleteRecipe={removeRecipe}    
                                            />
                                            :
                                            <p>No recipes created yet</p>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </FolderTab>
                    <FolderTab color='bg-noon-sky'  title="month" tabTop="top-72" >
                            {
                                shuffledRecipes.length > 0 || allGuestRecipes.length > 0 ?
                                <CalendarMonth recipes={shuffledRecipes.length ? shuffledRecipes : allGuestRecipes} recipeUpdate={toggleRecipeUpdate} deleteRecipe={removeRecipe} />
                                :
                                <p>No recipes created yet</p>
                            }
                    </FolderTab>
                </div>
                <button name="toggle-form" type="button"onClick={toggleForm}>New Recipe</button>
                {showForm && <RecipeForm nameValue={recipeName} ingredientValues={ingredientValues} recipeValues={recipeValues} handleIngredientChange={handleIngredientChange} handleRecipeChange={handleRecipeChange} handleNameChange={handleNameChange} addIngredientFields={addIngredientFields} addRecipeFields={addRecipeFields} removeIngredientFields={removeIngredientFields} removeRecipeFields={removeRecipeFields} submit={submit} />}
            </div>
        </main>
    )
}