import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import AddMessage from "./AddMesage";

const MessageList = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const currentUserId = auth.currentUser.uid;
  const messagesQuery = query(
    collection(db, "messages"),
    where("senderId", "in", [currentUserId, receiverId]),
    where("receiverId", "in", [currentUserId, receiverId]),
    orderBy("timestamp", "asc")
  );


  useEffect(() => {
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const filteredMessages = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(message =>
          (message.senderId === currentUserId && message.receiverId === receiverId) ||
          (message.senderId === receiverId && message.receiverId === currentUserId)
        );

      filteredMessages.forEach(async message => {
        if (message.receiverId === currentUserId && !message.isRead) {
          const messageRef = doc(db, "messages", message.id);
          await updateDoc(messageRef, { isRead: true }); // isReadをtrueに更新
        }
      });

      setMessages(filteredMessages);
    });

    return unsubscribe;
  }, [currentUserId, receiverId, messagesQuery]);

  useEffect(() => {
    const fetchUser = async (userId) => {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUsers(prevUsers => ({ ...prevUsers, [userId]: userDoc.data() }));
      }
    }
    fetchUser(userId);
    fetchUser(receiverId);
  }, [userId, receiverId]);

  return (
    <div>
      <div className="flex flex-col justify-between overflow-auto h-[90vh] bg-gray-100 p-4 w-full max-w-2xl mx-auto rounded-2xl">
        <div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === userId ? "justify-end" : "justify-start"
                } items-center m-2`}
            >
              <div
                className={`flex items-center shadow-lg p-3 rounded-lg ${message.senderId === userId
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
    </div>
  );
};

export default MessageList;
