import { redirect } from "react-router-dom";
import { useSignInMutation } from "../features/api/apiSlice";
import React, { useState } from "react";
import { guestSwitch } from "../features/guest/guestSlice";
import { useAppDispatch } from "../app/hooks";

export const LogIn = () => {

    const dispatch = useAppDispatch();

    const [signIn, {data}] = useSignInMutation();

    const guestSignIn = () => {
        // const storage = localStorage;
        // storage.getItem('guest') ? redirect('/user/guest') 
        // :
        // storage.setItem('guest', 'true');
        dispatch(guestSwitch());
        redirect('/user/guest');
    }
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userDataCopy = {...userData};
        userDataCopy[e.target.name as 'username' | 'password'] = e.target.value;
        setUserData(userDataCopy);
    }

    const canSubmit = [userData.password, userData.username].every(Boolean);


    const handleSubmit = async () => {
        if (canSubmit) {
            try {
                await signIn(userData).unwrap();
                setUserData({username: '', password: ''});
                if (data) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.user._id);
                    redirect(`/user/${data.user._id}`);
                }
            } catch(err) {
                console.error("failed to log in user", err);
            }
        }
    }
    return (
        <div>
            <div>
                <h1>Register or Log In</h1>
                <form>
                    <label htmlFor="username">Email:</label>
                    <input type='text' name="username" id="username" onChange={(e) => handleChange(e)} value={userData.username} required/>
                    <label htmlFor="password">Password:</label>
                    <input type='password' name="password" id="password" onChange={(e) => handleChange(e)} value={userData.password} required/>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </form>
                <hr/>
                <h2>Sign In as Guest</h2>
                <button type="button" onClick={guestSignIn}>Guest Sign In</button>
            </div>
        </div>
    )
}