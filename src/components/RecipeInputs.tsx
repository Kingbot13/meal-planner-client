

export const RecipeInputs = (onChange: Function, value: string, number: number, removeFields: Function, addField: Function) => {

    return (
        <div>
            <input type="text" onChange={(e) => onChange(number, e)} value={value} />
            <button type="button" onClick={()=> removeFields(number)}>X</button>
            <button type="button" onClick={() => addField()} >Add Step</button>
        </div>
    )
}