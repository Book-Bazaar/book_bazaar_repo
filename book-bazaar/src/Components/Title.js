// src/Title.js

import React from 'react';
import './Title.css';
import SearchBar from './SearchBar';
import { Profile } from './Profile';
// import { Slbuttons } from './Slbuttons.js';
import logo from '../Assets/book_bazaar_logo.png';
// import profile_icon from '../Assets/user-solid.svg';

function Title({ setSearchQuery }) {
  // console.log({ setResults });
  //use results to effect marketplace showing
  return (
    <div className="Title">
      {/* Logo space */}
      <img src={logo} alt="" className="logo" />
      {/* Search bar space */}
      <SearchBar setSearchQuery={setSearchQuery} />

      <Profile />
    </div>
  );
}

export default Title;
