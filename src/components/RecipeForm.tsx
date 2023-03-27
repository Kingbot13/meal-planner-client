import React, { useState } from "react";
import { IngredientInputs } from "./IngredientInputs";

/* 
    create dynamically added form fields (ingredients and cooking instructions)
    allow option to remove fields

*/

export const RecipeForm = () => {
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);

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
    const addIngredientFields = () => {
        setIngredientValues([...ingredientValues, {name: "", measurement: ""}]);
    };

    const addRecipeFields = () => {
        setRecipeValues([...recipeValues, {value:""}]);
    }

    const removeIngredientFields = (i) => {
        const valuesCopy = [...ingredientValues];
        valuesCopy.splice(i, 1);
        setIngredientValues(valuesCopy);
    }

    const removeRecipeFields = (i) => {
        const valuesCopy = [...recipeValues];
        valuesCopy.splice(i, 1);
        setRecipeValues(valuesCopy);
    }
    return (
        <div>
            <h2>New Recipe</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input type='text' name="name" id="name" />
            </form>
            <p>Ingredients</p>
            <form id="ingredients-form">
                {ingredientValues.map((item, index) => {
                   return <IngredientInputs key={index} number={index} value={item} onChange={handleIngredientChange} removeField={removeIngredientFields} />

                })}
            </form>
            <hr/>
            <p>Steps</p>
            <form id="steps-form">

            </form>
        </div>
    )
}