import React from 'react';

import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";   
import Signup from './components/Signup';
import Login from './components/Login';
import Test from './components/Test';
import MyCart from './components/MyCart';
import Dashboard from './components/Dashboard'
import OpenProduct from './components/OpenProduct'
import Auth from './components/Auth';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from './components/ProductList';
import Edit from './components/Edit';


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
  function registerOrCart() {
    const jwt= localStorage.getItem("jwt");
   var cartOrRegister =   <Link to="/signup" className="nav-link" refresh="true">Register</Link>  
    if(jwt)
    cartOrRegister = <Link to="/MyCart" className="nav-link" refresh="true">My Cart</Link>  
    return cartOrRegister;
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
                  {/* <Link to="/signup" className="nav-link">Register</Link> */}
                  {registerOrCart()}
                </li>
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Products</Link>
                </li>
                {/* <li className="navbar-item">
                  <Link to="/MyCart" className="nav-link">My Cart</Link>
                </li> */}
              </ul>
            </div>
          </nav>
        <Switch>
        <Route path="/signup" component={Signup}/>
        <Route path="/openProduct/:id" component={OpenProduct} />
        <Route path="/" exact component={ProductList} />
        <Route path="/login" component={Login}/>
        <Route path="/test" component={Test}/>
        <Auth>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/MyCart" component={MyCart} />
        <Route path="/edit" component={Edit}/>
        </Auth>
        </Switch>
      </Router>

      
        
      
    </div>
  );
}

export default App;
 