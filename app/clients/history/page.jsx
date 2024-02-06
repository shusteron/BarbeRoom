"use client"
import Image from 'next/image'
import Background from '../../../public/images/Background.jpg'
import { useEffect, useState } from 'react';
import axios from "axios"; 


const historypage = () => {
  const [appointments, setAppointments] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/api/history');
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data = response.data;
        console.log(data)
         // Ensure data is an array before setting it in state
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        throw new Error('Data is not in the expected format');
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error: set shifts to an empty array or handle it according to your application logic
        setAppointments([]);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <h1 className='center'>הסטורית תורים</h1>
    <div className="center">
  {appointments.length > 0 ? (
    <table className="appointment-table">
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
          <tr key={appointment._id}>
            <td>{appointment.barberMail.split('@')[0]}</td>
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

export default historypage;
