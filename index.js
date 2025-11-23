const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Middlewares
app.use(express.json());

// Import Routes
const userRoutes = require("./route/userRoutes");

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

// Add more routes later:
// app.use("/api/patients", patientRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/lab", labRoutes);
// app.use("/api/pharmacy", pharmacyRoutes);
// app.use("/api/billing", billingRoutes);

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
