const {User}=require("../models/userModel");
//const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");

//registration API
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
        if(err)
            return res
            .status(500)
            .json({message:"There was a problem registering the user and its already exist"})
        
        console.log(user);
        //create a token to give it to user
        var token=jwt.sign({
                id:user._id,//_id:this._id,
                phone_number:this.phone_number,//phone_number:this.phone_number,
                name:this.name,//name:this.name,
                email:this.email,//email:this.email,
                phone_verified:this.phone_verified,//phone_verified:this.phone_verified,
                device_id:this.device_id,//device_id:this.device_id,
            },
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"})
            //return token;
        res
       .status(200)
       .send({user,token:token,auth:true});
    }
    );

}

//dashboard API
//Let’s write a piece of code to get the user id based on the token we got back from the registration endpoint.

module.exports.dashboard=function(req,res,user){
   //jwt header
        var token = req.headers['x-access-token'];
        if (!token) 
        return res.status(401).send({ user,auth: false, message: 'No token provided.'});
        
        jwt.verify(token,process.env.JWT_SECRET_KEY, function(err,user,decoded) 
        {
          if (err) 
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
          
         res.status(200).send({user,decoded,message:"Token is authenticated properly"});
        }
        );
      }

//view profile API
module.exports.profile=function(req,res){
  //jwt token header
  var token=req.headers["x-access-token"];
  if(!token)
  return res
  .status(401)
  .send({auth:false,message:"No token provided"});

  jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,user)
  {
    if(err)
    return res
    .status(500)
    .send({auth:false,message:"Failed to authenticate token"})

  //get the user id 
  User.findById(user.id,function(err,user){
  //console.log(user);
  if(err)
  return res
  .status(500)
  .send("There was a problem finding the user");
  if(!user)
  return res 
  .status(404).send("No user found");

  res.status(200).send(user);
  })
  }
  )
}

//update profile API
module.exports.updateProfile=function(req,res){
  //jwt token header
  var token=req.headers["x-access-token"];
  if(!token)
    return res
    .status(401)
    .send({auth:false,message:"No token provided.."})
  
  jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,user)
  {
    if(err)
      return res
      .status(500)
      .send({auth:false,message:"Failed to authenticate token.."})
    
    //update profile 
 
   User.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,user)

  {
    if(!user)
    return res
    .status(404)
    .send("the user with given id was not found");

    if(err)
    return res
    .status(500)
    .send("There was a problem updating the user");

    res
    .status(200)
    .send(user);
  })

  });
}







