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
                    return <RecipeInputs key={index} number={index} value={item.value} onChange={handleRecipeChange} removeField={removeRecipeFields} addField={addRecipeFields} />
                })}
            </form>
            <button type="button" onClick={()=>submit()}>Create New Recipe</button>
        </div>
    )
}