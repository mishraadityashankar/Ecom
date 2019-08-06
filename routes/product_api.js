
const express=require('express');

const router = express.Router();
const mongoose= require('mongoose');
const Product =require('../modals/product_modal');
const multer = require('multer');
const storage= multer.diskStorage({
    destination : (req,file,cb) =>{
      cb(null,'./uploads/');
    },
    filename : (req,file,cb) => {
      cb(null,file.originalname);
    }
  });
const upload = multer({storage:storage});



 router.get('/getproduct',(req,res)=>{
     Product.find()
     .then((Products)=>{ res.send(Products) ;
        console.log(Products);
       }).catch(err => console.log(err));
 }
 );
 router.get('/getproduct/:id',(req,res)=>{
    Product.findById(req.params.id)
   .then((Product)=>{ res.send(Product) ;
    console.log(Product);
   }).catch(err => console.log(err));
}
)
 router.post('/postproduct',upload.single('pic'),(req,res)=>{
     const newProduct= new Product({
        
        _id:new mongoose.Types.ObjectId(), 
        company: req.body.company,
        name:req.body.name,
        pic:"http://localhost:4000/"+req.file.path,
        popularity:req.body.popularity,
        availability:req.body.availability,
        color:req.body.color,
        seller:req.body.seller
     });
     newProduct.save().then(newP=> res.json(newP)).catch(err=>console.log(err));
     

 });
 router.delete('/delete/:id',(req,res)=>{
      Product.findById(req.params.id)
       .then(Product=>Product.remove().then(()=>res.json({success:true})))
 } );


module.exports=router;