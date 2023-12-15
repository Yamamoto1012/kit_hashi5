import React, {useEffect, useState} from "react";
import Announcement from "./Announcement";
import {auth, db} from "../firebase";

const AnnouncementPage = () => {
    const [ unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        // Firestoreから未読メッセージ数を取得するロジック
        const fetchUnreadMessages = async () => {
            const currentUserId = auth.currentUser.uid;
            try {
                const querySnapshot = await db.collection('messages')
                    .where('receiverId', '==', currentUserId)
                    .where('isRead', '==', false)
                    .get();

                // 未読メッセージ数を設定
                setUnreadMessages(querySnapshot.size);
            } catch (error) {
                console.error('Error fetching unread messages:', error);
            }
        };

        fetchUnreadMessages();
    }, []);

    return(
        <div>
            <Announcement unreadMessages={unreadMessages} />
        </div>
    )
}

export default AnnouncementPage;