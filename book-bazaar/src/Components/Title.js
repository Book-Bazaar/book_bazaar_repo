// src/Title.js

import React, { useState } from 'react';
import './Title.css';
import './darkMode/TitleDarkMode.css'; // Import dark mode styles
import './darkMode/darkModeBtn.css'
import SearchBar from './SearchBar';
import { Profile } from './Profile';
// import { Slbuttons } from './Slbuttons.js';
import logo from '../Assets/book_bazaar_logo.png';
import logo_dark from '../Assets/dark_book_bazaar_logo.png';

import { Link } from 'react-router-dom'; // Import Link component for routing

function Title({ setSearchQuery }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Save the user preference in local storage
    localStorage.setItem('darkMode', !darkMode);
    window.location.reload();
  };

  // Load the user preference from local storage on component mount
  useState(() => {
    const userDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (userDarkMode !== null) {
      setDarkMode(userDarkMode);
    }
  }, []);
  // console.log({ setResults });
  //use results to effect marketplace showing
  return (
    <div className={`Title ${darkMode ? 'dark-mode' : ''}`}>
      {/* Logo space */}
      <Link to="/">
        <img src={darkMode? logo_dark : logo} alt="" className="logo" />
      </Link>
      {/* Search bar space */}
      <SearchBar setSearchQuery={setSearchQuery} />

      <label class='txt'>
          <b>
            {darkMode ? 'Dark' : 'Light'}
        </b>
      </label>
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}></input>
        <span className="slider round"></span>
      </label>
      

      <Profile />
    </div>
  );
}

export default Title;
