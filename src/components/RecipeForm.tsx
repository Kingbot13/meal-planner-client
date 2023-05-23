import { IngredientInputs } from "./IngredientInputs";
import { RecipeInputs } from "./RecipeInputs";
import { RecipeFormProps } from "../app/types";

export const RecipeForm = (
    {ingredientValues, 
    recipeValues, 
    handleNameChange, 
    handleIngredientChange, 
    handleRecipeChange, 
    removeIngredientFields, 
    addIngredientFields,
    removeRecipeFields,
    addRecipeFields,
    submit 
    }: RecipeFormProps) => {

    return (
        <form name="recipe-form">
            <h2>New Recipe</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type='text' name="name" id="name" onChange={(e)=>handleNameChange(e)} required />
            </div>
            <p>Ingredients</p>
            <div id="ingredients-div">
                {ingredientValues.map((item, index) => {
                   return <IngredientInputs key={index} number={index} value={item} onChange={handleIngredientChange} removeField={removeIngredientFields} addField={addIngredientFields} />

                })}
            </div>
            <hr/>
            <p>Steps</p>
            <div id="steps-div">
                {recipeValues.map((item, index) => {
                    return <RecipeInputs key={index} number={index} value={item.value} onChange={handleRecipeChange} removeField={removeRecipeFields} addField={addRecipeFields} />
                })}
            </div>
            <button type="button" onClick={()=>submit()}>Create New Recipe</button>
        </form>
    )
}