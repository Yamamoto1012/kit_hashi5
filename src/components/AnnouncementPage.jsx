import React, { useEffect, useState } from "react";
import Announcement from "./Announcement";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const AnnouncementPage = () => {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const currentUser = auth.currentUser && auth.currentUser.uid; // null チェック

    useEffect(() => {
        const fetchUnreadMessages = async () => {
            try {
                if (currentUser) { // currentUser が存在するかを確認
                    const messagesQuery = query(
                        collection(db, "messages"),
                        where("receiverId", "==", currentUser),
                        where("isRead", "==", false)
                    );

                    const querySnapshot = await getDocs(messagesQuery);
                    const unreadCount = querySnapshot.size;
                    setUnreadMessages(unreadCount);
                }
            } catch (error) {
                console.error("未読メッセージの取得エラー:", error);
            }
        };
        fetchUnreadMessages();
    }, [currentUser]);

    return (
        <div>
            {!currentUser ? (
                <Announcement unreadMessages={0} />
            ) : (
                <Announcement unreadMessages={unreadMessages} />
            )}
        </div>
    );
};

export default AnnouncementPage;
