import {connect} from "../../../dbConfig/dbConfig"
import Barbers from "../../../models/barberModel"
import Appointment from "../../../models/appointmentsModel" 
import { NextRequest, NextResponse } from "next/server";
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
        // Finding all barbers from the database
        const barbers = await Barbers.find({});

        // Sending a successful response with the list of barbers
        return NextResponse.json(barbers);
      } 
       
      catch (error) 
      {
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      // Handling other HTTP methods which are not relatable  
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
        const requestBody = await request.json();
        const { token, barberId, appointmentDate, appointmentHour, appointmentHaircutType } = requestBody;

        // Decode the token to get the barber's email
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const clientId = decodedToken.email;

        // Check if the appointment already exists in the database
        const appointmentExists = await appointmentExistsInDatabase(clientId, barberId, appointmentDate, appointmentHour);

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

        // create new Appointment object asynchroniously and save it to the atlas mongo db
        const savedAppointment = await newAppointment.save();

        // Sending a successful response with the saved appointment
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
      // Handling other HTTP methods which are not relatable
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
}


// Function to check if the appointment already exists in the database
async function appointmentExistsInDatabase(clientId, barberId, appointmentDate, appointmentHour) 
{
  // Find the appointment in the database
  const existingAppointment = await Appointment.findOne(
    {
      barberId,
      appointmentDate,
      appointmentHour,
  });

  // Return true if the appointment already exists in the database
  return existingAppointment !== null;
}