import {connect} from "../../../dbConfig/dbConfig";
import Shift from "../../../models/shiftModel";
import { NextResponse } from "next/server";


// Handler function to handle incoming HTTP requests
export async function POST(request) 
{   
    console.log("Request method(workSchedule):", request.method);

    // Establishing a connection to the database 
    await connect(); 

    if (request.method === 'POST') 
    { 
      try  
      {
        // Parsing the request body
        const requestBody = await request.json();
        const barberEmail = requestBody.barberId;

        // Find the shifts for this barber using his email
        const barberShifts = await Shift.find({ barberMail: barberEmail });

        console.log('Barber shifts:', barberShifts);
        return NextResponse.json(barberShifts);
      } 
       
      catch (error) 
      {
        console.error("Failed to fetch shifts from DB due to: " + error);
        return NextResponse.json({ error: 'Internal Server Error in workSchedule' });
      }
    } 
    
    else 
    {
      console.error("Not a POST request - workSchedule");
      return NextResponse.json({ error: 'Method Not Allowed - workSchedule' });
    }
  } 