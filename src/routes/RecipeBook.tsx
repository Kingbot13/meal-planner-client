import { useParams } from "react-router-dom";
import { useDeleteRecipeMutation, useGetUserQuery, useGetSingleRecipeQuery, useAddRecipeMutation, useUpdateRecipeMutation } from "../features/api/apiSlice"
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { User } from "../app/types";
import { Logo } from "../components/Logo";
import { RecipeList } from "../components/RecipeList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { guestDeleteRecipe, guestAddRecipe, guestUpdateRecipe } from "../features/guest/guestSlice";
import { useState } from "react";
import { RecipeForm } from "../components/RecipeForm";


export const RecipeBook = () => {

    const [showForm, setShowForm] = useState(false);
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState<{userId: string | null, recipeId: string}>({userId: '', recipeId: ''});
    const [isUpdate, setIsUpdate] = useState(false);
    const [guestRecipeId, setGuestRecipeId] = useState('');
    const [userStatus, setUserStatus] = useState('');


    const {userId} = useParams();
    const {data: user} = useGetUserQuery(userId && userId !== 'guest' ? userId : skipToken);

    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();



    const guestRecipe = useAppSelector((state) => {
        return state.guest.recipes.find(item => item.name === guestRecipeId);
    });

    const {data: recipe} = useGetSingleRecipeQuery(recipeInfo.userId && recipeInfo.userId !== 'guest' ? recipeInfo : skipToken);


    const isGuest = useAppSelector(state => state.guest.isGuest);
    const dispatch = useAppDispatch();
    const [deleteRecipe] = useDeleteRecipeMutation();

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
    
    const toggleForm = () => {
        setShowForm(!showForm ? true : false);
    }
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


    return (
        <main className="relative flex flex-col w-full min-h-full">
            <Logo />
            <div className="h-full w-full flex flex-col items-center">
                <div className="flex flex-col w-4/5 items-center h-4/5 pt-28">
                    {showForm && <RecipeForm ingredientValues={ingredientValues} recipeValues={recipeValues}  handleIngredientChange={handleIngredientChange} handleRecipeChange={handleRecipeChange} handleNameChange={handleNameChange} addIngredientFields={addIngredientFields} addRecipeFields={addRecipeFields} removeIngredientFields={removeIngredientFields} removeRecipeFields={removeRecipeFields} submit={submit} />}
                    <h2 className="text-2xl font-bold text-primary-text mb-5">Welcome, {userId === 'guest' ? 'guest' : user?.firstName}</h2>
                    <RecipeList deleteRecipe={removeRecipe} recipeUpdate={toggleRecipeUpdate} />
                </div>

            </div>
        </main>
    )
}