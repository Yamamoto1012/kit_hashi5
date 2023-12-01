import React, { useState } from 'react'
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddMessage = ({ receiverId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if(!message.trim()) return;

    const messageData = {
      senderId: auth.currentUser.uid,
      receiverId,
      message,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, 'messages'), messageData);
    setMessage('');
  }

  return (
    <form onSubmit={sendMessage} className="flex justify-center items-center space-x-2 m-2">
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        className="rounded-lg border border-gray-300 p-2"
        placeholder="メッセージを入力" 
      />
      <button type="submit" className="bg-blue-500 text-white rounded-lg p-2">送信</button>
    </form>
  )
}

export default AddMessage;
