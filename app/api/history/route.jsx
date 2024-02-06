import {connect} from "../../../dbConfig/dbConfig";
import Appointment from "../../../models/appointmentsModel";
import Barbers from "../../../models/barberModel";
import { NextRequest, NextResponse } from "next/server";


// Handler function to handle incoming HTTP requests
export async function GET(request) 
{   
    console.log("Request method:", request.method);

    // Establishing a connection to the database 
    await connect(); 

    if (request.method === 'GET') 
    {
      try  
      {
        const clientEmail = request.nextUrl.searchParams.toString().split("=")[1];
        let decodedClientEmail = decodeURIComponent(clientEmail);
        console.log("decodeURI: " + decodedClientEmail);

        // Finding all barbers from the database
        const ClientAppointment = await Appointment.find({ clientId: decodedClientEmail });

        
        console.log("ClientAppointment: ",ClientAppointment)
        // Sending a successful response with the list of barbers
        return NextResponse.json(ClientAppointment);
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