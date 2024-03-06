// src/Title.js

import React, { useState } from 'react';
import './Title.css';
import { SearchBar } from './SearchBar';
import { Profile } from './Profile';
// import { Slbuttons } from './Slbuttons.js';
import logo from '../Assets/book_bazaar_logo.png';
// import profile_icon from '../Assets/user-solid.svg';

function Title() {
  const [results, setResults] = useState([]);
  // console.log({ setResults });
  //use results to effect marketplace showing
  return (
    <div className="Title">
      {/* Logo space */}
      <img src={logo} alt="" className="logo" />
      {/* <ul>
        <li>Home</li>
      </ul> */}
      {/* Search bar space */}
      <SearchBar setResults={setResults} />

      {/* Profile space */}
      {/* <img src={profile_icon} alt="" className="profile" /> */}
      <Profile />
      {/* <Slbuttons /> */}
    </div>
  );
}

export default Title;
