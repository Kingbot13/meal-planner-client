import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { useRegisterMutation } from "../features/api/apiSlice";
import { guestSwitch } from "../features/guest/guestSlice";

export const Register = () => {

    const [value, setValues] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueCopy = {...value};
        valueCopy[e.target.name as 'username' | 'firstName' | 'lastName' | 'password' | 'confirmPassword'] = e.target.value;
        setValues(valueCopy);
    }

    const [register] = useRegisterMutation();

    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        try {
            await register(value).unwrap();
            setValues({
                username: "",
                firstName: "",
                lastName: "",
                password: "",
                confirmPassword: "",
            });
            redirect('/login');
        } catch(err) {
            console.error('error registering new user', err);
        }
    }
    const guestSignIn = () => {
        // const storage = localStorage;
        // storage.getItem('guest') ? redirect('/') 
        // :
        // storage.setItem('guest', 'true');
        dispatch(guestSwitch());
        redirect('/user/guest');
    }
    return (
        <div>
            <div>
                <h1>Register</h1>
                <form>
                    <label htmlFor="username">Email:</label>
                    <input type='text' name="username" id="username" onChange={(e)=>handleChange(e)} value={value.username}></input>
                    <label htmlFor="firstName">First Name:</label>
                    <input type='text' name="firstName" id="firstName" onChange={(e)=>handleChange(e)} value={value.firstName}></input>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type='text' name="lastName" id="lastName" onChange={(e)=>handleChange(e)} value={value.lastName}></input>
                    <label htmlFor="password">Password:</label>
                    <input type='password' name="password" id="password" onChange={(e)=>handleChange(e)} value={value.password}></input>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type='password' name="confirmPassword" id="confirmPassword" onChange={(e)=>handleChange(e)} value={value.confirmPassword}></input> 
                    <button type="button" onClick={handleSubmit}>Register</button>
                </form>
                <hr/>
                <h2>Sign In as Guest</h2>
                <button type="button" onClick={guestSignIn}>Guest Sign In</button>
            </div>
        </div>
    )
}