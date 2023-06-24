import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { Logo } from "../components/Logo";
import { useRegisterMutation } from "../features/api/apiSlice";
import { guestSwitch } from "../features/guest/guestSlice";
import { Input } from "../components/Input";
import { SubmitButton } from "../components/SubmitButton";
import { Label } from "../components/Label";

export const Register = () => {

    const [value, setValues] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueCopy = {...value};
        valueCopy[e.target.name as 'username' | 'firstName' | 'lastName' | 'password' | 'confirmPassword'] = e.target.value;
        setValues(valueCopy);
    }

    const [register] = useRegisterMutation();

    const dispatch = useAppDispatch();

    const passwordMatches: boolean = value.password === value.confirmPassword;

    const handleSubmit = async () => {
        try {
            if (passwordMatches) {
                await register(value).unwrap();
                setValues({
                    username: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate('/login');
            } else {
                // TODO: replace alert with less annoying form validation
                alert('password does not match');
            }
        } catch(err) {
            console.error('error registering new user', err);
        }
    }
    const guestSignIn = () => {
        dispatch(guestSwitch());
        navigate('/user/guest');
        console.log('guest button clicked');
    }
    return (
        <main className="flex flex-col h-full pointer-events-auto">
            <Logo />
            <div className="flex flex-col items-center justify-between my-8 mx-auto w-1/2 h-[48rem] border-primary-text shadow-md rounded-lg border py-10">
                <h2 className="text-2xl text-primary-text font-bold">Register</h2>
                <div className="flex justify-between w-full px-10">
                    <form className="flex flex-col items-start space-y-4">
                        <Label htmlFor="username" text="Email:" />
                        <Input type='text' name="username" id="username" onChange={(e)=>handleChange(e)} value={value.username} required={true} />
                        <Label htmlFor="firstName" text="First Name:" />
                        <Input type='text' name="firstName" id="firstName" onChange={(e)=>handleChange(e)} value={value.firstName} required={true} />
                        <Label htmlFor="lastName" text="Last Name:" />
                        <Input type='text' name="lastName" id="lastName" onChange={(e)=>handleChange(e)} value={value.lastName} required={true} />
                        <Label htmlFor="password" text="Password:" />
                        <Input type='password' name="password" id="password" onChange={(e)=>handleChange(e)} value={value.password} required={true} />
                        <Label htmlFor="confirmPassword" text="Confirm Password:" />
                        <Input type='password' name="confirmPassword" id="confirmPassword" onChange={(e)=>handleChange(e)} value={value.confirmPassword} required={true}  /> 
                        <div className="flex items-center justify-center w-full">
                            <SubmitButton text="Submit" onClick={handleSubmit} />
                        </div>
                    </form>
                <hr className="h-full border-l-2 border-primary-text"/>
                <button className="text-primary-text" type="button" onClick={guestSignIn}>Guest Sign In</button>
                </div>
            </div>
        </main>
    )
}