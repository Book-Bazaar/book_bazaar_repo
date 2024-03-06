import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import './Title.css';
import './Marketplace.css';
// import { getFirestore } from '../firebase/firestore';

// Define your Tile component
const Tile = ({ imgurl, price, title, author, condition }) => {
  return (
    <div className="tile">
      <div className="image-container">
        <img src={imgurl} alt="Product" />
        <div className="overlay">
          <span className="price">{price}</span>
        </div>
      </div>
      <div className="details">
        <strong>
          {title} by {author}
        </strong>
        <span className="condition">{condition}</span>
      </div>
    </div>
  );
};

const Marketplace = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore.collection('Books').get();
        const fetchedEntries = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(fetchedEntries);
        setLoading(false);
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

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>
          {/* Render your Tile component using the fetched data */}
          <Tile {...entry} />
        </div>
      ))}
    </div>
  );
};

export default Marketplace;
