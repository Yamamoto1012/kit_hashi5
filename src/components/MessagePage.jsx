import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageMember from './MessageMember';
import { auth } from '../firebase';
import MessageList from './MesageList';

const MessagesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>{ !auth.currentUser ? (
      <div>
        ログインしてください
      </div>
    ) :(
      <div className='flex'>
        <MessageMember onUserSelect={handleUserSelect} />
        {selectedUserId && <MessageList userId={auth.currentUser.uid} receiverId={selectedUserId} />}
      </div>
    )}
    </div>
  );
};

export default MessagesPage;
