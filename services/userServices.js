//const {User}=require("../models/userModel");
const {Image}=require("../models/imageModel");
require("dotenv/config");

var env       = process.env.NODE_ENV || 'production';  
var config    = require(__dirname + '/../config/config.json')[env]; 
var db        = {};  
 
//file upload api
module.exports.fileuploadimage=async function(param)
{
    try{
        if(param.file==null){
        var record=Image.find({
         image_name:param.body.image_name
          },{where:{id:param.body.id}});
          }
  else{
  var record=Image.find({
      image_name:param.body.image_name,
      image:process.env.imageURL+ param.file.path,
     },{where:{id:param.body.id}})
   }
     return record;
    }
    catch(err)
    {
    throw Error(err);
    }
}


//deleteImage API
module.exports.deleteImagedata=async function(params){
    try{
        console.log(params);
        var deleteimage=Image.findByIdAndRemove({
          where:{
            id:params.id
          },
        })
        return deleteimage;
    }
    catch(err)
    {
      throw Error(err);
    }
  
  }