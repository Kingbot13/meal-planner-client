// this component could contain small key bits of information such as cooking time
import { useAppSelector } from "../app/hooks";
import { RecipeCardProps } from "../app/types";

export const RecipeCard = ({recipeName, id, recipeUpdate, deleteRecipe}: RecipeCardProps) => {
    const isGuest = useAppSelector(state => state.guest.isGuest);
    return (
        <li className="h-72">
            <div>
                <div>{recipeName}</div>
                <button type="button" data-id={isGuest ? recipeName : id} onClick={(e)=>recipeUpdate(e)}>Update</button>
                <button type="button" data-id={isGuest ? recipeName : id} onClick={(e)=>deleteRecipe(e)} >Delete</button>
            </div>
        </li>
    )
}