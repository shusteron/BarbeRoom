"use client"
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
import Cookies from 'js-cookie';
import { toast } from "react-hot-toast";
 

const MakeAppointmentsPage = () => {

  // useStates to store the selected barber, day, hour and haircut type
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedShiftType, setSelectedShiftType] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedHaircutType, setSelectedHaircutType] = useState(null);

  // Function to reset the selection of the day, hour and haircut type
  const resetSelection = () => { 
    setSelectedDay(null);
    setSelectedHour(null);
    setSelectedHaircutType(null);
  };

  // Function to create an appointment
  const createAppointment = async () => { 

    try
    {
      // Check if all the data is available
      if (!selectedBarber || !selectedDay || !selectedHour || !selectedHaircutType) 
      {
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
      const appointmentDataFromServer = await axios.post("/../api/makeAppointment", appointmentData);

      console.log(appointmentDataFromServer.data);
      
      // Display a success message to the user if the appointment was created successfully
      toast.success("התור נקבע בהצלחה");
    }

    catch
    {
      // Display an error message if the appointment creation failed
      console.log("Error in creating appointment");
      toast.error("שגיאה בקביעת התור - התור הנוכחי תפוס, נא לבחור שעה אחרת");
    }
  };


  return ( 
    <div>
      <div className='absolute -z-10 w-full'>
        <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000}>
        </Image>
      </div>

      <div>
        <BarbersList onSelectBarber={setSelectedBarber} resetSelection={resetSelection} />
        {selectedBarber && (<DaySelector barberId={selectedBarber} onSelectDay={setSelectedDay} onSelectShiftType={setSelectedShiftType} />)}
        {selectedDay && (<HourSelector barberId={selectedBarber} selectedDay={selectedDay}
         selectedShiftType={selectedShiftType} onSelectHour={setSelectedHour} />)}
        {selectedHour && (<HaircutTypeSelector onSelectHaircutType={setSelectedHaircutType} />)}
        {selectedHaircutType && (
            <div className="flex justify-center items-center mt-4">
              <button onClick={createAppointment}>קבע\י תור</button>
            </div>)}
      </div>
    </div>
  )
}

export default MakeAppointmentsPage 