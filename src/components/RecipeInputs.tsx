import { RecipeInputProps } from "../app/types";
import { Input } from "./Input";

export const RecipeInputs = ({onChange, value, number, removeField, addField}: RecipeInputProps) => {

    return (
        <div>
            <label htmlFor={`recipeStep${number}`}>Recipe Step</label>
            <Input type="text" name='step' onChange={(e) => onChange(number, e)} value={value} required id={`recipeStep${number}`} />
            <button type="button" onClick={()=> removeField(number)}>X</button>
            <button type="button" onClick={() => addField()} >Add Step</button>
        </div>
    )
}