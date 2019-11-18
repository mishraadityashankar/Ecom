const express =require('express');
const app=express();


const user_api=require('./routes/user_api');
const bodyParser=require('body-Parser');
const mongoose=require('mongoose');
const product_api=require('./routes/product_api');

const db= "mongodb://Ecom:Sriganesh3@ds233278.mlab.com:33278/ecom";

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());
app.use('/',user_api);
app.use('/product_api',product_api);

app.use('/uploads', express.static('uploads'));


mongoose.Promise=global.Promise;
mongoose.connect(db, { useNewUrlParser: true },function(err){
  if(err){
  	console.error("error! "+err);
  }
});
 
app.listen(4000, () => {
    console.log('Running on port 4000');
  });

 
