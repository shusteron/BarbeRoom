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

        // Storing the data and sorting it in reverse order by date
        const data = response.data;
        const sortedAppointments = data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

        // Ensure data is an array before setting it in state
        if (Array.isArray(sortedAppointments)) {
          setAppointments(sortedAppointments);
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
      {/* Creating and initializing the history table */}
      <h1 className='center white-text'>הסטורית תורים</h1>
      <div className="center">
        {appointments.length > 0 ? (
          <table className="shift-table white-text">
            <thead>
              <tr>
                <th>שם ספר/ית</th>
                <th>תאריך</th>
                <th>שעה</th>
                <th>סוג תספורת</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} >
                  <td>{appointment.barberId.split('@')[0]}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleDateString(
              "he-IL",
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                timeZone: "UTC"
              }
            )}</td>
                  <td>{appointment.appointmentHour}</td>
                  <td>{appointment.appointmentHaircutType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>אין היסטוריית תורים</p>
        )}
      </div>
    </>
  );
};

export default HistoryPage;
