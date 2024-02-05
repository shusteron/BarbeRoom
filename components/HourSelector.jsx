"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";  



const HourSelector = ({ barberId, selectedDay, onSelectHour }) => {

    const [hours, setHours] = useState([]);

    const handleHourChoose = (selectedHour) => {
      console.log("Selected hour:", selectedHour);
      onSelectHour(selectedHour);
    }; 

    useEffect(() => {
       
      console.log("getting hours");

      try 
      {
        // console.log("barberId1:" + barberId + " selected day:" + selectedDay);

        // The barbershop closes at 21:00
        const morningHours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
        const eveningHours = ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

        // if(morningShift)
        // {
        //   setHours(morningHours);
        // }
        // else
        // {
        //   setHours(eveningHours);
        // }

        setHours(eveningHours);
      } 
    
      catch (error) 
      {
        console.error("Could not display barber's hours", error);
      }

    }, [barberId, selectedDay]);
  
    return (
      <div>
        <h1 className="center">בחר\י שעה</h1>
        <div className="center">
        <select id="hourSelector" name="hourSelector" onChange={(event) => handleHourChoose(event.target.value)}>
          <option value="">בחר\י שעה</option>
          {hours.map(hour => (
          <option key={hour} value={hour} >{hour}</option>
        ))}
        </select>
        </div>
      </div>
    );
}

export default HourSelector 