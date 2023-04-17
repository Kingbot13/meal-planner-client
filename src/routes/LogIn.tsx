/* 
    rtk query will be used to handle form data
*/
import { redirect } from "react-router-dom";
import { useLogInMutation } from "../features/api/apiSlice";
import { useState } from "react";

export const LogIn = () => {
    const guestSignIn = () => {
        const storage = localStorage;
        storage.getItem('guest') ? redirect('/') 
        :
        storage.setItem('guest', 'true');
        redirect('/');
    }
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
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