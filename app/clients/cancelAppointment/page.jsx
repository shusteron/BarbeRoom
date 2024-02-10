"use client"


import Link from "next/link"
// import '@styles/globals.css'
import "../../../styles/globals.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';


const CancelAppointmentPage = () => {

    // State to store the list of appointments
    const [appointmentsList, setAppointmentsList] = useState([]); // list of appointments - initially an empty list

    // State to store the selected appointmentID
    const [appointmentID, setAppointmentID] = useState(null); // selected appointmentID - initially null

    // Function to handle choosing an appointment
    const handleAppointmentChoose = (appointmentId) => 
    { 
      // Log the appointment data
      console.log("handleAppointmentChoose was called with appointmentId: " + appointmentId);

      // Set the selected appointment
      setAppointmentID(appointmentId);
    };

    useEffect(() => {

      console.log("getting appointments");
  
        // Fetching the list of appointments from the server
        try 
        {
          // Get the token from the cookies
          const token = Cookies.get("token");
          
          // Fetch the list of appointments for this clientEmail from the server
          fetch(`/api/cancelAppointment?clientToken=${token}`) // fetch the list of appointments by passing the token as a query parameter
          .then( (response) => response.json() )
          .then( (data) => setAppointmentsList(data));
          

          console.log("appointmentsList: ", appointmentsList);
        } 
  
        catch (error) 
        {
          // Logging the error message
          console.error("Could not fetch list of appointments", error);
  
          // Displaying an error toast to the user
          toast.error("שגיאה בהצגת רשימת התורים");
        }
  
    }, []); // the useEffect hook will run only once when the component is mounted


    // Function to handle canceling an appointment
    const cancelAppointment = async () => {

      try 
      {
          // data to send to the server containing the appointment ID
          const clientData = { appointmentID };

          // Send a DELETE request to cancel the appointment
          const response = await axios.delete('/api/cancelAppointment', { clientData });

          // Log the response from the server
          console.log(response.data);

          // Display success message if the appointment is cancelled
          toast.success('התור בוטל בהצלחה');
      } 
        
      catch (error) 
      {
          // Log the error message
          console.error(error); 

          // Display error message if cancellation fails
          toast.error('התור לא נמחק, אנא נסה שוב');
      }
    };

    return (
        <div>

            <h1 className="center">תורים לביטול</h1>

            {<div className="center">
            <select id="appointmentSelector" name="appointmentSelector" onChange={(event) => handleAppointmentChoose(event.target.value)}>
            <option value="">בחר\י תור לביטול</option>
            {appointmentsList.map(appointment => (
            <option key={appointment._id} value={appointment._id} >{appointment.barberId} {appointment.appointmentDate} 
            {appointment.appointmentHour} {appointment.appointmentHaircutType} </option>
            ))}
            </select> 
            </div> 
            
            && (<button onClick={cancelAppointment}>בטל\י תור</button>)}

        </div>
    );
};

export default CancelAppointmentPage;