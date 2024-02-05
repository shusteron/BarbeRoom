"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";  



const HaircutTypeSelector = ({ onSelectHaircutType }) => {

    const [haircutType, setHaircutType] = useState([]);

    const handlehaircutTypeChoose = (selectedHaircutType) => {
      console.log("Selected Haircut Type:", selectedHaircutType);
      onSelectHaircutType(selectedHaircutType);
    };

    useEffect(() => {

      try 
      {
        const haircutTypeOptions = ['תספורת גברים', 'תספורת נשים', 'פן', 'צבע', 'החלקה'];

        setHaircutType(haircutTypeOptions);
      } 
    
      catch (error) 
      {
        console.error("Could not display barber's haircut Types", error);
      }

    }, []);

    return (
      // <div>
      //   <h1>בחר\י סוג תספורת</h1>
      //   <select value={haircutType} onChange={handleHaircutTypeChange}>
      //     <option value="">Select</option>
      //     <option value="Regular">Regular</option>
      //     <option value="Fade">Fade</option>
      //     <option value="Buzzcut">Buzzcut</option>
      //   </select>
      //   <button onClick={() => onSelectHaircutType(haircutType)}>Select</button>
      // </div>

      <div>
        <h1 className="center">בחר\י סוג תספורת</h1>
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