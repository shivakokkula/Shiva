import express from "express";
import faqcontroller from "../controllers/faq.controller.js"

const router = express.Router();

router
  .get('/', faqcontroller.get)
  .get('/:id', faqcontroller.getbyid)
  .post("/", faqcontroller.post)
  .put("/:id", faqcontroller.put)
  .delete("/:id", faqcontroller.deletebyid);

export default router;
