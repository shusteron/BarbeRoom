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

        const newAppointment = new Appointment(
        {
          clientId,
          barberId,
          appointmentDate,
          appointmentHour,
          appointmentHaircutType,
        });

        // console.log(clientId);
        // console.log(barberId);
        // console.log(appointmentDate);
        // console.log(appointmentHour);
        // console.log(appointmentHaircutType);

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
      // Handling other HTTP methods which are not relatable
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
}