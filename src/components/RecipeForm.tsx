import React from "react";

/* 
    create dynamically added form fields (ingredients and cooking instructions)
    allow option to remove fields

*/

export const RecipeForm = () => {
    return (
        <div>
            <h2>New Recipe</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input type='text' name="name" id="name" />
            </form>
            <p>Ingredients</p>
            <form id="ingredients-form">
                <input type='text' name="ingredient0" id="ingredient0" />
            </form>
            <hr/>
            <p>Steps</p>
            <form id="steps-form">

            </form>
        </div>
    )
}