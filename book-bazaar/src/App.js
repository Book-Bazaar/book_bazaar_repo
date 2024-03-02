import React from 'react';
import './App.css'; // Import CSS file for styling
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <Outlet />
    </div>
  );
}

export default App;
