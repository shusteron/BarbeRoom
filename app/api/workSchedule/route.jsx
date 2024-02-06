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
        

        const barberEmail = request.nextUrl.searchParams.toString().split("=")[1];
        let decodedBarberEmail = decodeURIComponent(barberEmail);
        console.log("decodeURI: " + decodedBarberEmail);

        // Finding all barbers from the database
        const barberShifts = await Shift.find({ barberMail: decodedBarberEmail });

        

        // Sending a successful response with the list of barbers
        return NextResponse.json(barberShifts);
        // return NextResponse.json(uniqueDays);
      } 
       
      catch (error) 
      {
        console.log("Error: " + error);
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      // Handling other HTTP methods which are not relatable(POST, PUT, DELETE..)  
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
  } 