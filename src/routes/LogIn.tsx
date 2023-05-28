import { redirect } from "react-router-dom";
import { useSignInMutation } from "../features/api/apiSlice";
import React, { useState } from "react";
import { guestSwitch } from "../features/guest/guestSlice";
import { useAppDispatch } from "../app/hooks";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { Logo } from "../components/Logo";

export const LogIn = () => {

    const dispatch = useAppDispatch();

    const [signIn, {data}] = useSignInMutation();

    const guestSignIn = () => {
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
        <main className="flex flex-col min-h-full">
            <Logo />
            <div className="flex flex-col items-center py-2 h-96 w-96 rounded-lg mt-8 mx-auto shadow-md border-primary-text border">
                <h2 className="font-bold text-2xl text-primary-text">Log In</h2>
                <form className="flex flex-col h-full items-start justify-evenly">
                    <Label htmlFor="username" text="Email:" />
                    <Input type='text' name="username" id="username" onChange={handleChange} value={userData.username} required={true} />
                    <Label htmlFor="password" text="Password:" />
                    <Input type='password' name="password" id="password" onChange={handleChange} value={userData.password} required={true} />
                    <div className="w-full items-center justify-center flex">
                        <SubmitButton onClick={handleSubmit} text="Submit" />
                    </div>
                </form>
                <hr/>
                <button type="button" onClick={guestSignIn}>Guest Sign In</button>
            </div>
        </main>
    )
}