import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
class Edit extends Component {

    constructor(props){
        super(props);
 
        this.onChangeAddress=this.onChangeAddress.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeAge=this.onChangeAge.bind(this);
        this.onChangeContact=this.onChangeContact.bind(this);
        this.onChangeGender=this.onChangeGender.bind(this);
        this.fileSelectedHandler=this.fileSelectedHandler.bind(this);
  
        
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            name : '',
            address : '',
            age : '',
            gender : '',
            contact : '',
            pic : ''
           
        };
    }

    fileSelectedHandler(e){
        this.setState({
            pic: e.target.files[0]
        });}
        onChangeName(e){
            this.setState({
                name: e.target.value
            });}
    
            onChangeAddress(e){
                this.setState({
                address: e.target.value
                });
            }
            onChangeContact(e){
                this.setState({
                    contact: e.target.value
                });
            }
            onChangeGender(e){
                this.setState({
                    gender: e.target.value
                });
            }
            onChangeAge(e){
                this.setState({
                    age: e.target.value
                });
            }
    
      onSubmit(e){
        e.preventDefault();
        const jwt= localStorage.getItem("jwt");
        console.log('Form submitted');
       
    
      
         const fd=new FormData();
         fd.append('pic',this.state.pic,this.state.pic.name);
         fd.append('name',this.state.name);
         
         fd.append('address',this.state.address);
         fd.append('contact',this.state.contact);
         fd.append('age',this.state.age);
         fd.append('gender',this.state.gender);
    
         
         
        axios.post('/edit/'+this.props.match.params.id, fd)
        .then(res => console.log(res.data)).catch(err=> console.log(err));
        this.props.history.push('/dashboard');
    }

    componentDidMount(){
        const jwt= localStorage.getItem("jwt");
        axios.get('/dashboard',{headers : { Authorization:`Bearer ${jwt}`}})
        .then(response => {
          console.log("dashboard loaded")
            this.setState({
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
    //     const jwt= localStorage.getItem("jwt");
    //     axios.get('/dashboard',{headers : { Authorization:`Bearer ${jwt}`}})
    //     .then(response => {
    //       console.log("dashboard loaded")
    //         this.setState({
    //           name : response.data.name,
    //           address : response.data.address,
    //           age : response.data.age,
    //           gender : response.data.gender,
    //           contact : response.data.contact,
    //           pic : response.data.pic
          
    //         });
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // }      

    render() {
        return (
            <div className="container w-50 mx-auto mb-5 ">
              <div><h1 className="text-center text-capitalize pt-3">Edit</h1>
                                    <hr className="w-25 mx-auto pt-3"></hr>
                                    </div>
             
   
      
       
      
        
        
        
          <Form  onSubmit={this.onSubmit}>
                   
                     {/* <Form.Group controlId="formBasicChecbox">
                     <Form.Check type="checkbox" label="Check me out" />
                     </Form.Group> */}
                    

                     <Form.Group controlId="formBasicName">
                     <Form.Label>Name:</Form.Label>
                     <Form.Control type="text"  value={this.state.name}
                                onChange={this.onChangeName}/>
                     </Form.Group>

                     <Form.Group controlId="formBasicAddress">
                     <Form.Label>Address:</Form.Label>
                     <Form.Control type="text"     value={this.state.address}
                                onChange={this.onChangeAddress}/>
                     </Form.Group>

                     <Form.Group controlId="formBasicContact">
                     <Form.Label>Contact:</Form.Label>
                     <Form.Control type="number"     value={this.state.contact}
                                onChange={this.onChangeContact}/>
                     </Form.Group>

                     <Form.Group controlId="formBasicAge">
                     <Form.Label>Age:</Form.Label>
                     <Form.Control type="number"  value={this.state.age}
                                onChange={this.onChangeAge}/>
                     </Form.Group>


                     <Form.Group controlId="formBasicGender">
                     <Form.Label>Gender:</Form.Label>
                     <Form.Control type="text" placeholder="gender"    value={this.state.gender}
                                onChange={this.onChangeGender}/>
                     </Form.Group>
                     <br/>
                     <Form.Group controlId="formBasicPic">
                     <Form.Label>Profile Picture:</Form.Label>
                     <Form.Control type="file"    
                                onChange={this.fileSelectedHandler}/>
                     </Form.Group>


                     <br/>
                     
                    <Button variant="primary"  type="submit">
                      submit
                    </Button>
                </Form>
                </div>
        );
    }
}

export default Edit;