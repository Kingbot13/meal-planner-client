import React, { useState } from "react";
import { IngredientInputs } from "./IngredientInputs";

/* 
    create dynamically added form fields (ingredients and cooking instructions)
    allow option to remove fields

*/

export const RecipeForm = () => {
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
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
                   return <IngredientInputs key={index} number={index} value={item} />

                })}
            </form>
            <hr/>
            <p>Steps</p>
            <form id="steps-form">

            </form>
        </div>
    )
}