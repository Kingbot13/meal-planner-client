import { RecipeCard } from "./RecipeCard";
import { useGetUserRecipesQuery } from "../features/api/apiSlice";
import { guestUtils } from "../app/guestUtils";

export const RecipeList = (recipeUpdate: Function, deleteRecipe: Function) => {
    const {isGuest} = guestUtils;
    const userId = localStorage.getItem('userId');
    const {data: recipes=[]} = useGetUserRecipesQuery(userId);
    const content = isGuest? 
        guestUtils.recipes.map(recipe => <RecipeCard recipeName={recipe.name} id={recipe.name} recipeUpdate={recipeUpdate} deleteRecipe={deleteRecipe} /> )
        :
        recipes.map(recipe => {
            return <RecipeCard recipeName={recipe.name} id={recipe._id} recipeUpdate={recipeUpdate} deleteRecipe={deleteRecipe} />
    });
    return(
        <ul>
            {content}
        </ul>
    )
}