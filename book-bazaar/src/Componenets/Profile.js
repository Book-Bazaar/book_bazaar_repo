import React, { useState } from 'react';
import './Title.css';
import './Menu.css';
import profile_icon from '../Assets/user-solid.svg';

function Menu({ onClose }) {
  return (
    <div className="menu-container">
      <div className="menu">
        <ul>
          <li>My Listings |</li>
          <li>| Change Password |</li>
          <li>| Log out</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function Profile() {
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    console.log('hit');
    setShowMenu(!showMenu);
  };
  return (
    <div>
      <img src={profile_icon} alt="" className="profile" onClick={toggle} />
      {showMenu && <Menu onClose={toggle} />}
    </div>
  );
}

export default Profile;
