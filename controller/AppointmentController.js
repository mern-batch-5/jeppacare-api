const Appointment = require("../model/Appointment");
const Patient = require("../model/Patient");
const User = require("../model/User");

// @desc Create an appointment
// @route POST /api/appointments
exports.createAppointment = async (req, res) => {
    try {
        const { patient, doctor, date, time, type, notes } = req.body;

        const patientExists = await Patient.findById(patient);
        if (!patientExists)
            return res.status(404).json({ message: "Patient not found" });

        const doctorExists = await User.findById(doctor);
        if (!doctorExists)
            return res.status(404).json({ message: "Doctor not found" });

        const appointment = await Appointment.create({
            patient,
            doctor,
            date,
            time,
            type,
            notes,
        });

        res.status(201).json({
            message: "Appointment created successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get all appointments
// @route GET /api/appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient")
            .populate("doctor");

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Get single appointment
// @route GET /api/appointments/:id
exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate("patient")
            .populate("doctor");

        if (!appointment)
            return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Update appointment
// @route PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
            .populate("patient")
            .populate("doctor");

        if (!appointment)
            return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Change status: completed, cancelled, rescheduled, noShow
// @route PUT /api/appointments/:id/status
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment)
            return res.status(404).json({ message: "Appointment not found" });

        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            message: "Status updated successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc Delete appointment
// @route DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!appointment)
            return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};