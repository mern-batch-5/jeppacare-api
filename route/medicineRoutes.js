const express = require("express");
const router = express.Router();

const {
    addMedicine,
    getMedicines,
    getMedicine,
    updateMedicine,
    deleteMedicine
} = require("../controller/MedicineController");

// If needed in future:
// const auth = require("../middleware/auth");
// const adminOnly = require("../middleware/adminOnly");

// CRUD Routes
router.post("/", addMedicine);
router.get("/", getMedicines);
router.get("/:id", getMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

module.exports = router;
