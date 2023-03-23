

export const IngredientInputs = (number: any) => {
    return (
        <div>
        <input type='text' name={`ingredient${number}`} id={`ingredient${number}`} />
        <input type='text' name={`ingredientMeasurement${number}`} id={`ingredientMeasurement${number}`} placeholder="1 1/2" />
        <select name={`ingredientMeasurementType${number}`} id={`ingredientMeasurementType${number}`}>
            <option value='cup(s)'>Cup(s)</option>
            <option value='Oz(s)'>Oz</option>
            <option value='tablespoon(s)'>Tablespoon(s)</option>
            <option value='teaspoon(s)'>Teaspoon(s)</option>
        </select>
        <button type="button">X</button>
    </div>

    )
}