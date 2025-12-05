const express = require("express");
const router = express.Router();

const {
    createBill,
    getBills,
    getBill,
    updateBill,
    updatePayment,
    deleteBill
} = require("../controller/BillingController");

const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

// All routes require login
router.use(auth);

// Admin only
router.post("/", adminOnly, createBill);
router.delete("/:id", adminOnly, deleteBill);

// General access (doctor, nurse, receptionist, etc.)
router.get("/", getBills);
router.get("/:id", getBill);
router.put("/:id", updateBill);

// Payment updates (cashier / admin)
router.put("/:id/payment", updatePayment);

module.exports = router;
