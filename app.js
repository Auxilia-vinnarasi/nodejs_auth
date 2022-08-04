const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");

const userRouter=require("./Router/userRouter");

const corsOptions={
    origin:"http://localhost:3000",
    credentials:true,
    optionSuccessstatus:200,
}
const app=express();

app.use(cors("corsOptions"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Nodejs Auth system with reg,dashboard,profile,update profile using JWT");
})

module.exports=app;