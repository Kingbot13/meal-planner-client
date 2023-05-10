import { RecipeList } from "../components/RecipeList";
import { RecipeForm } from "../components/RecipeForm";
import { useState } from "react";
import { useAddRecipeMutation, useGetSingleRecipeQuery, useUpdateRecipeMutation } from "../features/api/apiSlice";
import { guestUtils } from "../app/guestUtils";


export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [ingredientValues, setIngredientValues] = useState([{name: "", measurement: ""}]);
    const [recipeValues, setRecipeValues] = useState([{value: ""}]);
    const [recipeName, setRecipeName] = useState("");
    const [recipeInfo, setRecipeInfo] = useState({userId: '', recipeId: ''});

    const [addRecipe] = useAddRecipeMutation();
    const [updateRecipe] = useUpdateRecipeMutation();

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
    // TODO: add form validation
    const submit = async () => {
        if (isGuest) {
            guestUtils.saveRecipe(recipeName, ingredientValues, recipeValues);
        } else {
            try{
                const recipe = {name: recipeName, ingredients: [...ingredientValues], steps: [...recipeValues], userId: localStorage.getItem('userId')};
                await addRecipe(recipe).unwrap();
                setIngredientValues([{name: '', measurement: ''}]);
                setRecipeName('');
                setRecipeValues([{value: ''}]);
            } catch(err) {
                console.error(err);
            }
        }
    }
    // TODO: move function to where it can be reached by RecipeCard's update button. 
    // state may need to be moved up to Dashboard
    const toggleRecipeUpdate = (e) => {
        if (isGuest) {
            const recipe = getGuestSingleRecipe(e.target.dataId);
            setIngredientValues(recipe.ingredients);
            setRecipeName(recipe.name);
            setRecipeValues(recipe.steps);
        } else {
            setIngredientValues(recipe.ingredients);
            setRecipeName(recipe.name);
            setRecipeValues(recipe.steps);
        };
    }


    const toggleForm = () => {
        setShowForm(!showForm ? true : false);
    }

    return (
        <main>
            <div>
                <RecipeList />
            </div>
            <button type="button"onClick={toggleForm}>New Recipe</button>
            {showForm && <RecipeForm />}
        </main>
    )
}