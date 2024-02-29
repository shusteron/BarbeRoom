import {connect} from "../../../dbConfig/dbConfig";
import Shift from "../../../models/shiftModel";
import { NextResponse } from "next/server";


// Handler function to handle incoming HTTP requests
export async function GET(request) 
{   
    console.log("Request method(workSchedule):", request.method);

    // Establishing a connection to the database 
    await connect(); 

    if (request.method === 'GET') 
    {
      try  
      {
        // Extracting the barber's email from the query parameters and decoding it
        const barberEmail = request.nextUrl.searchParams.toString().split("=")[1];
        let decodedBarberEmail = decodeURIComponent(barberEmail);

        // Find the shifts for this barber using his email
        const barberShifts = await Shift.find({ barberMail: decodedBarberEmail });

        console.log('Barber shifts:', barberShifts);
        return NextResponse.json(barberShifts);
      } 
       
      catch (error) 
      {
        console.error("Failed to fetch shifts from DB due to: " + error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      console.error("Not a GET request");
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
  } 