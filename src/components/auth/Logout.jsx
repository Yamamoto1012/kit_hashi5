import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

function Logout () {
    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out')
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