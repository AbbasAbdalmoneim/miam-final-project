import { Router } from "express";
import User from "../models/user.js"; // ✨ غير الباث حسب مكان الموديل

const router = Router();

// GET /users → رجع كل المستخدمين
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
