const express = require("express");
const router = express.Router();

const {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    updateStatus,
    deleteAppointment
} = require("../controller/AppointmentController");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// -------- PROTECTED ROUTES --------
router.use(auth);

// ADMIN ONLY CREATE / DELETE
router.post("/", adminOnly, createAppointment);
router.delete("/:id", adminOnly, deleteAppointment);

// ADMIN & DOCTOR CAN UPDATE
router.put("/:id", updateAppointment);
router.put("/:id/status", updateStatus);

// ALL LOGGED-IN USERS CAN VIEW
router.get("/", getAppointments);
router.get("/:id", getAppointment);

module.exports = router;