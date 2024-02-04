"use client" // turn it from server component to client component
import Link from "next/link"
// import '@styles/globals.css'
import "../styles/globals.css"
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from "next/server";
import {useRouter} from "next/navigation";


const BarbersList = ({ onSelectBarber }) => {

  const [barbers, setBarbers] = useState([]); // list of barbers - initially an empty list

  const handleBarberChoose = (barberId) => {
    console.log("handleBarberChoose was called with id: " + barberId);
    onSelectBarber(barberId);
  };

  useEffect(() => {
    console.log("getting barbers");
      try 
      {
        fetch("/api/makeAppointment")
        .then( (response) => response.json() )
        .then( (data) => setBarbers(data));
      } 

      catch (error) 
      {
        console.error("Could not fetch list of barbers", error);
      }

  }, []);

  if (barbers.length === 0) 
  {
    // Data is still being fetched or no barbers available
    return <div>רשימת ספרים לא זמינה</div>;
  }

  return ( 
    <div>
      <h1 className="center">בחר\י ספר\ספרית</h1>
      <div className="center">
      <select id="barberSelector" name="barberSelector" onChange={(event) => handleBarberChoose(event.target.value)}>
        <option value="">בחר\י ספר\ספרית</option>
        {barbers.map(barber => (
          <option key={barber.id} value={barber.id} >{barber.name} {barber.lastName}</option>
        ))}
      </select>
      </div>

    </div>
  )
}

export default BarbersList