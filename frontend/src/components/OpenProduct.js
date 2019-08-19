import React, { Component } from 'react';
import axios from 'axios';
class OpenProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            company: '',
            name: '',
            pic: '',
            popularity: '',
            availability: '',
            color: '',
            seller: ''

           
        };
        this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount(){
     
      axios.get("/product_api/getproduct/"+this.props.match.params.id)
      .then(res => {
        console.log(this.props.match.params.id);
          this.setState({
            name : res.data.name,
            company: res.data.company,
            popularity: res.data.popularity,
            availability: res.data.availability,
            color: res.data.color,
            seller: res.data.seller,
            pic : res.data.pic
        
          });
      })
      .catch(function (error) {
          console.log(error);
      })  
    }
  
  
    // componentDidUpdate(){
    //     axios.get('/product_api/getproduct'+this.props.match.params.id)
    //   .then(res => {
    //       this.setState({
    //         name : res.data.name,
    //         company: res.data.company,
    //         popularity: res.data.popularity,
    //         availability: res.data.availability,
    //         color: res.data.color,
    //         seller: res.data.seller,
    //         pic : res.data.pic
        
    //       });
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })  
    // }
    handleClick()
    {
        const jwt= localStorage.getItem("jwt");
        console.log("Bearer "+jwt)
       var obj={
           product:"",
           quantity:1
       }
        axios.post("/addToCart/"+this.props.match.params.id,obj,{headers : {  'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' :"Bearer "+jwt}})
    .then(res => {
      console.log(res);
      
      }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className="container pb-5">
                 <h1 className="text-center text-capitalize pt-3 mb-3">Product details</h1>
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
                            <td>company :</td>
                            <td>{this.state.company}</td>
                           
                        </tr>
                        <tr>
                            <td> availability :</td>
                            <td>{this.state.availability}</td>
                           
                        </tr>

                        <tr>
                            <td> popularity :</td>
                            <td>{this.state.popularity}</td>

                           
                        </tr>

                        <tr>
                            <td>color :</td>
                            <td>{this.state.color}</td>
                           
                        </tr>
                        <tr>
                            <td> seller :</td>
                            <td>{this.state.seller}</td>
                           
                        </tr>

                        </tbody>
                    </table>
                        

                    <button type="button" className="btn btn-success float-right" onClick={this.handleClick}>
                      Add to cart
                    </button>
                    </div>

                </div>
    
                
            </div>
        );
    }
}

export default OpenProduct;