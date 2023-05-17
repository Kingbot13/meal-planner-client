import { RecipeInputProps } from "../app/types";

export const RecipeInputs = ({onChange, value, number, removeField, addField}: RecipeInputProps) => {

    return (
        <div>
            <input type="text" onChange={(e) => onChange(number, e)} value={value} />
            <button type="button" onClick={()=> removeField(number)}>X</button>
            <button type="button" onClick={() => addField()} >Add Step</button>
        </div>
    )
}