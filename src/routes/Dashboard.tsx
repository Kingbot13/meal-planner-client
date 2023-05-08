import { RecipeList } from "../components/RecipeList";
import { RecipeForm } from "../components/RecipeForm";
import { useState } from "react";

export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);


    return (
        <main>
            <div>
                <RecipeList />
            </div>
            <button type="button"onClick={()=> setShowForm(!showForm ? true : false)}>New Recipe</button>
            {showForm && <RecipeForm />}
        </main>
    )
}