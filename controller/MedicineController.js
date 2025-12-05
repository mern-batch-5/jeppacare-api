const Medicine = require("../models/Medicine");

// @desc Add a new medicine
// @route POST /api/medicine
exports.addMedicine = async (req, res) => {
    try {
        const { name, batchNumber, expiryDate, stock, price, lowStockAlert } = req.body;

        const medicine = await Medicine.create({
            name,
            batchNumber,
            expiryDate,
            stock,
            price,
            lowStockAlert,
        });

        res.status(201).json({
            message: "Medicine added successfully",
            medicine,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all medicines
// @route GET /api/medicine
exports.getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ createdAt: -1 });
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get single medicine
// @route GET /api/medicine/:id
exports.getMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: "Medicine not found" });

        res.json(medicine);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update medicine
// @route PUT /api/medicine/:id
exports.updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!medicine) return res.status(404).json({ message: "Medicine not found" });

        res.json({
            message: "Medicine updated successfully",
            medicine,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete medicine
// @route DELETE /api/medicine/:id
exports.deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) return res.status(404).json({ message: "Medicine not found" });

        res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
