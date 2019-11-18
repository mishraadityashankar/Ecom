import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Route,Switch,Link} from "react-router-dom";
import Login from './Login';
import Button from 'react-bootstrap/Button';
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            name : '',
            address : '',
            age : '',
            gender : '',
            contact : '',
            pic : ''

           
        };
    }

 
    componentDidMount(){
      const jwt= localStorage.getItem("jwt");
      axios.get('/dashboard',{headers : { Authorization:`Bearer ${jwt}`}})
      .then(response => {
        console.log("dashboard loaded")
          this.setState({
             id: response.data.id ,
            name : response.data.name,
            address : response.data.address,
            age : response.data.age,
            gender : response.data.gender,
            contact : response.data.contact,
            pic : response.data.pic
        
          });
      })
      .catch(function (error) {
          console.log(error);
      })  
    }
  
  
    // componentDidUpdate(){
    //   const jwt= localStorage.getItem("jwt");
    //   axios.get('/dashboard',{headers : { Authorization:`Bearer ${jwt}`}})
    //   .then(response => {
    //       console.log("dashboard loaded")
    //       this.setState({name : response.data.name,
    //         address : response.data.address,
    //         age : response.data.age,
    //         gender : response.data.gender,
    //         contact : response.data.contact,
    //         pic : response.data.pic
    //       });
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   })  
    // }

  
    render() {
        const userid=this.state.id;
        return (
            <div className="container pb-5">
                 <h1 className="text-center text-capitalize pt-3 mb-3">Dashboard</h1>
                                <hr className="w-25 mx-auto pt-3"></hr>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 pt-5 mt-4 ">
                        <div className="container">
                        <img  src ={this.state.pic} className="img-thumbnail img-fluid  " ></img>
                        </div>
                      

                    </div>  
                    <div className="col-xl-6 col-lg-6 pt-5 mt-4">
                      <table class="table">
                      
                        <tbody>
                        <tr>
                            <td>Name :</td>
                            <td>{this.state.name}</td>
                            
                        </tr>
                      
                        <tr>
                            <td>Contact :</td>
                            <td>{this.state.contact}</td>
                           
                        </tr>
                        <tr>
                            <td>Address :</td>
                            <td>{this.state.address}</td>
                           
                        </tr>

                        <tr>
                            <td>Gender :</td>
                            <td>{this.state.gender}</td>

                           
                        </tr>

                        <tr>
                            <td>Age :</td>
                            <td>{this.state.age}</td>
                           
                        </tr>

                        </tbody>
                    </table>
                    <Link to={"/edit/"+userid}>
                        <button type="button" className="btn btn-primary">
                           Edit
                        </button>
                     </Link>
                    </div>

                </div>
    
                
            </div>
        );
    }
}

export default Dashboard;