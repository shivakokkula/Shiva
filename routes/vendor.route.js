import express from "express";
import vendorcontroller from "../controllers/vendor.controller.js"

const router = express.Router();

router
  .get('/', vendorcontroller.get)
  .get('/:id', vendorcontroller.getbyid)
  .get('/event/:id', vendorcontroller.getbyevent)
  .post("/", vendorcontroller.post)
  .put("/:id", vendorcontroller.put)
  .delete("/:id", vendorcontroller.deletebyid);

export default router;
