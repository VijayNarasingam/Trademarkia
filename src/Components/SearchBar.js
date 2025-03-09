import React, { useState } from 'react';
import '../Styles.css';
import logo from '../assets/Logo.png'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <input
        type="text"
        placeholder="Search Trademark..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
