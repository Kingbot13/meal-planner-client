import { RecipeList } from "../components/RecipeList";
import { RecipeForm } from "../components/RecipeForm";
import { useState } from "react";
import { useAddRecipeMutation, useDeleteRecipeMutation, useGetSingleRecipeQuery, useUpdateRecipeMutation } from "../features/api/apiSlice";
import { guestUtils } from "../app/guestUtils";


export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState({userId: '', recipeId: ''});
    const [isUpdate, setIsUpdate] = useState(false);

    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();
    const [deleteRecipe] = useDeleteRecipeMutation();

    const {data: recipe, isLoading} = useGetSingleRecipeQuery(recipeInfo);

    const {isGuest, getGuestSingleRecipe} = guestUtils;

    const handleIngredientChange = (i: number, e: any) => {
        let valuesCopy = [...ingredientValues];
        valuesCopy[i][e.target.name] = e.target.value;
        setIngredientValues(valuesCopy);
    };

    const handleRecipeChange = (i: number, e: any) => {
        let valuesCopy = [...recipeValues];
        valuesCopy[i][e.target.name] = e.target.value;
        setRecipeValues(valuesCopy);
    }

    const handleNameChange = (e: any) => {
        setRecipeName(e.target.value);
    }

    const addIngredientFields = () => {
        setIngredientValues([...ingredientValues, {name: "", measurement: ""}]);
    };

    const addRecipeFields = () => {
        setRecipeValues([...recipeValues, {value:""}]);
    }

    const removeIngredientFields = (i: number) => {
        const valuesCopy = [...ingredientValues];
        valuesCopy.splice(i, 1);
        setIngredientValues(valuesCopy);
    }

    const removeRecipeFields = (i: number) => {
        const valuesCopy = [...recipeValues];
        valuesCopy.splice(i, 1);
        setRecipeValues(valuesCopy);
    }

    const submit = async () => {
        if (isGuest) {
            if (isUpdate) {
                const recipe = {ingredientValues, recipeValues};
                guestUtils.updateRecipe(recipeName, recipe);
            } else {
                guestUtils.saveRecipe(recipeName, ingredientValues, recipeValues);
            }
        } else {
            try{
                const recipe = {name: recipeName, ingredients: [...ingredientValues], steps: [...recipeValues], userId: localStorage.getItem('userId')};
                if (isUpdate) {
                    await updateRecipe(recipe).unwrap();
                } else {
                    await addRecipe(recipe).unwrap();
                }
            } catch(err) {
                console.error(err);
            }
        }
        setIsUpdate(false);
        setIngredientValues([{name: '', measurement: ''}]);
        setRecipeName('');
        setRecipeValues([{value: ''}]);
    }

    const toggleRecipeUpdate = (e) => {
        setIsUpdate(!isUpdate ? true : false);
        if (isGuest) {
            const recipe = getGuestSingleRecipe(e.target.dataId);
            setIngredientValues(recipe.ingredients);
            setRecipeName(recipe.name);
            setRecipeValues(recipe.steps);
        } else {
            setRecipeInfo({userId: localStorage.getItem('userId'), recipeId: e.target.dataId});
            setIngredientValues(recipe.ingredients);
            setRecipeName(recipe.name);
            setRecipeValues(recipe.steps);
        };
    }

    const removeRecipe = async (e) => {
        if (isGuest) {
            guestUtils.deleteRecipe(e.target.dataId);
        } else {
            try {
                const recipe = {userId: localStorage.getItem('userId'), recipeId: e.target.dataId};
                await deleteRecipe(recipe).unwrap();
            } catch (err) {
                console.error(err);
            }
        }
    }


    const toggleForm = () => {
        setShowForm(!showForm ? true : false);
    }

    return (
        <main>
            <div>
                <RecipeList recipeUpdate={toggleRecipeUpdate} deleteRecipe={removeRecipe} />
            </div>
            <button type="button"onClick={toggleForm}>New Recipe</button>
            {showForm && <RecipeForm ingredientValues={ingredientValues} recipeValues={recipeValues} handleIngredientChange={handleIngredientChange} handleRecipeChange={handleRecipeChange} handleNameChange={handleNameChange} addIngredientFields={addIngredientFields} addRecipeFields={addRecipeFields} removeIngredientFields={removeIngredientFields} removeRecipeFields={removeRecipeFields} submit={submit} />}
        </main>
    )
}