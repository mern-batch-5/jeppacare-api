const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadTestResult } = require("../controller/medicalRecordController");

// POST /medical-record/upload/:id
router.post(
    "/upload/:id",
    upload.single("file"),
    uploadTestResult
);

module.exports = router;
