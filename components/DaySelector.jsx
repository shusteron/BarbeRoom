"use client" // turn it from server component to client component


import { useState, useEffect } from "react"; 
import { toast } from "react-hot-toast";
import  Cookies  from "js-cookie" ;
import axios from "axios"; 
import "../styles/globals.css"


// DaySelector component
const DaySelector = ({ barberId, onSelectDay, onSelectShiftType }) => {

    // useState hook to store the list of days
    const [days, setDays] = useState([]); // list of days - initially an empty list
    
    // Function to handle the selection of a day 
    const handleDayChoose = (selectedDay, isMorning) => {

      console.log("Selected day:", selectedDay);
      console.log("isMorning:", isMorning);

      // Calling the onSelectDay function with the selected day
      onSelectDay(selectedDay);
      
      // If the selected shift is a morning shift, call the onSelectShiftType function with true, otherwise call it with false
      onSelectShiftType(isMorning);
    };  
    
    // useEffect hook to fetch the list of days from the server
    useEffect(() => {

      async function fetchDays() {
 
      console.log("getting shifts");
 
      try 
      {
        // fetch(`/api/workSchedule?barberId=${barberId}`) // fetch the barber's shifts by passing the barber's id as a query parameter
        // .then( (response) => response.json() )
        // .then( (data) => data.sort((first, second) => new Date(first.shiftDay) - new Date(second.shiftDay)) )
        // .then( (sortedDays) => setDays(sortedDays)); 

        
        const response = await axios.post("/api/workSchedule", { barberId });   

        // Sorting the days by date in ascending order
        const sortedDays = response.data.sort((first, second) => new Date(first.shiftDay) - new Date(second.shiftDay));
        setDays(sortedDays);     
      } 
    
      catch (error) 
      { 
        // Displaying an error toast to the user
        console.error("Could not fetch barber's shifts", error);
        toast.error("שגיאה בהצגת ימי העבודה");
      }
    }

    // Call the fetchDays function
    fetchDays();
        
    }, [barberId]); // the useEffect hook will re-run whenever the barberEmail changes

    return (
        <div>
        {days.length > 0 ? (
          <>  
            <h1 className="center white-text">בחר\י יום</h1>
            <div className="center">
            {days.length > 0 &&  
            (<select id="daySelector" name="daySelector" onChange={(event) => handleDayChoose(event.target.value,
            days.find(day => day.shiftDay === event.target.value).morningShift)}>
              <option value="">בחר\י יום</option>
              {days.filter(day => {
                    const shiftDate = new Date(day.shiftDay);
                    const shiftDay = shiftDate.getDay();
                    const shiftMonth = shiftDate.getMonth();
                    const shiftYear = shiftDate.getFullYear();

                    const currentDate = new Date();
                    const currentDay = currentDate.getDay();
                    const currentMonth = currentDate.getMonth();
                    const currentYear = currentDate.getFullYear();

                    return (shiftDay === currentDay && shiftMonth === currentMonth && shiftYear === currentYear) || (shiftDate > currentDate);
                  }).map(day => (
                <option key={day._id} value={day.shiftDay}>{new Date(day.shiftDay).toLocaleDateString(
                  "he-IL",
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "UTC"
                  }
                )} {day.morningShift ? "משמרת בוקר" : "משמרת ערב"}</option>
              ))}
            </select>
            )}
            </div>
          </>
        ) : (
          <div className="center white-text">אין משמרות זמינות לבחירה</div>
        )
        }  
        </div>
      );
}
 
export default DaySelector