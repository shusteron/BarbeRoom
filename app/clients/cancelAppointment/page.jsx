"use client"


import Link from "next/link"
// import '@styles/globals.css'
import "../../../styles/globals.css"
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const CancelAppointmentPage = () => {

    // useState to store the appointment ID
    const [appointmentId, setAppointmentId] = useState('');

    // Function to handle canceling an appointment
    const cancelAppointment = async () => {

        try 
        {
            // Get the token from cookies
            const token = Cookies.get('token');

            // Check if the appointment ID is provided
            if (!appointmentId) 
            {
                toast.error('Please provide appointment ID');
                return;
            }

            // Data object containing token and appointment ID
            const data = { token, appointmentId };

            // Send a DELETE request to cancel the appointment
            const response = await axios.delete('/../api/cancelAppointment', { data });

            // Display success message if the appointment is cancelled
            toast.success('Appointment cancelled successfully');
            console.log(response.data); // Log the response data if needed

        } 
        
        catch (error) 
        {
            // Display error message if cancellation fails
            toast.error('Failed to cancel appointment');
            console.error(error); // Log the error for debugging
        }
    };

    return (
        <div>
            <h1>Cancel Appointment</h1>
            <input
                type="text"
                placeholder="Enter Appointment ID"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
            />
            <button onClick={cancelAppointment}>Cancel Appointment</button>
        </div>
    );
};

export default CancelAppointmentPage;