import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide your Last name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
})

const Barbers = mongoose.models.barbers || mongoose.model("barbers", barberSchema);

export default Barbers;