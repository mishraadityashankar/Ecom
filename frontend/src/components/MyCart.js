import React, { Component } from 'react';

import axios from 'axios';
const Cart= props =>(
    <div className="col-lg-4 col-md-6 pt-2" >
    
  
  
  
        <div className="card" >
      <img className="card-img-top" src={props.product.pic}  alt="Card image"/>
      <div className="card-body">
      <h4 className="card-title">{props.product.name}</h4>
      <p className="card-title float-right">Rs {props.product.price}</p>
      <p className="card-text">Some example text.</p>
     
  
    
      </div>
  </div>
  
  
    </div>
    )
class MyCart extends Component {

    constructor(props){
        super(props);
        this.state={ newList : [],
            totalPrice : 0
         
        }}

        componentDidMount(){
            const jwt= localStorage.getItem("jwt");
            axios.get('/cartItem',{headers : { Authorization:`Bearer ${jwt}`}})
            .then(response => {
                this.setState({newList: response.data.newList ,totalPrice:response.data.totalPrice});
            })
            .catch(function (error) {
                console.log(error);
            })  
          }

         cartlist(){
            return this.state.newList.map(function(currentProduct, i) {
              //console.log(currentEvent);
              return <Cart product={currentProduct} key={i} />;
          });
        }

    render() {
        return (
            <div style={{background:"#EEE8AA"}}>
                <div className="container pb-5  pt-5" >
                    <h1 className="text-center text-capitalize pt-5">My Cart</h1>
                    <hr className="w-25  pt-5"></hr>
                    <div className="row ">
                      {this.cartlist() }
                    </div>
                    <hr className="w-25 mx-auto pt-5"></hr>
                    <div className="row ">
                    <div className="col-lg-6 col-md-6 pt-2" >total price : Rs {this.state.totalPrice}</div>
                    <div className="col-lg-6 col-md-6 pt-2" ><button className="btn btn-success">Buy</button></div>
                        
                    </div>
                </div>
        </div>
        );
    }
}

export default MyCart;