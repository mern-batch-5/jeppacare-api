const mongoose = require('mongoose');

const UserSchema =
    new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        phone: {type: String},
        role: {
            type: String,
            enum: ["admin", "doctor", "nurse", "lab", "pharmacist", "receptionist"],
            required: true
        },
        password:{type:String, required:true},
        profileImage:{type:String},
        resetToken:{type: String},
        resetTokenExpiry:{type: Date},

        specialization:{type:String},
        Qualifications:{type:String},
        experience:{type:Number},

        availability:[
            {day:String, startTime: String, endTime: String}
        ]

    }, {timestamps: true});

module.exports =  mongoose.model("User", UserSchema);