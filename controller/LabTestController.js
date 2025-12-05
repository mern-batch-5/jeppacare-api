const LabTest = require("../model/LabTest");
const Patient = require("../model/Patient");
const User = require("../model/User");

// @desc Create a lab test
// @route POST /api/lab
exports.createLabTest = async (req, res) => {
    try {
        const { patient, doctor, testName } = req.body;

        const patientExists = await Patient.findById(patient);
        if (!patientExists)
            return res.status(404).json({ message: "Patient not found" });

        const doctorExists = await User.findById(doctor);
        if (!doctorExists)
            return res.status(404).json({ message: "Doctor not found" });

        const labTest = await LabTest.create({
            patient,
            doctor,
            testName,
        });

        res.status(201).json({
            message: "Lab test created successfully",
            labTest,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get all lab tests
// @route GET /api/lab
exports.getLabTests = async (req, res) => {
    try {
        const tests = await LabTest.find()
            .populate("patient")
            .populate("doctor")
            .populate("assignedTechnician");

        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get single lab test
// @route GET /api/lab/:id
exports.getLabTest = async (req, res) => {
    try {
        const test = await LabTest.findById(req.params.id)
            .populate("patient")
            .populate("doctor")
            .populate("assignedTechnician");

        if (!test)
            return res.status(404).json({ message: "Lab test not found" });

        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Assign technician
// @route PUT /api/lab/:id/assign
exports.assignTechnician = async (req, res) => {
    try {
        const { technicianId } = req.body;

        const technician = await User.findById(technicianId);
        if (!technician || technician.role !== "lab_technician")
            return res.status(400).json({ message: "Invalid technician" });

        const test = await LabTest.findById(req.params.id);
        if (!test)
            return res.status(404).json({ message: "Lab test not found" });

        test.assignedTechnician = technicianId;
        test.status = "processing";
        test.updatedDate = new Date();
        await test.save();

        res.status(200).json({
            message: "Technician assigned successfully",
            test,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Update test status
// @route PUT /api/lab/:id/status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const test = await LabTest.findById(req.params.id);

        if (!test)
            return res.status(404).json({ message: "Lab test not found" });

        test.status = status;
        test.updatedDate = new Date();
        await test.save();

        res.status(200).json({
            message: "Status updated successfully",
            test,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Upload lab report file
// @route PUT /api/lab/:id/report
exports.uploadReport = async (req, res) => {
    try {
        const { reportFile } = req.body;

        const test = await LabTest.findById(req.params.id);
        if (!test)
            return res.status(404).json({ message: "Lab test not found" });

        test.reportFile = reportFile;
        test.status = "completed";
        test.updatedDate = new Date();
        await test.save();

        res.status(200).json({
            message: "Report uploaded successfully",
            test,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Delete lab test
// @route DELETE /api/lab/:id
exports.deleteLabTest = async (req, res) => {
    try {
        const test = await LabTest.findByIdAndDelete(req.params.id);
        if (!test)
            return res.status(404).json({ message: "Lab test not found" });

        res.status(200).json({ message: "Lab test deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
