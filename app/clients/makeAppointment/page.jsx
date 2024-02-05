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


const makeAppointmentsPage = () => {

  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedHaircutType, setSelectedHaircutType] = useState(null);

  const handleAppointment = () => {

    

    // create appointment in MongoDB
    console.log('Appointment created:', { selectedBarber, selectedDay, selectedHour, selectedHaircutType });
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
        <button onClick={createAppointment}>Create Appointment</button>
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