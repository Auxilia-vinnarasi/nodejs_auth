const {registration}=require("../controllers/userController");
const express=require("express");
const router=express.Router();

router.route("/registration")
.post(registration);

module.exports=router;