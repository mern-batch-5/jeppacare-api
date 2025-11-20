const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true},
    type: {type: String, enum:["OPD", "IPD", "pharmacy", "lab"], required:true},
    items: [
        {
            name:String,
            price:Number,
            total:Number,
            quantity:Number
        }
    ],
    totalAmount:{type:Number, required:true},
    paidAmount:{type:Number, default:0},
    paymentStatus: {type: String, enum:["unpaid", "paid", "partially_paid"], default:"unpaid"}
}, {timestamps: true});

module.exports = mongoose.model("Billing", BillingSchema);