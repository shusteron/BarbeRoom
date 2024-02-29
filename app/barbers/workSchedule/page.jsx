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
        // Ensure data is an array before sorting and setting it in state
        if (Array.isArray(data)) {
          // Sort shifts by shiftDay in ascending order
          const sortedShifts = data.sort((a, b) => new Date(a.shiftDay) - new Date(b.shiftDay));
          setShifts(sortedShifts);
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
    <div className="center white-text">
  {shifts.length > 0 ? (
    <table className="shift-table">
      <thead>
        <tr>
          <th>שם ספר/ית</th>
          <th>תאריך</th>
          <th>משמרת בוקר</th>
          <th>משמרת ערב</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <tr key={shift._id}>
            <td>{shift.barberMail.split('@')[0]}</td>
            <td>{new Date(shift.shiftDay).toLocaleDateString(
                  "he-IL",
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "UTC"
                  }
                )}</td>
            <td>{shift.morningShift ? 'כן' : 'לא'}</td>
            <td>{shift.eveningShift ? 'כן' : 'לא'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>אין משמרות זמינות</p>
  )}
</div>


    
  </>
  );
};

export default WorkSchedulePage;
