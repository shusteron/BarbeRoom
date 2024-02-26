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

        let data = response.data;

        // Ensure data is an array before sorting and setting it in state
        if (Array.isArray(data)) {
          // Sort appointments by appointmentDate in ascending order
          data = data.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
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
      <h1 className='center white-text'>תורים עתידיים</h1>
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
                  <td>{new Date(appointment.appointmentDate).toDateString()}</td>
                  <td>{appointment.appointmentHour}</td>
                  <td>{appointment.appointmentHaircutType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>אין תורים עתידיים</p>
        )}
      </div>
    </>
  );
};

export default FutureAppointmentsPage;
