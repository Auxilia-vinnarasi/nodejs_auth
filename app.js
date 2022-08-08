const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const multer=require("multer");

const path=require("path");

const userRouter=require("./Router/userRouter");

const app=express();

app.use(cors("corsOptions"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//routes which should handle req
app.use("/api/user",userRouter);

//app.use("/public",express.static("public"));
//app.use("/avatar",express.static("upload"));

//storage engine

const storage=multer.diskStorage({
    destination:"./upload",
    filename:(req,file,cb)=>{//how the file name saved //callback return 2 params error and result-error null 
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  });
  
  //it will automatically create the path
  const upload=multer({
   //dest:"./upload",
      storage:storage,
      limits:{fileSize:1024*1024*5}
  });

//upload folder will serve the static content- we can access using /avatar -tag name in req -form data
  app.use("/avatar",express.static("upload"));
//avatar-tag name in postman
  app.post("/uploadimage",upload.single("avatar"),function(req,res){
    console.log(req.file);
   res.json({
    success:1,
    avatar_url:`http://localhost:5000/avatar/${req.file.filename}`
   })
   
  });

  //global way of handling error
  function errHandler(err,req,res,next){
    if(err instanceof multer.MulterError){
        res.json({
            success:0,
            message:err.message
        })
    }
  }

app.use(errHandler);


app.get("/",(req,res)=>{
    res.send("Nodejs Auth system with reg,dashboard,profile,update profile using JWT");
})

module.exports=app;