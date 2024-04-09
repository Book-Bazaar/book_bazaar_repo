import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { auth, firestore } from '../firebase';
// import 'firebase/firestore';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import './Inbox.css'


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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const db = getFirestore();
            let fetchedEntries = [];
            if (currentUser) {
                // Query Firestore to get entries that match the user's email and have more than 0 offers
                const q = query(collection(db, 'Books'), 
                    where('email', '==', currentUser.email),
                    // where('offers', '!=', [""])
                );
                const snapshot = await getDocs(q);
                snapshot.forEach((doc) => {
                    const offers = doc.data().offers;
                    offers.forEach((offer) => {
                        fetchedEntries.push({
                            id: doc.id,
                            ...doc.data(),
                            offers: offer
                        });
                    });
                });
            }
            setTimeout(() => {
                setFetchedData(fetchedEntries);
                setLoading(false);
              }, 1200);
            localStorage.setItem('inboxData', JSON.stringify(fetchedEntries)); // Store data in local storage
            console.log("Success");
          } catch (error) {
            console.error('Error fetching entries: ', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, [currentUser]);


    return (
        <div className="inbox-container">
            {fetchedData.map((entry) => (
                <div key={`${entry.id}-${entry.offers}`} className="inbox-item">
                    <div className="inbox-image-container">
                        <img src={entry.imgurl} alt="Image" />
                    </div>
                    <div className="inbox-text-container">
                        {entry.title}
                        <div>{entry.offers}</div>
                    </div>
                    <div className="inbox-button-container">
                        <button className="button button-green"></button>
                        <button className="button button-red"></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Inbox;
