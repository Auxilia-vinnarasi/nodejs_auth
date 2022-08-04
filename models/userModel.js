const {Schema,model}=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=Schema({
    phone_number:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        unique: true,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone_verified:{
        type:Boolean,
        required:true,
    },
    device_id:{
        type:String,
        required:true,
    },
},{timestamps:true})

//create a token to give it to user
/*userSchema.methods.generateJWT=function(){
    const token=jwt.sign({
        _id:this._id,
        phone_number:this.phone_number,
        name:this.name,
        email:this.email,
        phone_verified:this.phone_verified,
        device_id:this.device_id,
    },process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
    return token;
};
*/

//const User=model("User",userSchema);
//module.exports=User;

module.exports.User=model("User",userSchema);