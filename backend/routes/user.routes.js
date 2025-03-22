import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import {
  getUserProfile,
  followUnfollowUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getUserProfile);
// router.get("/suggusted", protectedRoute, getUserProfiles);
router.post("/follow/:id", protectedRoute, followUnfollowUser);
// router.post("/update", protectedRoute, updateUserProfile);

export default router;
