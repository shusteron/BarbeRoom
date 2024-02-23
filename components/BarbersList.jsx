"use client" // turn it from server component to client component


// import '@styles/globals.css'
import "../styles/globals.css"
import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";


// BarbersList component
const BarbersList = ({ onSelectBarber, resetSelection }) => {

  // useState hook to store the list of barbers
  const [barbers, setBarbers] = useState([]); // list of barbers - initially an empty list

  // Function to handle the selection of a barber
  const handleBarberChoose = (barberId) => {

    // Resetting selection of the day, hour and haircut type when a new barber is chosen
    resetSelection();

    console.log("handleBarberChoose was called with email: " + barberId);

    // Calling the onSelectBarber function with the selected barber's id
    onSelectBarber(barberId);
  };
 
  // useEffect hook to fetch the list of barbers from the server
  useEffect(() => {

    console.log("getting barbers");

    // Fetching the list of barbers from the server
    try 
    {
      fetch("/api/makeAppointment")
      .then( (response) => response.json() )
      .then( (data) => setBarbers(data));
    } 

    catch (error) 
    {
      console.error("Could not fetch list of barbers", error);

      // Displaying an error toast to the user
      toast.error("שגיאה בהצגת רשימת הספרים");
    }

  }, []); // the useEffect hook will run only once when the component is mounted

  // If the list of barbers is still being fetched or no barbers are available
  if (barbers.length === 0)
  {
    // Display a message to the user
    return <div className="white-text">רשימת ספרים לא זמינה</div>;
  }

  return ( 
    <div>
      <h1 className="center white-text">בחר\י ספר\ספרית</h1>
      <div className="center">
      <select id="barberSelector" name="barberSelector" onChange={(event) => handleBarberChoose(event.target.value)}>
        <option value="">בחר\י ספר\ספרית</option>
        {barbers.map(barber => (
          <option key={barber.id} value={barber.email} >{barber.name} {barber.lastName}</option>
        ))}
      </select>
      </div>
    </div> 
  )
}

export default BarbersList