const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const ProductSchema = new Schema({
       _id:mongoose.Schema.Types.ObjectId,
        pic:{type:String,required:false},
       company:{type:String,required:true},
       name:{type:String,required:true},
       availability:{type:Number,required:true},
       seller:{type:String,required:true},
       color:{type:String,required:true},
       popularity:{type:String,required:true},
        price : {type:Number,required:true}

      

   

});
module.exports=mongoose.model('Products',ProductSchema);