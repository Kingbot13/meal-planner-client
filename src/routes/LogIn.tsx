/* 
    shouldn't need to use React Router's form apis since this project will use RTK Query

    guest sign in can be a function that sets an item in local storage to reflect guest status 
*/
import { redirect } from "react-router-dom";

export const LogIn = () => {
    const guestSignIn = () => {
        const storage = localStorage;
        storage.getItem('guest') ? redirect('/') 
        :
        storage.setItem('guest', 'true');
        redirect('/');
    }
    return (
        <div>
            <div>
                <h1>Register or Log In</h1>
                <form>
                    <label htmlFor="username">Email:</label>
                    <input type='text' name="username" id="username"></input>
                    <label htmlFor="firstName">First Name:</label>
                    <input type='text' name="firstName" id="firstName"></input>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type='text' name="lastName" id="lastName"></input>
                    <label htmlFor="password">Password:</label>
                    <input type='password' name="password" id="password"></input>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type='password' name="confirmPassword" id="confirmPassword"></input> 
                </form>
                <hr/>
                <h2>Sign In as Guest</h2>
                <button type="button" onClick={guestSignIn}>Guest Sign In</button>
            </div>
        </div>
    )
}