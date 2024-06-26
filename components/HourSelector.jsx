"use client" // turn it from server component to client component


import { useState, useEffect } from "react";  


// HourSelector component
const HourSelector = ({ barberId, selectedDay, selectedShiftType, onSelectHour }) => {

    // useState hook to store the list of hours
    const [hours, setHours] = useState([]);

    // Function to handle the selection of a hour
    const handleHourChoose = (selectedHour) => {

      console.log("Selected hour:", selectedHour);

      // Calling the onSelectHour function with the selected hour
      onSelectHour(selectedHour);
    }; 

    // useEffect hook to fetch the list of hours from the server
    useEffect(() => {
      
      console.log("getting hours");

      try
      { 
        // If the selected shift type is true, then the morning shift is selected
        if(selectedShiftType === true)
        {
          // Morning shift hours
          const morningHours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];

          // Setting the hours state
          setHours(morningHours);
        }

        // If the selected shift type is false, then the evening shift is selected
        else
        {
          // Evening shift hours
          const eveningHours = ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

          // Setting the hours state
          setHours(eveningHours);
        }
      }

      catch (error) 
      { 
        // Display an error toast to the user
        console.error("Could not display barber's hours", error);
        toast.error("שגיאה בהצגת שעות העבודה");
      }

    }, [barberId, selectedDay]); // the useEffect hook will re-run whenever the barberEmail or selectedDay changes

    return (
      <div>
      {hours.length > 0 ? (
        <>  
          <h1 className="center white-text">בחר\י שעה</h1>
          <div className="center">
          <select id="hourSelector" name="hourSelector" onChange={(event) => handleHourChoose(event.target.value)}>
            <option value="">בחר\י שעה</option>
            {hours.filter(hour => {
                const currentTime = new Date();
                const currentYear = currentTime.getFullYear();
                const currentMonth = currentTime.getMonth();
                const currentDay = currentTime.getDate();

                const convertSelectedDay = new Date(selectedDay);

                // If the selected day is the current day, then we need to filter the hours according to the current time
                if(currentYear === convertSelectedDay.getFullYear() && currentMonth === convertSelectedDay.getMonth() && currentDay === convertSelectedDay.getDate())
                { 
                  const [hourStr, minuteStr] = hour.split(':');
                  const hourInt = parseInt(hourStr);
                  const minuteInt = parseInt(minuteStr);
                
                  return currentTime.getHours() < hourInt || (currentTime.getHours() === hourInt && currentTime.getMinutes() < minuteInt);
                }

                return true;
              }).map(hour => (
            <option key={hour} value={hour} >{hour}</option>
          ))}
          </select>
          </div>
        </>
      ) : (
        <div className="center white-text">אין שעות זמינות לבחירה</div>
      )
      }  
      </div>
    ); 
}

export default HourSelector 