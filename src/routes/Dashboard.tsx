import { RecipeList } from "../components/RecipeList";
import { RecipeForm } from "../components/RecipeForm";
import React, { useState } from "react";
import { useAddRecipeMutation, useDeleteRecipeMutation, useGetSingleRecipeQuery, useUpdateRecipeMutation } from "../features/api/apiSlice";
import { guestUtils } from "../app/guestUtils";
import { ButtonEvent } from "../app/types";

export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState<{userId: string | null, recipeId: string}>({userId: '', recipeId: ''});
    const [isUpdate, setIsUpdate] = useState(false);

    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const {data: recipe, isLoading} = useGetSingleRecipeQuery(recipeInfo);

    const {isGuest, getGuestSingleRecipe} = guestUtils;

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
        if (isGuest) {
            if (isUpdate) {
                const recipe = {ingredients: ingredientValues, steps: recipeValues};
                guestUtils.updateRecipe(recipeName, recipe);
            } else {
                guestUtils.saveRecipe(recipeName, ingredientValues, recipeValues);
            }
        } else {
            try{
                const recipe = {name: recipeName, ingredients: [...ingredientValues], steps: [...recipeValues], userId: localStorage.getItem('userId')};
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
                const recipe = getGuestSingleRecipe(e.target.dataset.id);
                setIngredientValues(recipe.ingredients);
                setRecipeName(recipe.name);
                setRecipeValues(recipe.steps);
            } else {
                setRecipeInfo({userId: localStorage.getItem('userId'), recipeId: e.target.dataset.id});
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
                guestUtils.deleteRecipe(e.target.dataset.id);
            } else {
                try {
                    const recipe = {userId: localStorage.getItem('userId'), recipeId: e.target.dataset.id};
                    await deleteRecipe(recipe).unwrap();
                } catch (err) {
                    console.error(err);
                }
            }

        }
    }


    const toggleForm = () => {
        setShowForm(!showForm ? true : false);
    }

    return (
        <main>
            <div>
                <RecipeList recipeUpdate={toggleRecipeUpdate} deleteRecipe={removeRecipe} />
            </div>
            <button type="button"onClick={toggleForm}>New Recipe</button>
            {showForm && <RecipeForm ingredientValues={ingredientValues} recipeValues={recipeValues} handleIngredientChange={handleIngredientChange} handleRecipeChange={handleRecipeChange} handleNameChange={handleNameChange} addIngredientFields={addIngredientFields} addRecipeFields={addRecipeFields} removeIngredientFields={removeIngredientFields} removeRecipeFields={removeRecipeFields} submit={submit} />}
        </main>
    )
}