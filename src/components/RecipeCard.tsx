// this component could contain small key bits of information such as cooking time
import { guestUtils } from "../app/guestUtils";
import { RecipeCardProps } from "../app/types";

export const RecipeCard = ({recipeName, id, recipeUpdate, deleteRecipe}: RecipeCardProps) => {
    const {isGuest} = guestUtils;
    return (
        <li>
            <div>
                <div>{recipeName}</div>
                <button type="button" data-id={isGuest ? recipeName : id} onClick={(e)=>recipeUpdate(e)}>Update</button>
                <button type="button" data-id={isGuest ? recipeName : id} onClick={(e)=>deleteRecipe(e)} >Delete</button>
            </div>
        </li>
    )
}