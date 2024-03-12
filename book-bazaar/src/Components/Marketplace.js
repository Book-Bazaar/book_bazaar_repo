import React, { useState, useEffect } from 'react';
import Popup from './BuyPopup';
import Tile from './Tile';
import Filter from './Filter';
// import './Title.css';
import './Marketplace.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Marketplace = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchDataWithFilters = (sort, condition) => {
    // Logic to fetch data with applied filters
    console.log(
      'Fetching data with filters: Sort -',
      sort,
      ', Condition -',
      condition
    );
  };

  // Main function that fetching all items in "Books" database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'Books');
        getDocs(colRef).then((snapshot) => {
          // console.log(snapshot.docs);
          const fetchedEntries = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Sort the fetchedEntries array based on a specific field (e.g., title)
          // fetchedEntries.sort((a, b) => a.title.localeCompare(b.title)); // Sorting by title alphabetically

          setEntries(fetchedEntries);
          setLoading(false);
        });
        // const snapshot = await getDocs(colRef).get();
        // setEntries(fetchedEntries);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching entries: ', error);
        setLoading(false); // Ensure loading state is set to false in case of error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  const handleOpenPopup = (entry) => {
    setIsOpen(true);
    setSelectedEntry(entry);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="marketplace">
      {entries.map((entry) => (
        <Tile
          key={entry.id}
          entry={entry} // Pass the entire entry object as a prop
          onClick={handleOpenPopup}
        />
      ))}
      {isOpen && <Popup entry={selectedEntry} onClose={handleClosePopup} />}
    </div>
  );
};

export default Marketplace;
