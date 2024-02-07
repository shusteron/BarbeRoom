"use client"
import Image from 'next/image'
import Background from '../../../public/images/Background.jpg'
import { useEffect, useState } from 'react';
import axios from "axios"; 
import  Cookies  from "js-cookie" ;


const HistoryPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get the token from wherever it is stored
        const token = Cookies.get("token");

        // Sending the token
        const response = await axios.post("/api/history", { token }); // Pass the token in the request body
        
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        // Storing the data.
        const data = response.data;
        console.log("data: ",data);

        // Ensure data is an array before setting it in state
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          throw new Error('Data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error: set appointments to an empty array or handle it according to your application logic
        setAppointments([]);
      }
    }
    fetchData();
  }, []);

  return (

    <>
      {/* Creating and inizialing the history table */}
      <h1 className='center'>הסטורית תורים</h1>
      <div className="center">
        {appointments.length > 0 ? (
          <table className="shift-table">
            <thead>
              <tr>
                <th>Barber Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Haircut Style</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} >
                  <td>{appointment.barberId.split('@')[0]}</td>
                  <td>{new Date(appointment.appointmentDate).toDateString()}</td>
                  <td>{appointment.appointmentHour}</td>
                  <td>{appointment.appointmentHaircutType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointment available</p>
        )}
      </div>
    </>
  );
};

export default HistoryPage;