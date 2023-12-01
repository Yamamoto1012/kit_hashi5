import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import AddMessage from "./AddMesage";

const MessageList = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    // ユーザー情報を取得
    const fetchUser = async (userId) => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    };

    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, async (QuerySnapshot) => {
      const messages = [];
      const usersTemp = { ...users };

      for (const doc of QuerySnapshot.docs) {
        const data = doc.data();
        if (!usersTemp[data.senderId]) {
          usersTemp[data.senderId] = await fetchUser(data.senderId);
        }
        messages.push({ id: doc.id, ...data });
      }

      setUsers(usersTemp);
      setMessages(messages);
    });

    return unsubscribe;
  }, [userId, receiverId]);

  return (
    <div className="flex flex-col justify-between overflow-auto h-[90vh] bg-gray-100 p-4 w-full max-w-2xl mx-auto rounded-2xl">
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === userId ? "justify-end" : "justify-start"
            } items-center m-2`}
          >
            <div
              className={`flex items-center shadow-lg p-3 rounded-lg ${
                message.senderId === userId
                  ? "bg-blue-500 text-white flex-row-reverse"
                  : "bg-gray-300"
              } max-w-xs md:max-w-md`}
            >
              <img
                src={users[message.senderId]?.photoURL}
                alt="User"
                className="rounded-full h-8 w-8 mx-2"
              />
              <div>
                <p className="text-base">{message.message}</p>
                <small className="text-xs text-gray-600">
                  {message.timestamp?.toDate().toLocaleString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white shadow-lg items-center">
        <AddMessage receiverId={receiverId} />
      </div>
    </div>
  );
};

export default MessageList;
