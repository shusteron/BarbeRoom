"use client" // turn it from server component to client component
import Link from "next/link"
// import '@styles/globals.css'
import "../styles/globals.css"
import axios from "axios";
import React, { useState, useEffect } from 'react';


const BarbersList = () => {

  const [barbers, setBarbers] = useState([]); // list of barbers - initially an empty list

  useEffect(() => {
    const fetchBarbers = async () => {
      try 
      {
        const response = await axios.get("/api/makeAppointment");
        setBarbers(response.data);
      } 

      catch (error) 
      {
        console.error("Could not fetch list of barbers", error);
      }
    };

    fetchBarbers(); 
  }, []);


  return ( 
    <div>
      <h1 className="center">בחר ספר\ספרית</h1>
      <ul>
        {barbers.map(barber => (
          <li key={barber.id}>{barber.name} {barber.lastName}</li>
        ))}
      </ul>
    </div>
  )
}

export default BarbersList