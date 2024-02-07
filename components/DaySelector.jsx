"use client" // turn it from server component to client component


import { useState, useEffect } from "react"; 
import { toast } from "react-hot-toast";
import "../styles/globals.css"


// DaySelector component
const DaySelector = ({ barberId, onSelectDay }) => {

    // useState hook to store the list of days
    const [days, setDays] = useState([]); // list of days - initially an empty list
    
    // Function to handle the selection of a day
    const handleDayChoose = (selectedDay) => {
      console.log("Selected day:", selectedDay);

      // Calling the onSelectDay function with the selected day
      onSelectDay(selectedDay);
    };  
    
    // useEffect hook to fetch the list of days from the server
    useEffect(() => {
 
      console.log("getting shifts");

      // Fetching the list of days from the server for the selected barber
      try 
      {
        fetch(`/api/workSchedule?barberId=${barberId}`) // fetch the barber's shifts by passing the barber's id as a query parameter
        .then( (response) => response.json() )
        .then( (data) => setDays(data));
      } 
    
      catch (error) 
      { 
        // Logging the error message
        console.error("Could not fetch barber's shifts", error);

        // Displaying an error toast to the user
        toast.error("שגיאה בהצגת ימי העבודה");
      }
        
    }, [barberId]); // the useEffect hook will re-run whenever the barberEmail changes

    if (days.length === 0)
    {
      // in case there are no shifts available for the selected barber - display a message to the user
      return <div className="center">אין משמרות קיימות</div>;
    }
 
    return (
        <div>
        <h1 className="center">בחר\י יום</h1>
        <div className="center">
        {days.length > 0 &&  
        (<select id="daySelector" name="daySelector" onChange={(event) => handleDayChoose(event.target.value)}>
          <option value="">בחר\י יום</option>
          {days.filter(day => {
                const shiftDate = new Date(day.shiftDay);
                const currentDate = new Date();
                return shiftDate.getDate() >= currentDate.getDate();
              }).map(day => (
            <option key={day._id} value={day.shiftDay}>{day.shiftDay} {day.morningShift ? "Morning Shift" : "Evening Shift"}</option>
          ))}
        </select>
        )}
        </div>
        </div>
      );
}
 
export default DaySelector