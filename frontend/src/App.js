import React from 'react';

import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";   
import Signup from './components/Signup';
import Login from './components/Login';


import Dashboard from './components/Dashboard'
import OpenProduct from './components/OpenProduct'
import Auth from './components/Auth';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from './components/ProductList';


function App() {
  function isloggedin () {
    const jwt= localStorage.getItem("jwt");
   var loginOrLogout =   <Link to="/login" className="nav-link" refresh="true">Login</Link>  
    if(jwt)
    loginOrLogout = <a  className ="nav-link" href="/productList" onClick={Logout}>Logout</a>
    return loginOrLogout;
  }
  function Logout (){
    localStorage.removeItem("jwt");

   
   
  }
 
  return (
    <div className="App">
    
       <Router> 
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="google.com" target="_blank">
              <img  width="30" height="30" alt="Ecom.com" />
            </a>
            
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">

              <li className="navbar-item">
            <Link to="/Dashboard" className="nav-link">Dashboard</Link> </li>
                <li className="navbar-item">
                {isloggedin()}
                </li>
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link">Register</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Products</Link>
                </li>
              </ul>
            </div>
          </nav>
        <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/openProduct/:id" component={OpenProduct} />
        <Route path="/" exact component={ProductList} />
        <Route path="/login" component={Login}/>
       
        <Auth>
        <Route path="/dashboard" component={Dashboard} />
        
        </Auth>
        </Switch>
      </Router>

      
        
      
    </div>
  );
}

export default App;
 