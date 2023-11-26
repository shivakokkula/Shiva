import express from "express";
import qrcontroller from "../controllers/qr.controller.js"

const router = express.Router();

router
  .get('/:id', qrcontroller.getbyevent)
  .post("/generate", qrcontroller.generate)
  .put("/:id", qrcontroller.put)
  .delete("/:id", qrcontroller.deletebyid)

export default router;
