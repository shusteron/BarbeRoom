import {connect} from "../../../dbConfig/dbConfig";
import Shift from "../../../models/shiftModel";
import { NextRequest, NextResponse } from "next/server";
// Establishing a connection to the database
connect();

// Handler function to handle incoming HTTP requests
export async function POST(request) 
{   
      try  
      {
        // Finding all barbers from the database
        const barberShifts = await Shift.find();

        // Sending a successful response with the list of barbers
        return NextResponse.json(barberShifts);
      } 
       
      catch (error) 
      {
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    