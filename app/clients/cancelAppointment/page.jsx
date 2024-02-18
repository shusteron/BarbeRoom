"use client"


import "../../../styles/globals.css" 
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from "react-hot-toast";
 

const CancelAppointmentsPage = () => {

  // State to store the list of appointments
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments from the server
  const fetchAppointments = async () => {

    // Fetch the list of appointments from the server
    try 
    { 
      // Get the token from the cookies
      const token = Cookies.get("token");

      // Fetch the list of appointments for this clientEmail from the server
      const response = await axios.get("/../api/cancelAppointment", { headers: { Authorization: `Bearer ${token}`} });

      // Set the list of appointments in the state variable
      setAppointments(response.data);
    } 
    
    catch (error) 
    {
      // Log the error message
      console.error("Error fetching appointments:", error);

      // Display an error toast to the user
      toast.error("שגיאה בהצגת רשימת התורים");
    }
  };


  // UseEffect hook to fetch the list of appointments
  useEffect(() => {

    // call the fetchAppointments function
    fetchAppointments();

  }, []);

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {

  // Send a DELETE request to the server to cancel the appointment  
  try 
  { 
    // Get the token from the cookies
    const token = Cookies.get("token");

    // Send a DELETE request to the server with the selected appointment ID
    await axios.delete("/../api/cancelAppointment", { headers: {Authorization: `Bearer ${token}`}, data: { appointmentId } });

    // Display a success toast to the user
    toast.success("התור בוטל בהצלחה");

    // Refresh the list of appointments so that the cancelled appointment is removed from the list
    fetchAppointments();
  } 
  
  catch (error) 
  { 
    // Log the error message
    console.error("Error canceling appointment:", error);

    // Display an error toast to the user
    toast.error("שגיאה בביטול התור, אנא נסה שוב");
  }
  
};

return (
  <div>
    <h1 className="center white-text">תורים לביטול</h1>
      <div className="center white-text">
        <ul>
          {appointments.map(appointment => (
            <li key={appointment._id}> <div>{new Date(appointment.appointmentDate).toLocaleDateString(
              "he-IL",
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }
            )} - {appointment.appointmentHour} - {appointment.barberId}</div>
              <button onClick={() => cancelAppointment(appointment._id)}>בטל תור</button>
            </li>
          ))}
        </ul>
      </div>
  </div>
);

};

export default CancelAppointmentsPage;