import express from "express";
import rolecontroller from "../controllers/role.controller.js"

const router = express.Router();

router
  .get('/', rolecontroller.get)
  .get('/:id', rolecontroller.getbyid)
  .post("/", rolecontroller.post)
  .put("/:id", rolecontroller.put)
  .delete("/:id", rolecontroller.deletebyid);

export default router;
