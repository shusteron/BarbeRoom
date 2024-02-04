// pages/api/shifts.js

import {connect} from '../../../dbConfig/dbConfig';
import Shift from '../../../models/shiftModel';
import { NextRequest, NextResponse } from "next/server";
connect();



export async function POST(req) {
  try {
    const reqBody = await req.json();
    console.log('Request Payload:', reqBody);
    
    if (!reqBody || typeof reqBody !== 'object') {
      throw new Error('Invalid request body');
    }

    const { barberMail, date, shift } = reqBody;
    console.log('barberMail:', barberMail);
    console.log('date:', date);
    console.log('shift:', shift);

    const newShift = new Shift({
      barberMail: barberMail, 
      shiftDay: date,
      shiftTime: shift,
    });

    const savedShift = await newShift.save();
    console.log('Shift record saved:', savedShift);

    return NextResponse.json(savedShift, { status: 201 });

  } catch (error) {
    console.error('Error saving shift record:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
