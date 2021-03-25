import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import auth from '../../auth';

export default function Register ({ setUserData, userData }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await auth.registerUser({
      firstName,
      lastName,
      email,
      password
    });

    if(typeof result === 'boolean') {
      setIsLoggedIn(result)
      setUserData(true);
    }
    else setError(result);
  }

  const removeSpecialCharactersFromName = (name) => {
    return name.replace(/[^a-zA-Z']/g, '')
  }

  if (isLoggedIn || userData) {
    return <Redirect to='/viewCities'/>
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>

      <div className="form-group">
        <label>First name</label>
        <input type="text" className="form-control" value={firstName} placeholder="First name" required onChange={e => {setError(''); setFirstName(removeSpecialCharactersFromName(e.target.value))}}/>
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input type="text" className="form-control" value={lastName} placeholder="Last name" required onChange={e => {setError(''); setLastName(removeSpecialCharactersFromName(e.target.value))}}/>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" placeholder="Email-ID" required onChange={e => {setError(''); setEmail(e.target.value)}}/>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" minLength="8" required onChange={e => {setError(''); setPassword(e.target.value)}}/>
      </div>

      <div className="form-group">
        {error && <h6 style={{alignSelf:'center', color: 'red'}}>{error}</h6>}
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
      <p className="forgot-password text-right">
        Already registered <Link to="/login">Log in?</Link>
      </p>
    </form>
  )
}