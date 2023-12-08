import React, { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const DeleteAnswer = ({ answerId, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      const answerDocRef = doc(db, 'answers', answerId);
      await deleteDoc(answerDocRef);
      onDelete();
      setShowConfirmation(false); // 削除後に確認モーダルを非表示にする
    } catch (error) {
      console.error('Error deleting answer: ', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowConfirmation(true)} className="text-red-500 hover:text-red-700 ml-2">
        Delete
      </button>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="mb-4">本当にこの回答を削除しますか？</p>
            <div className="flex justify-between">
              <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                キャンセル
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAnswer;
