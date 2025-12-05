const Patient = require("../model/Patient");
const uploadToS3 = require("../config/s3");

// Create patient
exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ message: "Patient created", patient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get patient by ID
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update patient
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ message: "Patient updated", patient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete patient
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ message: "Patient deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload patient document
exports.uploadDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const s3Url = await uploadToS3(req.file);

        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        patient.documents.push({ fileName: req.file.originalname, fileUrl: s3Url });
        await patient.save();

        res.status(200).json({ message: "Document uploaded", patient });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
