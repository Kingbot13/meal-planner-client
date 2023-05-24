import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";

export const Home = () => {

    return (
        <main>
            <div className="flex">
                <h1>Meal Planner</h1>
            </div>
            <div>
                <Link to='/login'>Sign In or Guest Log in</Link>
                <Link to='/register'>Register</Link>
            </div>
        </main>
    )
}