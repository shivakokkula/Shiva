import express from "express";
import companycontroller from "../controllers/company.controller.js"

const router = express.Router();

router
  .get('/', companycontroller.get)
  .get('/:id', companycontroller.getbyid)
  .get('/event/:id', companycontroller.getbyevent)
  .post("/", companycontroller.post)
  .put("/:id", companycontroller.put)
  .delete("/:id", companycontroller.deletebyid);

export default router;
