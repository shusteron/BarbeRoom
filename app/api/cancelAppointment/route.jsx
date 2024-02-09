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
            const { token, appointmentId } = requestBody;

            // Decode the token to get the client's email
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const clientId = decodedToken.email;
            console.log("clientId: ", clientId);

            // Find the appointment in the database
            const appointment = await Appointment.findOneAndDelete({
                _id: appointmentId,
                clientId: clientId // Ensure the appointment belongs to the client
            });

            if (!appointment) 
            {
                // Sending an error response if the appointment does not exist or doesn't belong to the client
                console.log('Appointment not found or unauthorized');
                return NextResponse.json({ error: 'Appointment not found or unauthorized' }, { status: 404 });
            }

            // Sending a successful response with the deleted appointment
            console.log('Appointment cancelled:', appointment);
            return NextResponse.json(appointment, { status: 200 });

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