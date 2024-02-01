import mongoose from "mongoose";
import { type } from "os";

const appointmentsSchema = new mongoose.Schema({
    clientId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clients', // Reference to the clients model
      required: true
    },
    barberId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'barbers', // Reference to the barbers model
        required: true
    },
    appointment_date: 
    {
        type: Date,
        required: true
    },
    appointment_hour: 
    {
        type: String,
        required: true
    },
    appointment_haircutType: 
    {
        type: String,
        required: true
    }
})

const appointments = mongoose.models.appointments || mongoose.model("appointments", appointmentsSchema);

export default appointments; 