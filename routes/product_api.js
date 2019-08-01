
const express=require('express');

const router = express.Router();
const mongoose= require('mongoose');
const Product =require('../modals/product_modal');



 router.get('/',(req,res)=>{
     Product.find()
        .sort({date:-1})
        .then(Products=>res.json(Products));
 }
 );
 router.post('/',(req,res)=>{
     const newProduct= new Product({
        
        _id:new mongoose.Types.ObjectId(),
        company: req.body.company,
        name:req.body.name,
        popularity:req.body.popularity,
        availability:req.body.availability,
        color:req.body.color,
        seller:req.body.seller
     });
     newProduct.save().then(newP=> res.json(newP)).catch(err=>console.log(err));
     

 });
 router.delete('/:id',(req,res)=>{
      Product.findById(req.params.id)
       .then(Product=>Product.remove().then(()=>res.json({success:true})))
 } );


module.exports=router;