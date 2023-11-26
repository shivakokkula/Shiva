import express from "express";
import staffcontroller from "../controllers/staff.controller.js"

const router = express.Router();

router
  .get('/', staffcontroller.get)
  .get('/:id', staffcontroller.getbyid)
  .get('/event/:id', staffcontroller.getbyevent)
  .post("/", staffcontroller.post)
  .post("/recharge", staffcontroller.recharge)
  .post("/refund", staffcontroller.refund)
  .post("/refund/approve", staffcontroller.approverefund)
  .put("/:id", staffcontroller.put)
  .delete("/:id", staffcontroller.deletebyid);

export default router;