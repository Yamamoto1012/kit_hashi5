import React from 'react'
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
    
const provider = new GoogleAuthProvider();

function Login() {
    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('user logged in: ', result.user);
                console.log('成功');
            })
            .catch((error) => {
                console.error('Login error: ', error.message);
            });
    }

    return (
        <button onClick={login}>
            Login with Google
        </button>
    )
}

export default Login