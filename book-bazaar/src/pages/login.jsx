import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log(userCredential);
          const user = userCredential.user;
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          navigate("/");
        } catch (error) {
          console.error();
        }
    }

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSumbit} className='login-form'>
            <input
                type="email"
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}  
            />
            <button type="submit" className='login-button'>Login</button>
        </form>
        <p>Need to create an account? <Link to="/signup"></Link></p>
    </div>
  )
}

export default Login