const express = require("express");
const router = express.Router();

const {
    createLabTest,
    getLabTests,
    getLabTest,
    assignTechnician,
    updateStatus,
    uploadReport,
    deleteLabTest
} = require("../controller/LabTestController");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// All lab routes require login
router.use(auth);

// ADMIN ONLY → create & delete tests
router.post("/", adminOnly, createLabTest);
router.delete("/:id", adminOnly, deleteLabTest);

// General access
router.get("/", getLabTests);
router.get("/:id", getLabTest);

// Assign technician
router.put("/:id/assign", adminOnly, assignTechnician);

// Technician or admin can update status
router.put("/:id/status", updateStatus);

// Upload report (technician/admin)
router.put("/:id/report", uploadReport);

module.exports = router;
