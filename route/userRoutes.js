const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    updateRole,
    generateResetToken,
    resetPassword,
    deleteUser
} = require("../controller/UserController");

// Middlewares
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// ----------- PUBLIC ROUTES ---------------
router.post("/register", registerUser);
router.post("/login", loginUser);

// Password Reset
router.post("/reset-password", generateResetToken);
router.post("/reset-password/:token", resetPassword);

// ----------- PROTECTED ROUTES ---------------
router.use(auth); // All routes below require login

// Admin-only routes
router.get("/", adminOnly, getUsers);
router.put("/:id/role", adminOnly, updateRole);
router.delete("/:id", adminOnly, deleteUser);

// Logged-in user routes
router.get("/:id", getUser);
router.put("/:id", updateUser);

module.exports = router;
