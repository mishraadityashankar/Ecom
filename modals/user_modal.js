const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const userSchema = new Schema({
       _id:mongoose.Schema.Types.ObjectId,
       pic:{type:String,required:true},
       email:{type:String,required:true},
       password:{
           type:String, required:true
       },
       name:{type:String,required:true},
       contact:{type:Number,required:true},
       address:{type:String,required:true},
       gender:{type:String,required:true},
       age:{type:String,required:true},
       cart: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
          },
          quantity:{ type :Number ,default :1}
        }
      ]


      

   

});
module.exports=mongoose.model('User',userSchema);