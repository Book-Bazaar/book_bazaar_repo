import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error();
    }
  };

  return (
    <div class="container">
      <div class="drop">
        <div class="content">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            
            {/* INPUT FOR EMAIL */}
            <div class="inputBox">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* INPUT FOR PASSWORD */}
            <div class="inputBox">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* LOGIN BUTTON */}
            <div class="inputBox">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>

          {/* SIGNUP LINK */}
          <div class="btns">
            <p> <Link to="/signup">SignUp</Link> </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
