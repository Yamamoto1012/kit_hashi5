import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
    
const provider = new GoogleAuthProvider();

function Login() {
    const navigate = useNavigate();

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // ユーザーのプロフィールを確認
            const userProfileRef = doc(db, 'users', user.uid);
            const userProfileDoc = await getDoc(userProfileRef);

            if (userProfileDoc.exists()) {
                // プロフィールが既に存在する場合、ホームページにリダイレクト
                navigate('/home');
            } else {
                // プロフィールが存在しない場合、プロフィール作成ページにリダイレクト
                navigate('/create-profile');
            }

        } catch (error) {
            console.error('Login error: ', error.message);
        }
    }

    return (
        <button onClick={login}>
            ログイン
        </button>
    )
}

export default Login;
