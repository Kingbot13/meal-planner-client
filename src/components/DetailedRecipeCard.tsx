import { Recipe } from "../app/types"


export const DetailedRecipeCard = ({name, description, ingredients, steps}: Recipe) => {

    return (
        <div>
            <p>{name}</p>
            {description && <p>{description}</p>}
            <div>
                <div>
                    <p>Ingredients</p>
                    <ul>
                        {ingredients.map(item => {
                            return (
                                <li>
                                    {item.name}: {item.measurement}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <p>Steps</p>
                    <ol>
                        {steps.map(item => <li>{item.value}</li>)}
                    </ol>
                </div>
            </div>
        </div>
    )
}