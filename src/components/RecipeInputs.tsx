import { RecipeInputProps } from "../app/types";

export const RecipeInputs = ({onChange, value, number, removeField, addField}: RecipeInputProps) => {

    return (
        <div>
            <label htmlFor={`recipeStep${number}`}>Recipe Step</label>
            <input type="text" name='step' onChange={(e) => onChange(number, e)} value={value} required id={`recipeStep${number}`} />
            <button type="button" onClick={()=> removeField(number)}>X</button>
            <button type="button" onClick={() => addField()} >Add Step</button>
        </div>
    )
}