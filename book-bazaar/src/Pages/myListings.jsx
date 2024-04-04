import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';
import '../App.css'; // Import CSS file for styling
import './myListings.css'; // Import CSS file for styling
import Title from '../Components/Title'; // Title component
import Sidebar from '../Components/Sidebar'; // Sidebar component
import Marketplace from '../Components/Marketplace'; // Sidebar component
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  return (
    <div className="app">
      <Title />
      <div className="listing-page-body">
        <div>My Listings</div>
        <div>Inbox</div>
      </div>
    </div>
  );
};

export default MyListings;
