import mongoose from "mongoose";
import { type } from "os";

const appointmentsSchema = new mongoose.Schema({
    clientId: 
    {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'clients', // Reference to the clients model
        required: true
    },
    barberId:
    {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'barbers', // Reference to the barbers model
        required: true
    },
    appointmentDate: 
    {
        type: Date,
        required: true
    },
    appointmentHour: 
    {
        type: String,
        required: true
    },
    appointmentHaircutType: 
    {
        type: String,
        required: true
    }
})

const Appointment = mongoose.models.appointments || mongoose.model("appointments", appointmentsSchema);

export default Appointment; 