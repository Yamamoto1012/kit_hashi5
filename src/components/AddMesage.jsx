import React, { useState } from 'react'
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const AddMesage = ({ receiverId }) => {
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
    <form onSubmit={sendMessage}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">送信</button>
    </form>
  )
}

export default AddMesage