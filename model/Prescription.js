const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    medicines: [
        {
            medicine: {type: mongoose.Schema.Types.ObjectId, ref: "Medicine"},
            dosage:String,
            duration:String,
            quantity:Number
        }
    ],
    notes: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("Prescription", PrescriptionSchema);