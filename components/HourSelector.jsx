"use client" // turn it from server component to client component


import { useState, useEffect } from "react";  


// HourSelector component
const HourSelector = ({ barberId, selectedDay, onSelectHour }) => {

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
        // The barbershop closes at 21:00
        const morningHours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
        const eveningHours = ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

        
        // const isMorningShift = selectedDay.shifrDay; 

        // Set the hours accordingly
        // setHours(isMorningShift ? morningHours : eveningHours);


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
        // Logging the error message
        console.error("Could not display barber's hours", error);

        // Displaying an error toast to the user
        toast.error("שגיאה בהצגת שעות העבודה");
      }

    }, [barberId, selectedDay]); // the useEffect hook will re-run whenever the barberEmail or selectedDay changes
  
    return (
      <div>
        <h1 className="center">בחר\י שעה</h1>
        <div className="center">
        <select id="hourSelector" name="hourSelector" onChange={(event) => handleHourChoose(event.target.value)}>
          <option value="">בחר\י שעה</option>
          {hours.filter(hour => {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinute = currentTime.getMinutes();
            const [hourLeftOptions, minuteLeftOptions] = hour.split(':').map(Number);
            return hourLeftOptions > currentHour || (hourLeftOptions === currentHour && minuteLeftOptions > currentMinute);
          }).map(hour => (
          <option key={hour} value={hour} >{hour}</option>
        ))}
        </select>
        </div>
      </div>
    );
}

export default HourSelector 