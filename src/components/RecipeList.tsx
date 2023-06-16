import { RecipeCard } from "./RecipeCard";
import { useGetUserQuery } from "../features/api/apiSlice";
import { ButtonEvent, Recipe } from "../app/types";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export const RecipeList = ({recipeUpdate, deleteRecipe}: {recipeUpdate: ButtonEvent, deleteRecipe: ButtonEvent}) => {
    const isGuest = useAppSelector(state => state.guest.isGuest);
    const {userId} = useParams();
    const {data: user} = useGetUserQuery(userId && userId !== 'guest' ? userId : skipToken);
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
        <ul className="min-w-full z-50 relative rounded-lg border border-primary-text min-h-full">
            {content.length ? content : <li>No recipes...</li>}
        </ul>
    )
}