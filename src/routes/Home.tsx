import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <main>
            <h1>Welcome! Please sign in or register</h1>
            <div>
                <Link to='/login'>Sign In or Guest Log in</Link>
                <Link to='/register'>Register</Link>
            </div>
        </main>
    )
}