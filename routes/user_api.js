const express=require('express');

const router = express.Router();
const mongoose= require('mongoose');
const User =require('../modals/user_modal');
const  Product =require('../modals/product_modal');
const checkauth =require('../auth-check');
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');
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


 
    

router.post("/signup",upload.single('pic'),(req,res,next) => {
 
  bcrypt.hash(req.body.password,10,(err,hash)=>{
      if(err)
      {
        return res.status(500).json({
          error:err
        });
      } else{
        const user = new User({

          _id:new mongoose.Types.ObjectId(),
          email: req.body.email,
          password:hash,
          pic:req.file.path,
          name:req.body.name,
          address:req.body.address,
          contact:req.body.contact,
          age:req.body.age,
          gender:req.body.gender
      });
      user
      .save()
      .then(
        result=>{
          res.status(201).json({
            message: result
         
          });
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({
              error:err
            });
        });

    }
  });
});

router.post("/login",(req,res,next) => {
  User.find({email: req.body.email}).exec().then(
    user => {
      if(user.length <1){
        return res.status(401).json({
          message : 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
          
        if(err){
          return res.status(401).json({
            message : 'Auth failed'
          });
        }

        if(result)
        {  
          const token= jwt.sign({
            email:user[0].email,
            userId :user[0]._id,
            name:user[0].name,
            address:user[0].address,
            contact:user[0].contact,
            age:user[0].age,
            gender:user[0].gender,
            pic:user[0].pic

          },"secret",
          {
             expiresIn:"1h" 
          }
          );
          
          return res.status(200).send(token);
        }

        return res.status(401).json({
          message : 'Auth failed'
       });
     })
    }).catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
        });
    });
});

router.get('/getuser',checkauth,(req,res) =>{
	console.log('get request for students');
     return res.send(req.user);
  });   
  


router.get('/dashboard',checkauth,(req,res) =>{
 
  const token=req.headers.authorization.split(" ")[1];
  const decoded=jwt.verify(token,"secret");
  req.userData =decoded;
   
          const details = {
  
            name:req.userData.name,
            pic:req.userData.pic,
            contact:req.userData.contact,
            address:req.userData.address,
            gender:req.userData.gender,
            age:req.userData.age
          
  
        };
       
        res.send(details);
      });

      router.post('/addToCart/:id',checkauth,(req,res) =>{
        console.log(req.param.id)
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,"secret");
        req.userData =decoded;
            
        console.log(req.params.id)
          Product.findById(req.params.id)
         .then((Product)=>{
          // console.log(Product);
        //  User.findOneAndUpdate({_id: req.userData.userId}, {$push: {product: Product}});
        //  }).catch(err => console.log(err));
          console.log(Product);
        //  const item= {product:req.body.product,quantity:1}
        const item={product:Product,quantity:1};
        // console.log(item)
       // User.findOneAndUpdate({_id: req.userData.userId}, {$push: {cart: item}});
      //   User.update(
      //     { _id: req.userData.userId }, 
      //     { $push: { cart: item } },
      //     done
      // );
      User.findOneAndUpdate(
        { _id: req.userData.userId }, 
        { $push: { cart: item } },
       function (error,cartItem) {
             if (error) {
                 console.log(error);
             } else {
                 //console.log(cartItem);
                 res.send ("added");
             }
         });
     
         
         
            }).catch(err => console.log(err));
          });
            router.get('/cartItem',checkauth,(req,res) =>{
 
              const token=req.headers.authorization.split(" ")[1];
              const decoded=jwt.verify(token,"secret");
              req.userData =decoded;
              var newList = new Array();
              var totalPrice=0;
              User.findById(
                { _id: req.userData.userId }, 
                
               function (error,cartItem) {
                     if (error) {
                         console.log(error);
                     } else {
                         console.log(cartItem);
                        
                         // res.send ( cartItem.cart);
                        cartItem.cart.forEach(async function(currentProduct, index) {
                           await Product.findById(currentProduct.product ,
                           function(err, data){
                              if(!err){
                             console.log(data.price);
                             totalPrice+=data.price;
                              newList.push(data);}
                              else
                              console.log(err);
                         });
                         
                         res.send({newList:newList,totalPrice:totalPrice})
                         console.log(totalPrice);
                          //  (Product) => {  
                          //  console.log("yeh hai product" +Product);
                          // }
                          // .then((Product)=>{  ;
                          //   console.log("yeh hai product" +Product);
                          // }).catch(err => console.log(err));
                         
                      } )
                      
                        
                      
                       
                     
                    }
                 })
                });
                              
  






module.exports=router;