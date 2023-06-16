import { useParams } from "react-router-dom";
import { useDeleteRecipeMutation, useGetUserQuery, useGetSingleRecipeQuery } from "../features/api/apiSlice"
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { User } from "../app/types";
import { Logo } from "../components/Logo";
import { RecipeList } from "../components/RecipeList";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { guestDeleteRecipe } from "../features/guest/guestSlice";
import { useState } from "react";


export const RecipeBook = () => {

    const [showForm, setShowForm] = useState(false);
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState<{userId: string | null, recipeId: string}>({userId: '', recipeId: ''});
    const [isUpdate, setIsUpdate] = useState(false);
    const [guestRecipeId, setGuestRecipeId] = useState('');
    const [userStatus, setUserStatus] = useState('');


    const {userId} = useParams();
    const {data: user} = useGetUserQuery(userId && userId !== 'guest' ? userId : skipToken);
    const {recipes} = user as User;

    const guestRecipe = useAppSelector((state) => {
        return state.guest.recipes.find(item => item.name === guestRecipeId);
    });

    const {data: recipe} = useGetSingleRecipeQuery(recipeInfo.userId && recipeInfo.userId !== 'guest' ? recipeInfo : skipToken);


    const isGuest = useAppSelector(state => state.guest.isGuest);
    const dispatch = useAppDispatch();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const removeRecipe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.target instanceof HTMLButtonElement && e.target.dataset.id !== undefined) {
            if (isGuest) {
                dispatch(guestDeleteRecipe(e.target.dataset.id));
            } else {
                try {
                    const recipe = {userId: userId as string, recipeId: e.target.dataset.id};
                    await deleteRecipe(recipe).unwrap();
                } catch (err) {
                    console.error(err);
                }
            }

        }
    }

        // toggle form for recipe updates
        const toggleRecipeUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
            setIsUpdate(!isUpdate ? true : false);
            if (e.target instanceof HTMLButtonElement && e.target.dataset.id !== undefined) {
                if (isGuest) {
                    setGuestRecipeId(e.target.dataset.id);
                    if (guestRecipe) {
                        setIngredientValues(guestRecipe.ingredients);
                        setRecipeName(guestRecipe.name);
                        setRecipeValues(guestRecipe.steps);
                    } else {
                        console.log(guestRecipe);
                        throw new Error('could not update guest recipe');
                    }
                } else {
                    setRecipeInfo({userId: userId as string, recipeId: e.target.dataset.id});
                    setIngredientValues(recipe.ingredients);
                    setRecipeName(recipe.name);
                    setRecipeValues(recipe.steps);
                };
    
            } else {
                console.log(e.target);
                throw new Error('event target is neither button nor has valid data attribute');
            }
        }
    

    return (
        <main>
            <Logo />
            <div>
                {}
                <p>Welcome, {userId === 'guest' ? 'guest' : userId}</p>
                <RecipeList deleteRecipe={removeRecipe} recipeUpdate={toggleRecipeUpdate} />
            </div>
        </main>
    )
}