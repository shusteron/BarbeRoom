"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";  



const HourSelector = ({ barberId, selectedDay, onSelectHour }) => {

    const [hours, setHours] = useState([]);

    useEffect(() => {
      // Fetch available hours for the selected barber and day from API or local data
      // Example:
      const fetchedHours = ['9:00 AM', '10:00 AM', '11:00 AM'];
      setHours(fetchedHours);
    }, [barberId, selectedDay]);
  
    return (
      <div>
        <h2>Select an Hour:</h2>
        <ul>
          {hours.map(hour => (
            <li key={hour} onClick={() => onSelectHour(hour)}>
              {hour}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default HourSelector