"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";  



const HaircutTypeSelector = ({ onSelectHaircutType }) => {
    const [haircutType, setHaircutType] = useState('');

    const handleHaircutTypeChange = (event) => {
      setHaircutType(event.target.value);
    };
  
    return (
      <div>
        <h2>Select Haircut Type:</h2>
        <select value={haircutType} onChange={handleHaircutTypeChange}>
          <option value="">Select</option>
          <option value="Regular">Regular</option>
          <option value="Fade">Fade</option>
          <option value="Buzzcut">Buzzcut</option>
        </select>
        <button onClick={() => onSelectHaircutType(haircutType)}>Select</button>
      </div>
    );  
}

export default HaircutTypeSelector