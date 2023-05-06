// utility functions for handling guest interactions

export const guestUtils = (() => {
    const storage = localStorage;

    const recipes: object[] = JSON.parse(`${storage.getItem('recipes')}`) ?? [];
    // save recipe
    const saveRecipe = (name: string, ingredients: object[], steps: object[]) => {
        const recipe = {name, ingredients, steps};
        recipes.push(recipe);
        storage.setItem('recipes', JSON.stringify(recipes));
    }

    // delete recipe
    const deleteRecipe = (name: string) => {
        const filteredRecipes = recipes.filter(item => item.name !== name);
        storage.setItem('recipes', JSON.stringify(filteredRecipes));
    }

    // update recipe
    /***
     * updates recipes by filtering recipes that do not contain the same name as the recipe being updated.
     * filtered recipes then add the updated recipe back into the array.
     * updates param will contain the same info needed to create a new recipe (name, ingredients, steps)
     */
    const updateRecipe = (name: string, updates: object) => {
        const filteredRecipes = recipes.filter(item => item.name !== name);
        filteredRecipes.push(updates);
        storage.setItem('recipes', JSON.stringify(filteredRecipes));
    }

    return {saveRecipe, recipes, deleteRecipe, updateRecipe}
})();

