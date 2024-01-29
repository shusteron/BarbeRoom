// import {connect} from "../../../dbConfig/dbConfig"

import dbConnect from "../../../dbConfig/dbConnect";

import Barbers from "../../../models/barberModel"


// Handler function to handle incoming HTTP requests
export default async function handler(request, response) {
    console.log("Request method:", request.method);
    // Establishing a connection to the database
    await dbConnect();

    if (request.method === 'GET') 
    {
      try 
      {
        // Finding all barbers from the database
        const barbers = await Barbers.find({});

        // Sending a successful response with the list of barbers
        response.status(200).json(barbers);
      } 
       
      catch (error) 
      {
        response.status(500).json({ error: 'Internal Server Error' });
      }
    } 
    
    else 
    {
      // Handling other HTTP methods which are not relatable(POST, PUT, DELETE)  
      response.status(405).json({ error: 'Method Not Allowed' });
    }
  }