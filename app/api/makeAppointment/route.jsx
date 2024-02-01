import {connect} from "../../../dbConfig/dbConfig"
import Barbers from "../../../models/barberModel"
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
      // Handling other HTTP methods which are not relatable(POST, PUT, DELETE..)  
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
  } 