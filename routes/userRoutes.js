import express from "express";
import {
  getAllUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// get all users - /api/v1/user/all-users
router.get("/all-users", getAllUser);

// create user - /api/v1/user/register
router.post("/register", registerUser);

// login user - /api/v1/user/login
router.post("/login", loginUser);

export default router;
