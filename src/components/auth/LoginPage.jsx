import React from 'react';
import Login from '../auth/Login'; // 既存のLoginコンポーネントをインポート

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-5">ログインしてください</h2>
        <p className="mb-4">続行するにはGoogleアカウントでログインしてください。</p>
        <Login />
      </div>
    </div>
  );
}
