import { Router } from "express";

import authRouter from "./auth.js";
import eventsRouter from "./events.js";
import ticketsRouter from "./tickets.js";
import analyticsRouter from "./analytics.js";
import usersRouter from "./users.js";

const router = Router();


router.use("/auth", authRouter);
router.use("/events", eventsRouter);
router.use("/tickets", ticketsRouter);
router.use("/analytics", analyticsRouter);
router.use("/users", usersRouter);


export default router;
