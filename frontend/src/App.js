import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";   
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/signup" component={Signup}/>

      
      </Router>
    </div>
  );
}

export default App;
