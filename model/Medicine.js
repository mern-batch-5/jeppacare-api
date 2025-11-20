const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name:{type: String, required:true},
    batchNumber:{type: String},
    expiryDate:{type: Date},
    stock:{type: Number, required:true},
    price:{type: Number, required:true},
    lowStockAlert:{type: Number, default:10},
},{timestamps:true});

module.exports = mongoose.model("Medicine", MedicineSchema);