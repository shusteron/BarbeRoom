import { connect } from "../../../dbConfig/dbConfig";
import Appointment from "../../../models/appointmentsModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


// Handler function to handle incoming DELETE requests
export async function DELETE(request) 
{
    console.log("Request method(cancelAppointment):", request.method);

    // Establishing a connection to the database
    await connect();

    if (request.method === 'DELETE') 
    {
        try 
        {
            // Parsing the request body
            const requestBody = await request.json();
            const { appointmentID } = requestBody;

            // Find the appointment in the database
            const deletedAppointment = await Appointment.findOneAndDelete({ _id: appointmentID });

            if (!deletedAppointment) 
            {
                // Sending an error response if no appointments is found for the client
                console.log('No appointment found for this client with this ID');
                return NextResponse.json({ error: 'No appointment found for this client with this ID' }, { status: 404 });
            }

            // Sending a successful response with the deleted appointment
            console.log('Appointment cancelled:', deletedAppointment);
            return NextResponse.json(deletedAppointment, { status: 200 });
        } 
        
        catch (error) 
        {
            // sending an error response if the appointment could not be cancelled
            console.log("Failed to cancel appointment due to: " + error);
            return NextResponse.json({ error: 'Internal Server Error' });
        }
    } 
    
    else 
    {
        // Handling other HTTP methods which are not relatable
        return NextResponse.json({ error: 'Method Not Allowed' });
    }
} 
 
// Handler function to handle incoming GET requests
export async function GET(request) 
{   
    console.log("Request method(cancelAppointment):", request.method);

    // Establishing a connection to the database
    await connect(); 

    if (request.method === 'GET')  
    {
      try  
      {
        
        // Extracting the client's email from the query parameters
        const clientToken = request.nextUrl.searchParams.toString().split("=")[1];

        // Decoding the client's email
        let decodedClientToken = decodeURIComponent(clientToken);

        // Decode the token to get the client's email
        const decodedToken = jwt.verify(decodedClientToken, process.env.TOKEN_SECRET);
        const clientEmail = decodedToken.email;
        console.log("clientEmail: ", clientEmail);

        // Fetching the list of appointments for this client from the database
        const appointments = await Appointment.find({ clientId: clientEmail });

        // logging the list of appointments
        console.log('appointments:', appointments);

        // Sending the list of appointments as a response
        return NextResponse.json(appointments);
      } 
       
      catch (error) 
      {
        // Logging the error message
        console.log("Failed to fetch appointments from DB due to: " + error);

        // Sending an error response
        return NextResponse.json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      // Logging the error message
      console.log("Not a GET request");

      // Handling other HTTP methods which are not relatable  
      return NextResponse.json({ error: 'Method Not Allowed' });
    }
} 