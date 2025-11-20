const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patientId:{type: String, unique:true},
    firstName:{type: String, required:true},
    lastName:{type: String},
    gender:{type: String},
    dob:{type: Date},
    contact:{type: String},
    address:{type: String},
    medicalHistory:[{type: String}],
    documents:[
        {fileName:String, fileUrl: String, uploadedDate:Date}
    ]
},{timestamps:true});

module.exports = mongoose.model("patient", PatientSchema);