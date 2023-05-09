import { RecipeList } from "../components/RecipeList";
import { RecipeForm } from "../components/RecipeForm";
import { useState } from "react";

export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);

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