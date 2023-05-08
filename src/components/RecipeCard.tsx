// this component could contain small key bits of information such as cooking time

export const RecipeCard = (recipeName: string) => {
    return (
        <li>
            <div>
                <div>{recipeName}</div>
                <button type="button">Update</button>
                <button type="button">Delete</button>
            </div>
        </li>
    )
}