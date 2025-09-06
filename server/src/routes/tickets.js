import { Router } from "express";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import {
  buyTickets,
  getUserTickets,
  getTicketsByEventId,
} from "../controllers/tickets.controllers.js";

const router = Router();

router.post("/", buyTickets);

router.get("/:userId", getUserTickets);

export default router;
