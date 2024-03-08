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
    isbn: '',
    title: '',
    author: '',
    summary: '',
    imgurl: '',
    price: '',
    condition: 'nil',
  });
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //check condition
    // if (name === 'condition') {
    //   if (value === 'nil') {
    //     setMessage('Error: Condition needs to be selected.');
    //   }
    // }
  };

  const fetchData = () => {
    // Fetch data from API using formData.isbn
    // Assuming your API endpoint is `https://api.example.com/data?isbn=value`
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${formData.isbn}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          ...formData,
          title: data.items[0].volumeInfo.title,
          author: data.items[0].volumeInfo.authors[0],
          summary: data.items[0].volumeInfo.description,
          imgurl: data.items[0].volumeInfo.imageLinks.smallThumbnail,
        });
        setFetchSuccess(true); // Mark fetch as successful
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setFetchSuccess(false); // Mark fetch as unsuccessful
      });
  };

  const uploadBook = () => {
    const priceRegex = /^(?!0\d)\d+(\.\d{1,2})?$/; // Regular expression to match valid price formats
    if (!fetchSuccess) {
      setErrorMessage('Please enter valid ISBN.');
      setSuccessMessage('');
    } else if (!priceRegex.test(formData.price)) {
      setErrorMessage('Please enter correct price.');
      setSuccessMessage('');
    } else if (formData.condition === 'nil') {
      setErrorMessage('Please select condition.');
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('Success: Book uploaded');
      console.log(JSON.stringify(formData, null, 2)); // Printing JSON data to console
      // Wait for 2 seconds before closing the popup
      setTimeout(() => {
        onClose();
      }, 1800);
    }

    // console.log(JSON.stringify(formData, null, 2)); // Printing JSON data to console
  };

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Sell Textbook</h2>
        <div className="form-row">
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
          />{' '}
          <input
            type="text"
            name="title"
            defaultValue={formData.title}
            placeholder="Title"
            readOnly={true}
          />
          <input
            type="text"
            name="author"
            defaultValue={formData.author}
            placeholder="Author"
            readOnly={true}
          />
        </div>
        <textarea
          type="text"
          className="long-input"
          name="summary"
          defaultValue={formData.summary}
          placeholder="Summary"
          readOnly={true}
          style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
        />
        <div className="form-row">
          <input
            type="text"
            name="imgurl"
            defaultValue={formData.imgurl}
            placeholder="Image URL"
            readOnly={true}
          />
          <input
            type="text"
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={handleChange}
          />
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="nil">Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <br />
        {formData.imgurl && <img src={formData.imgurl} alt="" />} <br />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && (
          <div style={{ color: 'green' }}>{successMessage}</div>
        )}
        <button onClick={fetchData}>Search ISBN</button>
        <button onClick={uploadBook}>Upload Book</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Sidebar;