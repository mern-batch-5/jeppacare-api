const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
    uploadDocument
} = require("../controller/patientController");

// CRUD
router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

// Upload document
router.post("/:id/document", upload.single("file"), uploadDocument);

module.exports = router;
