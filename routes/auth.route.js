import usercontroller from "../controllers/user.controller.js"
import auth from "../middlewares/checkAuth.js";
import express from "express";
const router = express.Router()

router
.post("/register", usercontroller.register)
.post("/login", usercontroller.login)
.post("/forgot-password", usercontroller.forgotpassword)
.put("/reset-password", auth.checkToken,usercontroller.resetpassword);
export default router;