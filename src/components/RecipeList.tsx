import { RecipeCard } from "./RecipeCard";
import { useGetUserQuery } from "../features/api/apiSlice";
import { ButtonEvent, Recipe } from "../app/types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";

export const RecipeList = ({recipeUpdate, deleteRecipe}: {recipeUpdate: ButtonEvent, deleteRecipe: ButtonEvent}) => {
    const {userId=''} = useParams();
    const {data: user} = useGetUserQuery(userId);
    const isGuest = useAppSelector(state => state.guest.isGuest);
    const guestRecipes = useAppSelector(state => state.guest.recipes);
    const recipes: Recipe[] = [];
    
    useEffect(() => {
        if (user) recipes.concat(user.recipes);
    });

    const content = isGuest? 
        guestRecipes.map(recipe => <RecipeCard recipeName={recipe.name} id={recipe.name} recipeUpdate={recipeUpdate} deleteRecipe={deleteRecipe} /> )
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