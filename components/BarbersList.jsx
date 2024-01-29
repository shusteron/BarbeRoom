"use client" // turn it from server component to client component
import Link from "next/link"
// import '@styles/globals.css'
import "../styles/globals.css"
import axios from "axios";
import React, { useState, useEffect } from 'react';



const BarbersList = () => {

  const [barbers, setBarbers] = useState([]); // list of barbers - initially an empty list
  console.log("1");

  useEffect(() => {
    const fetchBarbers = async () => {
        console.log("2");
  
      try 
      {
        console.log("7");

        const response = await axios.get('/api/makeAppointment');
        console.log("3");

        setBarbers(response.data);
        console.log("4");

      } 

      catch (error) 
      {
        console.log("5");

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


