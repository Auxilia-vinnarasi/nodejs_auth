const {User}=require("../models/userModel");
//const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");

//registration
module.exports.registration=function(req,res){
   // var hashedPassword=bcrypt.hashSync(req.body.password,8);
    User.create({
        phone_number:req.body.phone_number,
        name:req.body.name,
        email:req.body.email,
        phone_verified:req.body.phone_verified,
        device_id:req.body.device_id,
       // password:hashedPassword,
    },
    function(err,user){
        if(err){
            return res
            .status(500)
            .json({message:"There was a problem registering the user and its already exist"})
        }
        //create a token to give it to user
        const token=jwt.sign({
                _id:this._id,
                phone_number:this.phone_number,
                name:this.name,
                email:this.email,
                phone_verified:this.phone_verified,
                device_id:this.device_id,
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"})
            //return token;
        res
       .status(200)
       .send({user,token:token});
    });

}

//dashboard





