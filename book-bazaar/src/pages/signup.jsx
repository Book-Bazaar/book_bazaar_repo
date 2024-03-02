import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
        <h1>Sign-Up Page</h1>
        <form onSubmit={handleSumbit} className='signup-form'>
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
            <button type="submit" className='signup-button'>Sign-Up</button>
        </form>
        <p>Already have an account? <Link to="/login"></Link></p>
    </div>
  )
}

export default SignUp