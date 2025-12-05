const express = require("express");
const router = express.Router();

const {
    createPrescription,
    getPrescriptions,
    getPrescription,
    updatePrescription,
    deletePrescription
} = require("../controller/prescriptionController");

// CRUD routes
router.post("/", createPrescription);
router.get("/", getPrescriptions);
router.get("/:id", getPrescription);
router.put("/:id", updatePrescription);
router.delete("/:id", deletePrescription);

module.exports = router;
