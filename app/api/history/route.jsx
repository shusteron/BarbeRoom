import {connect} from "../../../dbConfig/dbConfig";
import Appointment from "../../../models/appointmentsModel";
import Barbers from "../../../models/barberModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'; // Import JWT library

connect();

// Handler function to handle incoming HTTP requests
export async function POST(request) {
  console.log("Request method:", request.method);

  if (request.method === 'POST') {
    try {
      // Initializing the token object.
      const reqBody = await request.json();
      const token = reqBody.token;

      
      // Decode the token to get the client's email
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const clientEmail = decodedToken.email;

      console.log("Client Email:", clientEmail);

      // Finding all appointments for the given client email from the database
      const clientAppointments = await Appointment.find({ clientId: clientEmail }).select('barberId appointmentDate appointmentHour appointmentHaircutType');

      console.log("Client Appointments:", clientAppointments);
      
      // Sending a successful response with the list of appointments
      return NextResponse.json(clientAppointments);
    } catch (error) {
      console.log("Error:", error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } else {
    // Handling other HTTP methods which are not relatable (GET, PUT, DELETE..)  
    return NextResponse.json({ error: 'Method Not Allowed' });
  }
}