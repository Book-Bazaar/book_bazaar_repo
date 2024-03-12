import React, { useState, useEffect } from 'react';
import './Title.css';
import './Menu.css';
import profile_icon from '../Assets/user-solid.svg';
import { Link } from 'react-router-dom'; // Import Link component for routing
import { auth } from '../firebase'; // Import Firebase auth instance

function Menu({ onClose }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
      onClose(); // Call onClose function to close the menu
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div className="menu-container">
      <div className="menu">
        <ul>
          <li>My Listings</li>
          <li>Change Password</li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function Profile() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    console.log('hit');
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean-up function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="auth-buttons">
        {user ? (
          // <button onClick={() => auth.signOut()}>Sign Out</button>
          <img src={profile_icon} alt="" className="profile" onClick={toggle} />
        ) : (
          <>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Log In</button>
            </Link>
            {/* <button onClick={handleSignInOut}>Sign In</button> */}
          </>
        )}
      </div>
      {showMenu && <Menu onClose={toggle} />}
    </div>
  );
}

export default Profile;
