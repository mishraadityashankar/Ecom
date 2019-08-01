import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
//import axios from 'axios';

 class Auth extends Component{

  constructor(props){
      super(props);
      this.state={
          user: undefined
      }
  }

  componentDidMount(){

    const jwt= localStorage.getItem("jwt");
    if(!jwt){
       this.props.history.push('/login');

    }

    Axios.get('/getUser',{headers : { Authorization:`Bearer ${jwt}`}}).then(res => this.setState({
        
       user:res.data
    })).catch(err =>{
       
        localStorage.removeItem('jwt');
        this.props.history.push('/login');

    });
  }

  render(){
      if(this.state.user===undefined){
          return(
           <div><h1>Loading....</h1></div>
          );
      }
      return(
          <div >
             {this.props.children}
       
          </div>
      );
  }

}
export default withRouter(Auth);