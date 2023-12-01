import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import AddMesage from './AddMesage';

const MessageList = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (QuerySnapshot) => {
      const filterdMessages = QuerySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(message => (message.senderId === userId && message.receiverId === receiverId) || (message.senderId === receiverId && message.receiverId === userId));
      setMessages(filterdMessages);
    });

    return unsubscribe;
  }, [userId, receiverId]);

  return (
    <div>
      {messages.map(message => (
        <p key={message.id}>{message.message}</p>
      ))}
      <AddMesage receiverId={receiverId} />
    </div>

  )
}

export default MessageList