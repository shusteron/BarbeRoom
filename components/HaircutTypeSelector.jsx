"use client" // turn it from server component to client component


import { useState, useEffect } from "react";  


// HaircutTypeSelector component
const HaircutTypeSelector = ({ onSelectHaircutType }) => {

    const haircutTypeOptions = ['תספורת גברים', 'תספורת נשים', 'פן', 'צבע', 'החלקה'];

    // Function to handle the selection of a haircut type
    const handlehaircutTypeChoose = (selectedHaircutType) => {

      console.log("Selected Haircut Type:", selectedHaircutType);

      // Calling the onSelectHaircutType function with the selected haircut type
      onSelectHaircutType(selectedHaircutType);
    };

    return (
      <div>
        <h1 className="center white-text">בחר\י סוג תספורת</h1>
        <div className="center">
        <select id="haircutTypeSelector" name="haircutTypeSelector" onChange={(event) => handlehaircutTypeChoose(event.target.value)}>
          <option value="">בחר\י סוג תספורת</option>
          {haircutTypeOptions.map(type => (
          <option key={type} value={type} >{type}</option>
        ))}
        </select>
        </div>
      </div> 
    );  
}

export default HaircutTypeSelector 