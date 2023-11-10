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
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="検索キーワードを入力してください"
      />
      <button type="submit">検索</button>
    </form>
  );
};

export default SearchQuestionButton;
