import { Router } from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/events.controllers.js";


const router = Router();

router.get("/:eventId", getEvent);
router.get("/", getEvents);
router.post("/", createEvent);
router.put("/", updateEvent);
router.delete("/", deleteEvent);

export default router;
