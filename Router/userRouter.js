const {registration,dashboard,profile,updateProfile}=require("../controllers/userController");
const express=require("express");
const router=express.Router();

router.route("/registration")
.post(registration);

router.route("/dashboard")
.get(dashboard);

router.route("/profile")
.get(profile);

router.route("/updateprofile/:id")
.put(updateProfile);

module.exports=router;