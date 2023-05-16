

export const IngredientInputs = (number: number, value: {name: string, measurement: string}, onChange: Function, removeFields: Function) => {
    return (
        <div>
        <input type='text' name='name' id={`ingredient${number}`} value={value.name} onChange={(e) => onChange(number, e)} />
        <input type='text' name='measurement' id={`ingredientMeasurement${number}`} placeholder="1 1/2" value={value.measurement} />
        <select name={`ingredientMeasurementType${number}`} id={`ingredientMeasurementType${number}`}>
            <option value='cup(s)'>Cup(s)</option>
            <option value='Oz(s)'>Oz</option>
            <option value='tablespoon(s)'>Tablespoon(s)</option>
            <option value='teaspoon(s)'>Teaspoon(s)</option>
        </select>
        <button type="button" onClick={() => removeFields(number)}>X</button>
    </div>

    )
}