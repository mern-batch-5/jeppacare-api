const Prescription = require("../model/Prescription");

// Create Prescription
exports.createPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.create(req.body);
        res.status(201).json({ message: "Prescription created", prescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Prescriptions
exports.getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate("patient", "firstName lastName patientId")
            .populate("doctor", "name email")
            .populate("medicines.medicine", "name price stock");
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Prescription by ID
exports.getPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate("patient", "firstName lastName patientId")
            .populate("doctor", "name email")
            .populate("medicines.medicine", "name price stock");
        if (!prescription) return res.status(404).json({ message: "Prescription not found" });
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Prescription
exports.updatePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prescription) return res.status(404).json({ message: "Prescription not found" });
        res.status(200).json({ message: "Prescription updated", prescription });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Prescription
exports.deletePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!prescription) return res.status(404).json({ message: "Prescription not found" });
        res.status(200).json({ message: "Prescription deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
