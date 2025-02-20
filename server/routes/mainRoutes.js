import express from "express";
import { createUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/profile", isAuthenticated, (req, res) => {
    res.json({ message: "Perfil del usuario", user: req.session.user });
});

export default router;
