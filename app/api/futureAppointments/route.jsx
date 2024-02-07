// api/future-appointments.js

import { connect } from "../../../dbConfig/dbConfig";
import Appointment from "../../../models/appointmentsModel";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const reqBody = await request.json();
      const token = reqBody.token;
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const clientEmail = decodedToken.email;

      const currentDate = new Date();
      const clientAppointments = await Appointment.find({ 
        clientId: clientEmail,
        appointmentDate: { $gte: currentDate } // Only appointments after the current date
      }).select('barberId appointmentDate appointmentHour appointmentHaircutType');

      return NextResponse.json(clientAppointments);
    } catch (error) {
      console.log("Error:", error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' });
  }
}
