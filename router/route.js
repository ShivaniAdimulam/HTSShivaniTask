const apiController=require("../apis/allapis.js")
const express=require("express");
const app = express();
const router=express.Router()

router.post("/register",apiController.registration);
router.post("/login",apiController.login);

module.exports=router