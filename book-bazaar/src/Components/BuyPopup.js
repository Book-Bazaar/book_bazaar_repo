import React from 'react';
import './BuyPopup.css';
// import { firestore } from './firebase'; // Import your Firebase configuration

const Popup = ({ entry, onClose }) => {
  const { imgurl, price, title, author, condition, summary, id } = entry;
  //   console.log({ entry });

  // condition tag
  let conditionClass;
  switch (condition) {
    case 'new':
      conditionClass = 'new';
      break;
    case 'used':
      conditionClass = 'used';
      break;
    case 'poor':
      conditionClass = 'poor';
      break;
    default:
      conditionClass = '';
  }
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <div className="popup-image">
            <img src={imgurl} alt="Product" />
          </div>
          <div className="popup-details">
            <h2>{title}</h2>
            <h3>
              by {author} ${price}{' '}
              <span className={`condition ${conditionClass}`}>{condition}</span>
            </h3>
            <p>{summary}</p>
            <button className="contact-button">Contact Seller</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
