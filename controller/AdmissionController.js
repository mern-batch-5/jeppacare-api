const Admission = require("../model/Admission");
const Patient = require("../model/Patient");

// @desc Create Admission
// @route POST /api/admissions
exports.createAdmission = async (req, res) => {
    try {
        const { patient, bedNumber, ward, admissionDate } = req.body;

        const patientExists = await Patient.findById(patient);
        if (!patientExists) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const admission = await Admission.create({
            patient,
            bedNumber,
            ward,
            admissionDate,
        });

        res.status(201).json({
            message: "Admission created successfully",
            admission,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get all admissions
// @route GET /api/admissions
exports.getAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find()
            .populate("patient");

        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get single admission
// @route GET /api/admissions/:id
exports.getAdmission = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id)
            .populate("patient");

        if (!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }

        res.status(200).json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Update admission
// @route PUT /api/admissions/:id
exports.updateAdmission = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }

        res.status(200).json({
            message: "Admission updated successfully",
            admission,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Add progress note
// @route POST /api/admissions/:id/notes
exports.addProgressNote = async (req, res) => {
    try {
        const { note } = req.body;

        const admission = await Admission.findById(req.params.id);

        if (!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }

        admission.progressNotes.push({ note });
        await admission.save();

        res.status(200).json({
            message: "Progress note added",
            admission,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Discharge patient
// @route PUT /api/admissions/:id/discharge
exports.dischargePatient = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);

        if (!admission) return res.status(404).json({ message: "Admission not found" });

        admission.dischargeDate = new Date();
        await admission.save();

        res.status(200).json({
            message: "Patient discharged successfully",
            admission,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Delete admission
// @route DELETE /api/admissions/:id
exports.deleteAdmission = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndDelete(req.params.id);

        if (!admission) return res.status(404).json({ message: "Admission not found" });

        res.status(200).json({ message: "Admission deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
