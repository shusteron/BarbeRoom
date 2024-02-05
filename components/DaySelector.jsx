"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react"; 
import "../styles/globals.css"



const DaySelector = ({ barberId, onSelectDay }) => {

    const [days, setDays] = useState([]); // list of days - initially an empty list
    

    const handleDayChoose = (selectedDay) => {
      console.log("Selected day:", selectedDay);
      onSelectDay(selectedDay);
    };  

    useEffect(() => {

      console.log("getting shifts");

      try 
      {
        console.log("barberId1:", barberId);
        fetch("/api/workSchedule")
        .then( (response) => response.json() )
        .then( (data) => setDays(data));
      } 
    
      catch (error) 
      {
        console.error("Could not fetch barber's shifts", error);
      }
        
    }, [barberId]);

    console.log("days:", days);

    return (
        <div>
        <h1 className="center">בחר\י יום</h1>
        <div className="center">
        {days.length > 0 &&  
        (<select id="daySelector" name="daySelector" onChange={(event) => handleDayChoose(event.target.value)}>
          <option value="">בחר\י יום</option>
          {days.map(day => (
            <option key={day._id} value={day.shiftDay}>{day.shiftDay} {day.morningShift ? "Morning Shift" : "Evening Shift"}</option>
          ))}
        </select>
        )}
        </div>
        </div>
      );
}
 
export default DaySelector