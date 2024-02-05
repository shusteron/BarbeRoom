// models/Shift.js
import mongoose from 'mongoose';


const shiftSchema = new mongoose.Schema({
    barberMail:
  {
      //type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: 'barbers', // Reference to the barbers model
      required: true
  },
    shiftDay: 
  {
      type: Date,
      required: true
  },
    morningShift: 
  {
    type: Boolean,
    default: false,
  },
  eveningShift: 
  {
    type: Boolean,
    default: false,
  }
})

const Shift = mongoose.models.shift || mongoose.model('shift', shiftSchema);

export default Shift;
