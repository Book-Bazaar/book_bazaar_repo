import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { auth, firestore } from '../firebase';
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
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Inbox() {
  const [fetchedData, setFetchedData] = useState(() => {
    try {
      const storedData = localStorage.getItem('inboxData');
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
            const offers = doc.data().offers;
            offers.forEach((offer) => {
              if (offer.trim() !== '') {
                // Skip empty offers
                fetchedEntries.push({
                  id: doc.id,
                  ...doc.data(),
                  offers: offer,
                });
              }
            });
          });
        }
        setTimeout(() => {
          setFetchedData(fetchedEntries);
          setLoading(false);
        }, 1200);
        localStorage.setItem('inboxData', JSON.stringify(fetchedEntries));
        console.log('Success');
      } catch (error) {
        console.error('Error fetching entries: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  //   Green button, delete function + NEED TO ADD EMAIL LATER
  const handleDelete = async (bookId) => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'Books', bookId));
      console.log('Book deleted successfully');
      const updatedEntries = fetchedData.filter((entry) => entry.id !== bookId);
      setFetchedData(updatedEntries);
      localStorage.setItem('inboxData', JSON.stringify(updatedEntries));
      setDeleteConfirmation(true); // Set delete confirmation to true
      setTimeout(() => setDeleteConfirmation(false), 3000); // Hide confirmation message after 3 seconds
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Red button, deletes specific email from offers array field
  //   const handleRemoveEmail = async (bookId, emailToRemove) => {
  //     try {
  //       const db = getFirestore();
  //       const bookRef = doc(db, 'Books', bookId);
  //       const bookDoc = await getDoc(bookRef);
  //       if (bookDoc.exists()) {
  //         const updatedOffers = bookDoc
  //           .data()
  //           .offers.filter((email) => email !== emailToRemove);
  //         await updateDoc(bookRef, { offers: updatedOffers });
  //         console.log('Email removed successfully');
  //         // Refresh the inbox to reflect the updated offers array
  //         fetchData();
  //       } else {
  //         console.error('No such book document!');
  //       }
  //     } catch (error) {
  //       console.error('Error removing email:', error);
  //     }
  //   };

  return (
    <div className="inbox-container">
      {deleteConfirmation && (
        <div className="confirmation-message">Offer has been accepted</div>
      )}
      {fetchedData.map((entry) => (
        <div key={`${entry.id}-${entry.offers}`} className="inbox-item">
          <div className="inbox-image-container">
            <img src={entry.imgurl} alt="Image" />
          </div>
          <div className="inbox-text-container">
            {entry.title}
            <div className="inbox-text-email-container">{entry.offers}</div>
          </div>
          <div className="inbox-button-container">
            <button
              className="inbox-button button-green"
              onClick={() => handleDelete(entry.id)}
            >
              <FontAwesomeIcon icon={faCheck} style={{ color: 'white' }} />
            </button>
            <button
              className="inbox-button button-red"
              //   onClick={() => handleRemoveEmail(entry.id, offer)}
              //   onClick={() => handleRemoveEmail(entry.id, emailToRemove)}
            >
              <FontAwesomeIcon icon={faTimes} style={{ color: 'white' }} />
            </button>
            {/* Optionally add a confirmation modal for deletion */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inbox;
