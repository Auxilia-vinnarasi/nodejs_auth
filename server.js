require("dotenv/config");
const mongoose=require("mongoose");
const app=require("./app");

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("MongoDb connected successfully"))
.catch((err)=>console.log("Mongodb not connected properly"));


//connection to the server
const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});

