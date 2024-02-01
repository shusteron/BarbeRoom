"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react"; 



const DaySelector = ({ barberId, onSelectDay } ) => {

    const [days, setDays] = useState([]); // list of days - initially an empty list

    useEffect(() => {

        // Fetch days for the selected barber
        const fetchedDays = ['Monday', 'Tuesday', 'Wednesday'];
        setDays(fetchedDays);
    }, []);

    return (
        <div>
          <h2>בחר\י יום</h2>
          <ul>
            {days.map(day => (
              <li key={day} onClick={() => onSelectDay(day)}>
                {day}
              </li>
            ))}
          </ul>
        </div>
      );
}
 
export default DaySelector