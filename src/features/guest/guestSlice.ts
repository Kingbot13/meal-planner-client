import { createSlice } from "@reduxjs/toolkit";
import { GuestRecipe } from "../../app/types";

const guestRecipes: GuestRecipe[] = JSON.parse(localStorage.getItem('recipes') as string) || [];

const initialState = {isGuest: false, recipes: [...guestRecipes] };

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        guestSwitch(state) {
            state.isGuest = state.isGuest ? false : true;
        },
        guestAddRecipe(state, action) {
            state.recipes.push(action.payload);
        },
        guestUpdateRecipe(state, action) {
            const {name} = action.payload;
            const filteredRecipes = state.recipes.filter(item => item.name !== name);
            filteredRecipes.push(action.payload);
            state.recipes = filteredRecipes;
        },
        guestDeleteRecipe(state, action) {
            const {name} = action.payload;
            const filteredRecipes = state.recipes.filter(item => item.name !== name);
            state.recipes = filteredRecipes;
        }
        
    }
});

export const {guestSwitch, guestAddRecipe, guestUpdateRecipe, guestDeleteRecipe} = guestSlice.actions;

export default guestSlice.reducer