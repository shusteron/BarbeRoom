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
        setShifts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <table>
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
              <td>{shift.barberMail.name}</td>
              <td>{shift.barberMail.lastName}</td>
              <td>{new Date(shift.shiftDay).toDateString()}</td>
              <td>{shift.morningShift ? 'Yes' : 'No'}</td>
              <td>{shift.eveningShift ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  </>
  );
};

export default WorkSchedulePage;
