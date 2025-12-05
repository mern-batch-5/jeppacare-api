const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middlewares
app.use(express.json());

// Import Routes
const userRoutes = require("./route/userRoutes");
const admissionRoutes = require("./route/admissionRoutes");
const appointmentRoutes = require("./route/appointmentRoutes");
const billingRoutes = require("./route/billingRoutes");
const labRoutes = require("./route/labRoutes");
const medicalRecordRoutes = require("./route/medicalRecordRoutes");
const medicineRoutes = require("./route/medicineRoutes");
const patientRoutes = require("./route/patientRoutes");
const prescriptionRoutes = require("./route/prescriptionRoutes");

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

// ---------------------
//   API ROUTES INDEX
// ---------------------

// /api/users → userRoutes
app.use("/api/users", userRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/lab", labRoutes);
app.use("/medical-record", medicalRecordRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// ---------------------
//   ROOT ENDPOINT
// ---------------------
app.get("/", (req, res) => {
    res.send("Hospital Management System API Running");
});

// ---------------------
//   START SERVER
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
