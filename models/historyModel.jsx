import mongoose from "mongoose";
import { type } from "os";


const historySchema = new mongoose.Schema({
  clientId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  barberId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'barbers',
    required: true
  },
  date: 
  {
    type: Date,
    required: true
  },
  hour: 
  {
      type: String,
      required: true
  },
  haircutType: 
  {
      type: String,
      required: true
  }
});


const history = mongoose.models.history || mongoose.model("history", historySchema);

export default history; 
