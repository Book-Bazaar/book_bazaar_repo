import React from 'react';
import './App.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="app">
      <div className="header">
        <div className="logo">
          <img src="/book_bazaar_logo.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search ISBN..." />
          <button>
            {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="body">
        <div className="sidebar">
          {/* Left Sidebar */}
          <div className="post-button">
            <FontAwesomeIcon icon={faPlus} />
            Upload book
          </div>
          <div className="divider"></div>
        </div>
        <div className="main-content">Marketplace</div>
      </div>
    </div>
  );
}

export default App;
