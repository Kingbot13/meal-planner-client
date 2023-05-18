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
        }
        
    }
});

export const {guestSwitch, guestAddRecipe} = guestSlice.actions;

export default guestSlice.reducer