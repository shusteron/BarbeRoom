"use client" // turn it from server component to client component


import { useState, useEffect } from "react";  


// HaircutTypeSelector component
const HaircutTypeSelector = ({ onSelectHaircutType }) => {

    // useState hook to store the list of haircut types
    const [haircutType, setHaircutType] = useState([]);

    // Function to handle the selection of a haircut type
    const handlehaircutTypeChoose = (selectedHaircutType) => {

      // Logging the selected haircut type
      console.log("Selected Haircut Type:", selectedHaircutType);

      // Calling the onSelectHaircutType function with the selected haircut type
      onSelectHaircutType(selectedHaircutType);
    };
    
    // useEffect hook to fetch the list of haircut types from the server
    useEffect(() => { 

      try 
      {
        // Fetching the list of haircut types from the server
        const haircutTypeOptions = ['תספורת גברים', 'תספורת נשים', 'פן', 'צבע', 'החלקה'];

        // Logging the list of haircut types
        setHaircutType(haircutTypeOptions);
      } 
    
      catch (error) 
      {
        // Logging the error message
        console.log("Could not display barber's haircut Types", error);
        
        // Displaying an error toast to the user
        toast.error("שגיאה בהצגת סוגי התספורות");
      }

    }, []); 

    return (
      <div>
        <h1 className="center white-text">בחר\י סוג תספורת</h1>
        <div className="center">
        <select id="haircutTypeSelector" name="haircutTypeSelector" onChange={(event) => handlehaircutTypeChoose(event.target.value)}>
          <option value="">בחר\י סוג תספורת</option>
          {haircutType.map(type => (
          <option key={type} value={type} >{type}</option>
        ))}
        </select>
        </div>
      </div> 
    );  
}

export default HaircutTypeSelector 