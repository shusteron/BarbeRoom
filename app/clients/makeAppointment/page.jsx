"use client"
import Link from "next/link"
// import '@styles/globals.css'
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







  return ( 
    <div>
      <BarbersList></BarbersList>

      {/* <BarberList onSelectBarber={setSelectedBarber} />
      {selectedBarber && (
        <>
          <DaySelector
            barberId={selectedBarber.id}
            onSelectDay={setSelectedDay}
          />
          {selectedDay && (
            <>
              <HourSelector
                barberId={selectedBarber.id}
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
      )} */}

    </div>
  )
}

export default makeAppointmentsPage 