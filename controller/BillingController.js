const Billing = require("../model/Billing");
const Patient = require("../model/Patient");

// @desc Create a new bill
// @route POST /api/billing
exports.createBill = async (req, res) => {
    try {
        const { patient, type, items, paidAmount } = req.body;

        // Validate patient
        const patientExists = await Patient.findById(patient);
        if (!patientExists)
            return res.status(404).json({ message: "Patient not found" });

        // Calculate total amount
        const totalAmount = items.reduce((acc, item) => acc + item.total, 0);

        // Determine payment status
        let paymentStatus = "unpaid";
        if (paidAmount >= totalAmount) paymentStatus = "paid";
        else if (paidAmount > 0) paymentStatus = "partially_paid";

        const bill = await Billing.create({
            patient,
            type,
            items,
            totalAmount,
            paidAmount: paidAmount || 0,
            paymentStatus
        });

        res.status(201).json({
            message: "Billing record created successfully",
            bill,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get all bills
// @route GET /api/billing
exports.getBills = async (req, res) => {
    try {
        const bills = await Billing.find().populate("patient");
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get single bill
// @route GET /api/billing/:id
exports.getBill = async (req, res) => {
    try {
        const bill = await Billing.findById(req.params.id).populate("patient");

        if (!bill)
            return res.status(404).json({ message: "Billing record not found" });

        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Update bill (add more items, correct amounts, etc.)
// @route PUT /api/billing/:id
exports.updateBill = async (req, res) => {
    try {
        const updatedBill = await Billing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("patient");

        if (!updatedBill)
            return res.status(404).json({ message: "Billing record not found" });

        res.status(200).json({
            message: "Billing record updated successfully",
            bill: updatedBill,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Update payment (partial/full payment)
// @route PUT /api/billing/:id/payment
exports.updatePayment = async (req, res) => {
    try {
        const { paidAmount } = req.body;
        const bill = await Billing.findById(req.params.id);

        if (!bill)
            return res.status(404).json({ message: "Billing record not found" });

        bill.paidAmount += Number(paidAmount);

        // Update payment status
        if (bill.paidAmount >= bill.totalAmount) {
            bill.paymentStatus = "paid";
        } else if (bill.paidAmount > 0) {
            bill.paymentStatus = "partially_paid";
        } else {
            bill.paymentStatus = "unpaid";
        }

        await bill.save();

        res.status(200).json({
            message: "Payment updated successfully",
            bill,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Delete bill
// @route DELETE /api/billing/:id
exports.deleteBill = async (req, res) => {
    try {
        const bill = await Billing.findByIdAndDelete(req.params.id);

        if (!bill)
            return res.status(404).json({ message: "Billing record not found" });

        res.status(200).json({ message: "Billing record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
