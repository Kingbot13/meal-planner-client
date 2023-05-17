import { Link } from "react-router-dom";

export const Home = () => {

    return (
        <main>
            <h1>Welcome! Please sign in or register</h1>
            <div>
                <Link to='/login'>Sign In</Link>
                <Link to='/register'>Sign In</Link>
            </div>
        </main>
    )
}