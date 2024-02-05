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
        // Extracting barberMail from request 
        // const requestBody = await request.json();
        // urlParams = request.nextUrl.searchParams;
        // stringParams = urlParam.toString();
        // const splitedUrl = stringParams.split("=");
        // const barberEmail = splitedUrl[1];

        const barberEmail = request.nextUrl.searchParams.toString().split("=")[1];
        let decodedBarberEmail = decodeURIComponent(barberEmail);
        console.log("decodeURI: " + decodedBarberEmail);

        // Finding all barbers from the database
        const barberShifts = await Shift.find({ barberMail: decodedBarberEmail });

        // contain an array of unique shift days values extracted from the barberShifts array, without any duplicates
        // const uniqueDays = [...new Set(barberShifts.map(shift => shift.shiftDay))];

        // Sending a successful response with the list of barbers
        // return NextResponse.json(uniqueDays.map(day => day.toISOString()));
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