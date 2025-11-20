const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient:{type: mongoose.Schema.Types.ObjectId, ref:"Patient", required:true},
    doctor:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    date:{type: Date, required:true},
    time:{type: String, required:true},
    status:{
        type: String,
        enum:["booked", "completed", "rescheduled","cancelled","noShow"],
        default:"booked"
    },
    type:{type: String, enum:["online", "walk-in"], default:"walk-in"},
    notes:{type: String},
},{timestamps:true});

module.exports = mongoose.model("Appointment", AppointmentSchema);