import './App.css';
import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import auth from './auth';
import { ViewCities } from './components/ViewCities/ViewCities';

function App() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getAuth() {
      setUserData(await auth.getToken())
    }
    getAuth();
  }, [userData])


  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <h3 className="navbar-brand" >Indian Cities</h3>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            { userData && <ul className="navbar-nav ml-auto">
                <li className="navbar-brand pr-2">
                <h4> Hello { userData?.name }</h4>
                </li>
                <li className="navbar-brand pt-1">
                <Link to="/login"><button style={{ background: '#000000', color: '#ffffff', border: '1px solid'}} onClick={async () => { await auth.deleteToken(); setUserData(false)} }>Logout</button></Link>
                </li>
              </ul> }
            </div>
          </div>
        </nav>
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path='/' component={() => <Login setUserData = {setUserData} userData = {userData}/> }/>
              <Route exact path='/login' component={() => <Login setUserData = {setUserData} userData = {userData}/> }/>
              <Route exact path="/register" component={() => <Register setUserData = {setUserData} userData = {userData}/> }/>
              <Route exact path="/viewCities" render={(props) => <ViewCities {...props} setUserData = {setUserData}/>} /> 
            </Switch>
          </div>
        </div>
      </div>
    </Router> 
  )
}

export default App;
