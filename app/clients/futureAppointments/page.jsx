// pages/history/future.js

"use client";
import { useEffect, useState } from 'react';
import axios from "axios"; 
import Cookies from "js-cookie";

const FutureAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get("token");
        const response = await axios.post("/api/futureAppointments", { token });

        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        const data = response.data;

        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          throw new Error('Data is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAppointments([]);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className='center'>Future Appointments</h1>
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
          <p>No future appointments available</p>
        )}
      </div>
    </>
  );
};

export default FutureAppointmentsPage;
