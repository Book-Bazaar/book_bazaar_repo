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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const MyListing = () => {
  const [fetchedData, setFetchedData] = useState(() => {
    try {
      const storedData = localStorage.getItem('listingData');
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Error retrieving inbox data from local storage:', error);
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // New state variable for delete confirmation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        let fetchedEntries = [];
        if (currentUser) {
          const q = query(
            collection(db, 'Books'),
            where('email', '==', currentUser.email)
          );
          const snapshot = await getDocs(q);
          snapshot.forEach((doc) => {
            fetchedEntries.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        }
        setTimeout(() => {
          setFetchedData(fetchedEntries);
          setLoading(false);
        }, 200);
        localStorage.setItem('listingData', JSON.stringify(fetchedEntries));
        console.log('Success');
      } catch (error) {
        console.error('Error fetching entries: ', error);
        setLoading(false);
      }
    };

    fetchData();
    console.log(fetchData);
  }, [currentUser]);

  return (
    <div className="listing-container">
      <div className="listing-header">My Listings</div>
      <div className="listing-container">
        {fetchedData.map((entry) => (
          <div key={`${entry.id}`} className="inbox-item">
            <div className="listing-image-container">
              <img src={entry.imgurl} alt="" />
            </div>
            <div className="listing-text-container">{entry.title}</div>
            <div className="listing-price-container">${entry.price}</div>
            <div className="listing-button-container">
              <button className="listing-button button-blue">
                <FontAwesomeIcon icon={faEdit} style={{ color: 'white' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
