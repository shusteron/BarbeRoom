// pages/api/shifts.js

import {connect} from '../../../dbConfig/dbConfig';
import Shift from '../../../models/shiftModel';
import { NextRequest, NextResponse } from "next/server";



export async function POST(req) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await connect();

      const { barberId, date, shift} = req.body;

      // Check if there are already three employees working on the same day and shift
      //const existingShiftsCount = await Shift.countDocuments({ Date, shift });
      //if (existingShiftsCount >= 3) {
       // return res.status(400).json({ error: 'Maximum number of employees for this shift reached' });
     // }

      // Check if there is already a record for the employee on the same day and shift
      const existingRecord = await Shift.findOne({ barberId, date, shift });

      if (existingRecord) {
        //  return res.status(400).json({ error: 'Employee already has a shift record for this day and time' });
        return NextResponse.json({ error: 'Employee already has a shift record for this day and time' });
      }

      // Create a new Shift document and save it to the database
      const newShift = new Shift({
        barberId,
        shiftDay: date,
        shiftTime: shift,
      });
 
      await newShift.save();

      console.log('Shift record saved:', newShift);

      // res.status(201).json(newShift);
      return NextResponse.json(newShift);

    } catch (error) {
      console.error('Error saving shift record:', error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return NextResponse.json({ error: 'Internal Server Error' });

    }
  } 
  
    else {
      // res.status(404).json({ error: 'Not Found' });
      return NextResponse.json({ error: 'Not Found' });
    }
}