import express from "express";
import auth from "../middlewares/checkAuth.js";
import eventcontroller from "../controllers/event.controller.js"

const router = express.Router();

router
  .get('/', eventcontroller.get)
  .get('/my', eventcontroller.getmyevents)
  .post("/", eventcontroller.post)
  .put("/:id", eventcontroller.put)
  .put("/approve/:id", auth.isAdmin, eventcontroller.approve)
  .delete("/:id", eventcontroller.deletebyid);

export default router;