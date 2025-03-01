import express from "express";
import { subscribe, getSubscribers } from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", getSubscribers);

export default router;
