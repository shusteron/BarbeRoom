// // pages/api/shifts.js

import { connect } from '../../../dbConfig/dbConfig';
import Shift from '../../../models/shiftModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token, shiftDay, morningShift, eveningShift } = reqBody;

    // Decode the token to get the barber's email
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const barberMail = decodedToken.email;


    // Ensure morningShift and eveningShift are boolean values
    const isMorningShift = typeof morningShift === 'boolean' ? morningShift : false;
    const isEveningShift = typeof eveningShift === 'boolean' ? eveningShift : false;

    const newShift = new Shift({
      barberMail,
      shiftDay,
      morningShift: isMorningShift,
      eveningShift: isEveningShift,
    });

    const savedShift = await newShift.save();
    console.log('Shift record saved:', savedShift);

    return NextResponse.json(savedShift, { status: 201 });
  } catch (error) {
    console.error('Error saving shift record:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
