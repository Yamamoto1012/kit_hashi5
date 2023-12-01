import React, { useState } from 'react';

import MessageMember from './MessageMember';
import { auth } from '../firebase';
import MessageList from './MesageList';

const MessagesPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className='flex'>
      <MessageMember onUserSelect={handleUserSelect} />
      {selectedUserId && <MessageList userId={auth.currentUser.uid} receiverId={selectedUserId} />}
    </div>
  );
};

export default MessagesPage;
