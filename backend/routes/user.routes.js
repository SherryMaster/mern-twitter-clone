import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { uploadMultiple } from "../middleware/uploadMiddleware.js";
import {
  getUserProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getUserProfile);
router.get("/suggested", protectedRoute, getSuggestedUsers);
router.post("/follow/:id", protectedRoute, followUnfollowUser);
router.put(
  "/update",
  protectedRoute,
  uploadMultiple(["profileImg", "coverImg"]),
  updateUser
);

export default router;
