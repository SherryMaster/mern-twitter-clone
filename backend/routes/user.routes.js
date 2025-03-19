import express from "express";
import protectedRoute from "../middleware/protectedRoute";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getUserProfile);
router.get("/suggusted", protectedRoute, getUserProfiles);
router.post("/follow/:id", protectedRoute, followUnfollowUser);
router.post("/update", protectedRoute, updateUserProfile);

export default router;
