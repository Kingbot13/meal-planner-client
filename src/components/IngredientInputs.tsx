import { IngredientInputProps } from "../app/types"
import { Input } from "./Input"



export const IngredientInputs = ({number, value, onChange, removeField, addField}: IngredientInputProps) => {
    return (
        <div className="flex flex-col w-full items-center">
            <label htmlFor={`ingredient${number}`}>Ingredient Name</label>
            <Input type='text' name='name' id={`ingredient${number}`} value={value.name} onChange={(e) => onChange(number, e)} required />
            <label htmlFor={`ingredientMeasurement${number}`}>Measurement</label>
            <Input type='text' name='measurement' id={`ingredientMeasurement${number}`} placeholder="1 1/2" value={value.measurement} onChange={(e) => onChange(number, e)} required />
            <label htmlFor={`ingredientMeaurementType${number}`}>Measurement Type</label>
            <select name={`ingredientMeasurementType${number}`} id={`ingredientMeasurementType${number}`}>
                <option value=''>Please choose a measurement</option>
                <option value='Cup(s)'>Cup(s)</option>
                <option value='Oz(s)'>Oz</option>
                <option value='lbs'>Lbs</option>
                <option value='Tablespoon(s)'>Tablespoon(s)</option>
                <option value='Teaspoon(s)'>Teaspoon(s)</option>
            </select>
            <button type="button" onClick={() => removeField(number)}>X</button>
            <button type="button" onClick={()=> addField()}>Add ingredient</button>
        </div>

    )
}