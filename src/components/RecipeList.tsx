import { RecipeCard } from "./RecipeCard";
import { useGetUserRecipesQuery } from "../features/api/apiSlice";

export const RecipeList = () => {
    const userId = localStorage.getItem('userId');
    const {data: recipes=[]} = useGetUserRecipesQuery(userId);
    const content = recipes.map(recipe => {
        return <RecipeCard recipeName={recipe.name} id={recipe._id} />
    })
    return(
        <ul>
            {content}
        </ul>
    )
}