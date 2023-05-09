import { RecipeCard } from "./RecipeCard";
import { useGetUserRecipesQuery } from "../features/api/apiSlice";
import { guestUtils } from "../app/guestUtils";

export const RecipeList = () => {
    const {isGuest} = guestUtils;
    const userId = localStorage.getItem('userId');
    const {data: recipes=[]} = useGetUserRecipesQuery(userId);
    const content = isGuest? 
        guestUtils.recipes.map(recipe => <RecipeCard recipeName={recipe.name} id={recipe.name} /> )
        :
        recipes.map(recipe => {
            return <RecipeCard recipeName={recipe.name} id={recipe._id} />
    });
    return(
        <ul>
            {content}
        </ul>
    )
}