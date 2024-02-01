"use client" // turn it from server component to client component
import Link from "next/link"
// import '@styles/globals.css'
import "../styles/globals.css"
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from "next/server";
import {useRouter} from "next/navigation";


const BarbersList = () => {

  const [barbers, setBarbers] = useState([]); // list of barbers - initially an empty list

  useEffect(() => {
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
    return <div>Loading...</div>;
  }

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