import React, { useState } from "react";
import { IngredientInputs } from "./IngredientInputs";
import { RecipeInputs } from "./RecipeInputs";
import { useAddRecipeMutation, useGetSingleRecipeQuery } from "../features/api/apiSlice";
import { guestUtils } from "../app/guestUtils";

export const RecipeForm = () => {
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState({userId: '', recipeId: ''});

    const [addRecipe] = useAddRecipeMutation();

    const {data: recipe, isLoading} = useGetSingleRecipeQuery(recipeInfo);

    const {isGuest, getGuestSingleRecipe} = guestUtils;

    const handleIngredientChange = (i: number, e: any) => {
        let valuesCopy = [...ingredientValues];
        valuesCopy[i][e.target.name] = e.target.value;
        setIngredientValues(valuesCopy);
    };

    const handleRecipeChange = (i: number, e: any) => {
        let valuesCopy = [...recipeValues];
        valuesCopy[i][e.target.name] = e.target.value;
        setRecipeValues(valuesCopy);
    }

    const handleNameChange = (e: any) => {
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
    // TODO: add form validation
    const submit = async () => {
        if (isGuest) {
            guestUtils.saveRecipe(recipeName, ingredientValues, recipeValues);
        } else {
            try{
                const recipe = {name: recipeName, ingredients: [...ingredientValues], steps: [...recipeValues], userId: localStorage.getItem('userId')};
                await addRecipe(recipe).unwrap();
                setIngredientValues([{name: '', measurement: ''}]);
                setRecipeName('');
                setRecipeValues([{value: ''}]);
            } catch(err) {
                console.error(err);
            }
        }
    }
    // TODO: finish function
    const updateRecipe = (e) => {
        if (isGuest) {
            const recipe = getGuestSingleRecipe()
        }
    }

    return (
        <div>
            <h2>New Recipe</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input type='text' name="name" id="name" onChange={(e)=>handleNameChange(e)} />
            </form>
            <p>Ingredients</p>
            <form id="ingredients-form">
                {ingredientValues.map((item, index) => {
                   return <IngredientInputs key={index} number={index} value={item} onChange={handleIngredientChange} removeField={removeIngredientFields} addField={addIngredientFields} />

                })}
            </form>
            <hr/>
            <p>Steps</p>
            <form id="steps-form">
                {recipeValues.map((item, index) => {
                    return <RecipeInputs key={index} number={index} value={item} onChange={handleRecipeChange} removeField={removeRecipeFields} addField={addRecipeFields} />
                })}
            </form>
            <button type="button" onClick={submit}>Create New Recipe</button>
        </div>
    )
}