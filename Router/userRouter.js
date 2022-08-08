const {registration,dashboard,profile,updateProfile}=require("../controllers/userController");
const userController=require("../controllers/userController");
const express=require("express");
const router=express.Router();

router.route("/registration")
.post(registration);

//router.post("/",upload.single("avatar"));

router.route("/dashboard")
.get(dashboard);

router.route("/profile")
.get(profile);

router.route("/updateprofile/:id")
.put(updateProfile);

router.post("/fileupload",userController.fileupload);
router.post("/deleteimage",userController.deleteimage);

module.exports=router;