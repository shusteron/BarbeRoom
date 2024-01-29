import mongoose from "mongoose";
import { type } from "os";

const barberScheduleSchema = new mongoose.Schema({
    barberId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'barbers', // Reference to the barbers model
        required: true
    },
    date: 
    {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    haircutType: {
        type: String,
        required: true
    }
})

const BarberSchedule = mongoose.models.schedule || mongoose.model("schedule", barberScheduleSchema);

export default BarberSchedule; 




