const MedicalRecord = require("../model/MedicalRecord");
const uploadToS3 = require("../config/s3");

exports.uploadTestResult = async (req, res) => {
    try {
        const recordId = req.params.id;
        const { testName } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const fileUrl = await uploadToS3(req.file);

        const record = await MedicalRecord.findById(recordId);
        if (!record) {
            return res.status(404).json({ error: "Medical record not found" });
        }

        record.testResults.push({
            testName,
            fileUrl
        });

        await record.save();

        res.status(200).json({
            message: "File uploaded successfully",
            fileUrl,
            record
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
