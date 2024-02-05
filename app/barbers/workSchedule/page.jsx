"use client"
import Image from 'next/image'
import Background from '../../../public/images/Background.jpg'
import { useEffect, useState } from 'react';
import axios from "axios"; 


const WorkSchedulePage = () => {
  const [shifts, setShifts] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/api/barberShifts');
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data = response.data;
         // Ensure data is an array before setting it in state
      if (Array.isArray(data)) {
        setShifts(data);
      } else {
        throw new Error('Data is not in the expected format');
      }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error: set shifts to an empty array or handle it according to your application logic
        setShifts([]);
      }
    }
    fetchData();
  }, []);

  return (
    <>
    <div className='absolute -z-10 w-full'>
    <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000} />
  </div>
    <h1 className='center'>workSchedule</h1>
    <div className="center">
  {shifts.length > 0 ? (
    <table className="shift-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Morning Shift</th>
          <th>Evening Shift</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <tr key={shift._id}>
            <td>{shift.barberMail}</td>
            <td>{shift.barberMail}</td>
            <td>{new Date(shift.shiftDay).toDateString()}</td>
            <td>{shift.morningShift ? 'Yes' : 'No'}</td>
            <td>{shift.eveningShift ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No shifts available</p>
  )}
</div>


    
  </>
  );
};

export default WorkSchedulePage;
