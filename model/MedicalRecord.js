const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    patient:{type: mongoose.Schema.Types.ObjectId, ref:"Patient", required:true},
    doctor:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    visitDate:{type: Date, default:Date.now},
    diagnosis:{type: String},
    testResults:[{
        testName: String,
        fileUrl:String,
        uploadedAt:{type:Date, default:Date.now}
    }]
},{timestamps:true});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);