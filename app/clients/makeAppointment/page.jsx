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


const makeAppointmentsPage = () => {

  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedHaircutType, setSelectedHaircutType] = useState(null);

  const createAppointment = async () => {

    try
    {
      // Check if all necessary data is available
      if (!selectedBarber || !selectedDay || !selectedHour || !selectedHaircutType) 
      {
        console.error('Missing data for appointment creation');
        return;
      }

      // Get the token from wherever it is stored
      const token = Cookies.get("token");
      
      // Prepare data for the appointment
      const appointmentData = 
      {
        token, 
        barberId: selectedBarber,
        appointmentDate: selectedDay,
        appointmentHour: selectedHour,
        appointmentHaircutType: selectedHaircutType
      };

      const sendAppointmentToServer = await axios.post("/../api/makeAppointment", appointmentData);

      // create appointment in MongoDB
      console.log(sendAppointmentToServer.data);
      // console.log('Appointment created:', { selectedBarber, selectedDay, selectedHour, selectedHaircutType });

    }

    catch
    {
      console.error('Appointment creation error:', error);
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
      {selectedBarber && (
        <>
          <DaySelector
            barberId={selectedBarber}
            onSelectDay={setSelectedDay}
          />
          {selectedDay && (
            <>
              <HourSelector
                barberId={selectedBarber}
                selectedDay={selectedDay}
                onSelectHour={setSelectedHour}
              />
              {selectedHour && (
                <HaircutTypeSelector
                  onSelectHaircutType={setSelectedHaircutType}
                />
              )}
            </>
          )}
        </>
      )}
      {selectedHaircutType && (
        <button onClick={createAppointment}>קבע\י תור</button>
      )}
      </div>






      {/* <div>
        <BarbersList onSelectBarber={setSelectedBarber} />
        {selectedBarber && <DaySelector barberId={selectedBarber} onSelectDay={setSelectedDay} />}
        {selectedDay && <HourSelector onSelectHour={setSelectedHour} day={day} />}
        {selectedHour && <HaircutTypeSelector onSelectHaircutType={setSelectedHaircutType} />}
        {selectedHaircutType && <button onClick={handleAppointment}>Confirm Appointment</button>}
      </div> */}
      

    </div>
  )
}

export default makeAppointmentsPage 