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

    const handleChange = (e: any) => {
        const userDataCopy = {...userData};
        userDataCopy[e.target.name] = e.target.value;
        setUserData(userDataCopy);
    }

    const canSubmit = [userData.password, userData.username].every(Boolean);

    [logIn, {data}] = useLogInMutation();

    const handleSubmit = async () => {
        if (canSubmit) {
            try {
                await logIn(userData).unwrap();
                setUserData({username: '', password: ''});
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user._id);
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
                    <input type='text' name="username" id="username" onChange={(e) => handleChange(e)} value={userData.username} />
                    <label htmlFor="password">Password:</label>
                    <input type='password' name="password" id="password" onChange={(e) => handleChange(e)} value={userData.password} />
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </form>
                <hr/>
                <h2>Sign In as Guest</h2>
                <button type="button" onClick={guestSignIn}>Guest Sign In</button>
            </div>
        </div>
    )
}