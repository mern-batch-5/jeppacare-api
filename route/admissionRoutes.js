const express = require("express");
const router = express.Router();

const {
    createAdmission,
    getAdmissions,
    getAdmission,
    updateAdmission,
    addProgressNote,
    dischargePatient,
    deleteAdmission
} = require("../controller/AdmissionController");

// Middlewares
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// -------- PUBLIC (optional) --------
// You can keep all private if needed

// -------- PROTECTED ROUTES --------
router.use(auth);

// Admin only create/update/delete
router.post("/", adminOnly, createAdmission);
router.put("/:id", adminOnly, updateAdmission);
router.delete("/:id", adminOnly, deleteAdmission);
router.put("/:id/discharge", adminOnly, dischargePatient);

// Normal authenticated user routes
router.get("/", getAdmissions);
router.get("/:id", getAdmission);
router.post("/:id/notes", addProgressNote);

module.exports = router;