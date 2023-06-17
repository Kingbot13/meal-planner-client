import { IngredientInputs } from "./IngredientInputs";
import { RecipeInputs } from "./RecipeInputs";
import { RecipeFormProps } from "../app/types";
import { Input } from "./Input";

export const RecipeForm = (
    {ingredientValues, 
    recipeValues, 
    nameValue,
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
        <form className="absolute rounded-md z-40 space-y-8  flex flex-col w-5/6 shadow-lg border border-primary-text bg-white" name="recipe-form">
            <h2>New Recipe</h2>
            <div className="flex flex-col w-full items-center">
                <label htmlFor="name">Name:</label>
                <Input type='text' value={nameValue} name="name" id="name" onChange={(e)=>handleNameChange(e)} required />
            </div>
            <p>Ingredients</p>
            <div className="flex flex-col w-full" id="ingredients-div">
                {ingredientValues.map((item, index) => {
                   return <IngredientInputs key={index} number={index} value={item} onChange={handleIngredientChange} removeField={removeIngredientFields} addField={addIngredientFields} />

                })}
            </div>
            <hr/>
            <p>Steps</p>
            <div className="flex flex-col w-full" id="steps-div">
                {recipeValues.map((item, index) => {
                    return <RecipeInputs key={index} number={index} value={item.value} onChange={handleRecipeChange} removeField={removeRecipeFields} addField={addRecipeFields} />
                })}
            </div>
            <button type="button" onClick={()=>submit()}>Create New Recipe</button>
        </form>
    )
}