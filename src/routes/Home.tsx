import { redirect } from "react-router-dom";

export const Home = () => {

    return (
        <main>
            <h1>Welcome! Please sign in or register</h1>
            <div>
                <button onClick={()=>redirect('/login')}>Sign In</button>
                <button onClick={()=>redirect('/register')}>Register</button>
            </div>
        </main>
    )
}