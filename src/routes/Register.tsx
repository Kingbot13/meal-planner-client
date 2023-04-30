import { useState } from "react";
import { redirect } from "react-router-dom";

export const Register = () => {

    const [value, setValues] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: any) => {
        const valueCopy = {...value};
        valueCopy[e.target.name] = e.target.value;
        setValues(valueCopy);
    }

    const handleSubmit = () => {
        
    }
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
                <h1>Register</h1>
                <form>
                    <label htmlFor="username">Email:</label>
                    <input type='text' name="username" id="username" onChange={(e)=>handleChange} value={value.username}></input>
                    <label htmlFor="firstName">First Name:</label>
                    <input type='text' name="firstName" id="firstName" onChange={(e)=>handleChange} value={value.firstName}></input>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type='text' name="lastName" id="lastName" onChange={(e)=>handleChange} value={value.lastName}></input>
                    <label htmlFor="password">Password:</label>
                    <input type='password' name="password" id="password" onChange={(e)=>handleChange} value={value.password}></input>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type='password' name="confirmPassword" id="confirmPassword" onChange={(e)=>handleChange} value={value.confirmPassword}></input> 
                </form>
                <hr/>
                <h2>Sign In as Guest</h2>
                <button type="button" onClick={guestSignIn}>Guest Sign In</button>
            </div>
        </div>
    )
}