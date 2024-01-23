import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name "],
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please provide your phone number"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
})

const Clients = mongoose.models.clients || mongoose.model("clients", clientSchema);

export default Clients;