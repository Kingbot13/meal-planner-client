import { getDaysInMonth, getMonth } from "date-fns";
import React from "react";
import { GuestRecipe, Recipe } from "../app/types";
import { CalendarDay } from "./CalendarDay";
import { RecipeCard } from "./RecipeCard";




interface propTypes {
    recipes: any[],
    recipeUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void,
    deleteRecipe: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const CalendarMonth = ({recipes, recipeUpdate, deleteRecipe}: propTypes) => {

    const month = getMonth(new Date());
    const daysInMonth = getDaysInMonth(new Date());
    const recipeCopy = recipes.slice(0, daysInMonth);

    return (
        <div data-testid='cm'>
            <p>{month}</p>
            <div>
                {recipeCopy.map((item, index) => {
                    return (
                    
                        <CalendarDay dayNumber={index + 1} >
                            <RecipeCard recipeName={item.name} id={ item._id ? item._id : item.name} recipeUpdate={recipeUpdate} deleteRecipe={deleteRecipe} />
                        </CalendarDay>
                        
                    )
                })}
            </div>
        </div>
    )
}