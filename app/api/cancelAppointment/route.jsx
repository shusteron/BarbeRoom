import { connect } from "../../../dbConfig/dbConfig";
import Appointment from "../../../models/appointmentsModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


// Handler function to handle incoming GET requests
export async function GET(request) 
{
  console.log("Request method(cancelAppointment):", request.method);

  // Establishing a connection to the database
  await connect();

  if (request.method === 'GET') 
  {
    try 
    {
      // Get the token from the request headers
      const token = request.headers.get('Authorization').replace('Bearer ', '');

      // Decode the token to get the client's email
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const clientId = decodedToken.email;

      const currentDateTime = new Date();

      // Find the appointments that are scheduled for the future for this client
      const appointments = await Appointment.find({ clientId, appointmentDate: { $gte: currentDateTime } });

      console.log('Appointments:', appointments);

      // Sending a successful response with the list of appointments to the client
      return NextResponse.json(appointments);
    } 
      
    catch (error) 
    {
      console.log("Failed to fetch appointments from DB due to: " + error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } 
    
  else 
  {
    console.log("Not a GET request");
    return NextResponse.json({ error: 'Method Not Allowed' });
  }
}


// Handler function to handle incoming DELETE requests
export async function DELETE(request) 
{
  console.log("Request method(cancelAppointment):", request.method);

  // Establishing a connection to the database
  await connect();

  if (request.method === 'DELETE') 
  {
    try 
    {
      // Parsing the request body
      const requestBody = await request.json();
      const { appointmentId } = requestBody;

      // Deleting the appointment from the database using the appointmentId
      await Appointment.findByIdAndDelete(appointmentId);

      return NextResponse.json({ message: 'Appointment canceled successfully' });
    } 
    
    catch (error) 
    {
      console.log("Failed to cancel appointment due to: " + error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }
  } 
    
  else 
  {
    console.log("Not a DELETE request");
    return NextResponse.json({ error: 'Method Not Allowed' });
  }
}