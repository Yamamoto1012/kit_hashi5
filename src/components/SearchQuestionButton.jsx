import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchQuestionButton = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 mt-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="検索キーワードを入力してください"
        className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <button 
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        検索
      </button>
    </form>
  );
};

export default SearchQuestionButton;
