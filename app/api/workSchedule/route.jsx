import {connect} from "../../../dbConfig/dbConfig";
import Shift from "../../../models/shiftModel";
import Barbers from "../../../models/barberModel";
import { NextRequest, NextResponse } from "next/server";


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
        // Extracting the barber's email from the query parameters
        const barberEmail = request.nextUrl.searchParams.toString().split("=")[1];

        // Decoding the barber's email
        let decodedBarberEmail = decodeURIComponent(barberEmail);

        // Finding all barbers from the database
        const barberShifts = await Shift.find({ barberMail: decodedBarberEmail });

        console.log('Barber shifts:', barberShifts);

        // Sending a successful response with the list of barbers
        return NextResponse.json(barberShifts);
      } 
       
      catch (error) 
      {
        console.error("Failed to fetch shifts from DB due to: " + error);

        // Sending an error response
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      console.error("Not a GET request");
      
      // Handling other HTTP methods which are not relatable
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
  } 