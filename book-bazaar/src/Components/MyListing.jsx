import './MyListing.css';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
// import 'firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import './Inbox.css';

const MyListing = () => {
  return (
    <div className="listing-container">
      <div className="listing-header">My Listings</div>
    </div>
  );
};

export default MyListing;
