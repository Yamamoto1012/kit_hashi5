import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Logout () {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out')
                navigate("/")
            })
            .catch((error) => {
                console.log('Logout error: ', error.message)
            });
    };

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default Logout