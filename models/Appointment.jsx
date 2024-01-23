import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI); // connect the mongoDB through .env.local
mongoose.Promise = global.Promise

const appointmentSchema = new Schema(
    {
        barber: String,
        date: Date,
        hour: String,
        haircut: String
    }
);

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
export default Appointment;