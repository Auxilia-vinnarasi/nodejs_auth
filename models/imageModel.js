const{Schema,model}=require("mongoose");
const jwt=require("jsonwebtoken");

const imageSchema =Schema({
    id:{
        type:Number,
        required:true,
        primaryKey:true,
    },
    image_name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
    
},{timestamps:true}
);

module.exports.Image=model("Image",imageSchema);