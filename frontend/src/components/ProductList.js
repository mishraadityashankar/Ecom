import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Product= props =>(
  <div className="col-lg-4 col-md-6 pt-2" >
  
{/*   
      <img src={props.product.pic} alt="event" className="img-fluid  " ></img> 
  
  
     
      <p style={{textAlign:"center"}}>{props.product.name}</p>

      <Link to={"/openProduct/"+props.product._id}>
      <button type="button">
          open!
     </button>
      </Link> */}



      <div className="card" >
    <img className="card-img-top" src={props.product.pic}  alt="Card image"/>
    <div className="card-body">
    <h4 className="card-title">{props.product.name}</h4>
    <p className="card-text">Some example text.</p>
    <Link to={"/openProduct/"+props.product._id}>
      <button type="button" className="btn btn-primary">
          open!
     </button>
      </Link>
    </div>
</div>


  </div>
  )

class ProductList extends Component {

  constructor(props){
    super(props);
    this.state={ products : []
     
    };
}


  componentDidMount(){
     
    axios.get('/product_api/getproduct')
    .then(response => {
        this.setState({products: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })  
  }


//   componentDidUpdate(){
//     axios.get('/product_api/getproduct')
//     .then(response => {
//         this.setState({products: response.data});
//     })
//     .catch(function (error) {
//         console.log(error);
//     }) 
//     }




   
  productlist(){
    return this.state.products.map(function(currentProduct, i) {
      //console.log(currentEvent);
      return <Product product={currentProduct} key={i} />;
  });
}
    
    render() {
     return (
      <div style={{background:"#EEE8AA"}}>
                <div className="container pb-5  pt-5" >
                    <h1 className="text-center text-capitalize pt-5">Products</h1>
                    <hr className="w-25 mx-auto pt-5"></hr>
                    <div className="row ">
                      {this.productlist() }
                    </div>
                </div>
        </div>
             );
    }
}

export default ProductList;