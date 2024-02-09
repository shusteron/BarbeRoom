"use client"
import Link from "next/link"
// import '@styles/globals.css'
import Image from 'next/image'
import Background from "../../../public/images/Background.jpg"
import "../../../styles/globals.css" 
import axios from "axios";
import BarbersList from "../../../components/BarbersList"
import DaySelector from "../../../components/DaySelector"
import HourSelector from "../../../components/HourSelector"
import HaircutTypeSelector from "../../../components/HaircutTypeSelector"
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from "next/server";
import Cookies from 'js-cookie';
import { getCookie } from "../../utils/cookies"
import { toast } from "react-hot-toast";


const makeAppointmentsPage = () => {

  // useStates to store the selected barber, day, hour and haircut type
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedHaircutType, setSelectedHaircutType] = useState(null);

  // Function to create an appointment
  const createAppointment = async () => {

    try
    {
      // Check if all the data is available
      if (!selectedBarber || !selectedDay || !selectedHour || !selectedHaircutType) 
      {
        // Display an error message if the data is missing
        console.log("Missing data for appointment creation");
        console.error('Missing data for appointment creation');
        return;
      }

      // Get the token from the cookies
      const token = Cookies.get("token");
      
      // create an appointment object with the selected data
      const appointmentData = 
      {
        token, 
        barberId: selectedBarber,
        appointmentDate: selectedDay,
        appointmentHour: selectedHour,
        appointmentHaircutType: selectedHaircutType
      };

      // send the appointment to the server
      const sendAppointmentToServer = await axios.post("/../api/makeAppointment", appointmentData);

      // Display a success message if the appointment was created successfully
      console.log(sendAppointmentToServer.data);
      
      // Display a success message to the user if the appointment was created successfully
      toast.success("התור נקבע בהצלחה");
    }

    catch
    {
      // Display an error message if the appointment creation failed
      console.log("Error in creating appointment");
      toast.error("שגיאה בקביעת התור");
    }
  };


  return ( 
    <div>
      <div className='absolute -z-10 w-full'>
        <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000}>
        </Image>
      </div>

      <div>
        <BarbersList onSelectBarber={setSelectedBarber} />
        {selectedBarber && (<DaySelector barberId={selectedBarber} onSelectDay={setSelectedDay} />)}
        {selectedDay && (<HourSelector barberId={selectedBarber} selectedDay={selectedDay} onSelectHour={setSelectedHour} />)}
        {selectedHour && (<HaircutTypeSelector onSelectHaircutType={setSelectedHaircutType} />)}
        {selectedHaircutType && (<button onClick={createAppointment}>קבע\י תור</button>)}
      </div>
    </div>
  )
}

export default makeAppointmentsPage 