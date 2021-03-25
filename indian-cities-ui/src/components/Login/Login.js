import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../auth';

export default function Login ({ setUserData, userData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await auth.loginUser({
      email,
      password
    });

    if(typeof result === 'boolean') {
      setIsLoggedIn(result)
      setUserData(true);
    }
    else setError(result);
  }

  if (isLoggedIn || userData) {
    return <Redirect to='/viewCities'/>
  }

  return (
    <form onSubmit={handleSubmit}>

      <h3>Login</h3>

      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" placeholder="Enter email-id" required onChange={e => {setError(''); setEmail(e.target.value)}}/>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" minLength = "8" required onChange={e => {setError(''); setPassword(e.target.value)}}/>
      </div>

      <div className="form-group">
        {error && <h6 style={{alignSelf:'center', color: 'red'}}>{error}</h6>}
      </div>

      <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>

      <p className="forgot-password text-right">
        Don't have an account, <Link to="/register">Sign up?</Link>
      </p>
    </form>
  )
}

 