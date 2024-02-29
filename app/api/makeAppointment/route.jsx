import {connect} from "../../../dbConfig/dbConfig"
import Barbers from "../../../models/barberModel"
import Appointment from "../../../models/appointmentsModel" 
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// Handler function to handle incoming GET requests
export async function GET(request) 
{   
    console.log("Request method(makeAppointment):", request.method);

    // Establishing a connection to the database
    await connect(); 

    if (request.method === 'GET')  
    { 
      try  
      {
        const barbers = await Barbers.find({});
        console.log('Barbers:', barbers);

        // Sending a successful response with the list of barbers to the client
        return NextResponse.json(barbers);
      } 
       
      catch (error) 
      {
        console.log("Failed to fetch barbers from DB due to: " + error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      console.log("Not a GET request");
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
  } 


// Handler function to handle incoming POST requests
export async function POST(request) 
{
    console.log("Request method(makeAppointment):", request.method);

    // Establishing a connection to the database
    await connect();

    if (request.method === 'POST') 
    {
      try  
      {
        // Parsing the request body
        const requestBody = await request.json();
        const { token, barberId, appointmentDate, appointmentHour, appointmentHaircutType } = requestBody;

        // Decode the token to get the barber's email
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const clientId = decodedToken.email;
        console.log("clientId: ", clientId);

        // Check if the appointment already exists in the database
        const appointmentExists = await appointmentExistsInDatabase(barberId, appointmentDate, appointmentHour);

        if (appointmentExists) 
        { 
          console.log('Appointment already exists in the database');
          return NextResponse.json({ error: 'Appointment already exists in the database' }, { status: 400 });
        }

        const newAppointment = new Appointment(
        {
          clientId,
          barberId,
          appointmentDate,
          appointmentHour,
          appointmentHaircutType,
        });

        // Save the new appointment to the database
        const savedAppointment = await newAppointment.save();

        console.log('Appointment created:', savedAppointment);
        return NextResponse.json(savedAppointment, { status: 201 });
      } 
       
      catch (error) 
      {
        console.log("Failed to save appointement to DB due to: " + error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      console.log("Not a POST request");
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
}


// Function to check if the appointment already exists in the database
async function appointmentExistsInDatabase(barberId, appointmentDate, appointmentHour) 
{
  const existingAppointment = await Appointment.findOne(
    {
      barberId,
      appointmentDate,
      appointmentHour,
  });

  // Return true if the appointment already exists in the database
  return existingAppointment !== null;
}