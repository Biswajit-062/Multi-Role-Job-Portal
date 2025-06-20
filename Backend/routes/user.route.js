import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

const debugMiddleware = (req, res, next) => {
  console.log("Debug Middleware - req.file:", req.file);
  console.log("Debug Middleware - req.body:", req.body);
  next();
};

router.route("/register").post(debugMiddleware, singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);

export default router;
