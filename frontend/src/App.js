import React from 'react';

import { BrowserRouter as Router,Route,Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";   
import Signup from './components/Signup';
import Login from './components/Login';

import Dashboard from './components/Dashboard'
import Auth from './components/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/signup" component={Signup}/>

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
