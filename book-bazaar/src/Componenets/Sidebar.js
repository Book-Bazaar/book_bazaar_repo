import React, { useState } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="sidebar">
      {/* Left Sidebar */}
      <div className="post-button" onClick={togglePopup}>
        {showPopup && <Popup onClose={togglePopup} />}
        <FontAwesomeIcon icon={faPlus} />
        Upload book
      </div>
      <div className="divider"></div>
    </div>
  );
}

function Popup({ onClose }) {
  const [formData, setFormData] = useState({
    input1: '',
    input2: '',
    input3: '',
    longInput: '',
    input4: '',
    input5: '',
    dropdown: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchData = () => {
    // Fetch data from API using formData.input1
    // Assuming your API endpoint is `https://api.example.com/data?input1=value`
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${formData.input1}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          ...formData,
          input2: data.items[0].volumeInfo.title,
          input3: data.items[0].volumeInfo.authors[0],
          longInput: data.items[0].volumeInfo.description,
          input4: data.items[0].volumeInfo.imageLinks.smallThumbnail,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Sell Textbook</h2>
        <div className="form-row">
          <input
            type="text"
            name="input1"
            value={formData.input1}
            onChange={handleChange}
            placeholder="ISBN"
          />{' '}
          <input
            type="text"
            name="input2"
            value={formData.input2}
            placeholder="Title"
            readOnly={true}
          />
          <input
            type="text"
            name="input3"
            value={formData.input3}
            placeholder="Author"
            readOnly={true}
          />
        </div>
        <input
          type="text"
          className="long-input"
          name="longInput"
          value={formData.longInput}
          placeholder="Summary"
          readOnly={true}
        />
        <div className="form-row">
          <input
            type="text"
            name="input4"
            value={formData.input4}
            placeholder="Image URL"
          />
          <input type="text" placeholder="Price" />
          <select>
            <option value="Option 1">Condition</option>
            <option value="Option 2">New</option>
            <option value="Option 3">Used</option>
            <option value="Option 3">Poor</option>
          </select>
        </div>
        <br />
        {/* <img src="" alt="" /> */}
        <br />
        <button onClick={fetchData}>Search ISBN</button>
        <button>Upload Book</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Sidebar;
