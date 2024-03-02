import React, { useState } from 'react';
import './Title.css';
import search_icon from '../Assets/search_icon.svg';

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    setInput(value);
    // fetchData(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setInput(input);
      console.log(input);
      setResults(input);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search ISBN..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <img src={search_icon} alt="" />
    </div>
  );
};
