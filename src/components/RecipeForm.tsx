import React from "react";

/* 
    create dynamically added form fields (ingredients and cooking instructions)
    ingredient name, measurement and measurement type
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
                <div>
                    <input type='text' name="ingredient0" id="ingredient0" />
                    <input type='text' name="ingredientMeasurement0" id="ingredientMeasurement0" placeholder="1 1/2" />
                    <select name="ingredientMeasurementType0" id="ingredientMeasurementType0">
                        <option value='cup(s)'>Cup(s)</option>
                        <option value='Oz(s)'>Oz</option>
                        <option value='tablespoon(s)'>Tablespoon(s)</option>
                        <option value='teaspoon(s)'>Teaspoon(s)</option>
                    </select>
                    <button type="button">X</button>
                </div>
            </form>
            <hr/>
            <p>Steps</p>
            <form id="steps-form">

            </form>
        </div>
    )
}