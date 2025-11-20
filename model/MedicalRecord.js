const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    patient:{type: mongoose.Schema.Types.ObjectId, ref:"Patient", required:true},
    doctor:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    visitDate:{type: Date, default:date.now},
    diagnosis:{type: String},
    testResults:[{
        testName: String,
        fileUrl:String,
        uploadedAt:Date
    }]
},{timestamps:true});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);