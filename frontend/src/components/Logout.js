import Dashboard from './Dashboard'
import React from 'react';
function Logout() {
    localStorage.removeItem("jwt");
    return (
     <Dashboard></Dashboard>
    )
      
      
        
  }
  
  export default Logout;