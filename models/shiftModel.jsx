// models/Shift.js
import mongoose from 'mongoose';


const shiftSchema = new mongoose.Schema({
  barberId:
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'barbers', // Reference to the barbers model
      required: true
  },
  shiftDay: 
  {
      type: Date,
      required: true
  },
  shiftTime: 
  {
      type: String,
      required: true
  }
})

const Shift = mongoose.models.Shift || mongoose.model('Shift', shiftSchema);

export default Shift;  