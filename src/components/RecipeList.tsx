import { RecipeCard } from "./RecipeCard";
import { useGetUserRecipesQuery } from "../features/api/apiSlice";

export const RecipeList = () => {
    const userId = localStorage.getItem('userId');
    const {data: []} = useGetUserRecipesQuery(userId);
    const recipes = data.map(recipe => {
        <RecipeCard recipeName={recipe.name}/>
    })
    return(
        <ul>
            {recipes}
        </ul>
    )
}