import React from 'react';
import './App.css'; // Import CSS file for styling
import Title from './Componenets/Title'; // Title component
import Sidebar from './Componenets/Sidebar'; // Sidebar component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// marko's git commit test
// practice
// branch test

function App() {
  return (
    <div className="app">
      <Title />
      <div className="body">
        <Sidebar />
        <div className="main-content">Marketplace</div>
      </div>
    </div>
  );
}

export default App;
