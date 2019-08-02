import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const divStyle = {
    margin: '40px',
    border: '5px',
    padding: '1em'
  };
export default class Login extends Component{

  constructor(props){
      super(props);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          email: '',
         
          password: ''
      }
  }
  onChangeEmail(e){
      this.setState({
          email: e.target.value
      });
  }
  onChangePassword(e){
      this.setState({
          password:e.target.value
      });
  }

  onSubmit(e){
    e.preventDefault();

    console.log('Form submitted');
    console.log(`Email: ${this.state.email}`);
    console.log(`Password: ${this.state.password}`);

    const oldUser={

        email : this.state.email,
        password : this.state.password
    }

    axios.post('/login', oldUser)
    .then(res =>{
     localStorage.setItem('jwt',res.data);
     this.props.history.push('/dashboard');
      
    }).catch(err=> console.log(err));

     

    this.setState({

        email:'',
        password:''
    })
  }

  render(){
      return(
          <div style={divStyle}>
              <h3>
                  login
              </h3>
              <Form  onSubmit={this.onSubmit}>
                   <Form.Group controlId="formBasicEmail">
                   <Form.Label>Email address</Form.Label>
                   <Form.Control type="email" placeholder="Enter email"   value={this.state.email}
                                onChange={this.onChangeEmail}/>
                   <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                     <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Password"    value={this.state.password}
                                onChange={this.onChangePassword}/>
                     </Form.Group>
                     {/* <Form.Group controlId="formBasicChecbox">
                     <Form.Check type="checkbox" label="Check me out" />
                     </Form.Group> */}
                    <Button variant="primary"  type="submit">
                      Submit
                    </Button>
                </Form>
          </div>
      )
  }


}