import usercontroller from "../controllers/user.controller.js"
import auth from "../middlewares/checkAuth.js";
import express from "express";
const router = express.Router()

router
  .get('/',auth.isAdmin, usercontroller.get)
  .put('/:id',auth.isAdmin, usercontroller.put)
  .delete('/:id',auth.isAdmin, usercontroller.deletebyid)
  .get('/profile', usercontroller.getprofile)
  .put("/profile", usercontroller.updateprofile)
  .delete("/profile", usercontroller.deleteprofile);

export default router;