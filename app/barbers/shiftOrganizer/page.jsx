"use client"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import "../../../styles/globals.css"
import Image from 'next/image'
import Background from '../../../public/images/Background.jpg'
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import barberModel from '../../../models/barberModel'
import getCookie from '../../utils/cookies'



const ShiftOrganizer = () => {
  // State variable to hold selected date and time
  const [selectedDateTime, setSelectedDateTime] = useState({ date: '', shift: '' });

  // Handler for date selection
  const handleDateChange = (event) => {
    setSelectedDateTime({ ...selectedDateTime, date: event.target.value });
  };

  // Handler for time selection
  const handleTimeChange = (event) => {
    setSelectedDateTime({ ...selectedDateTime, shift: event.target.value });
  };

  // Function to send data to server
  const sendDataToServer = async() => {
    // Here you can send the selectedDateTime variable to the server
    console.log('Sending data to server:', selectedDateTime);
    // Replace console.log with your actual API call to send the data to the server
    //const Shift = {
    //  getCookie: getCookie, 
    //  date: selectedDateTime.date,
    //  shift: selectedDateTime.shift
    //};     

    try {
      setLoading(true);
      const response = await axios.post("/api/users/barbers/shiftOrganizer", Shift);
      console.log("Login success", response.data);
      toast.success("Login success");
  } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);

      // Handle incorrect email or password fields.
      if (error.response && error.response.status === 400) {
          // Unauthorized - Incorrect email or password
          toast.error("Incorrect email or password. Please try again.");
      } else {
          // Other error cases
          toast.error("Login failed. Please try again later.");
      }
  }
   finally{
  setLoading(false);
  }
  };

  // Ensuring that minimum date is set to the current date.
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    

    // Ensure month and day are formatted with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className='absolute -z-10 w-full'>
        <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000} />
      </div>
      <div className="center">
        <label htmlFor="date-picker">בחר תאריך</label>
        <input 
          type="date" 
          name="trip-start" 
          id="date-picker" 
          min={getCurrentDate()} 
          onChange={handleDateChange} 
        />
      </div>
      <div className="center">
        <label htmlFor="timeOfDay">בוקר או ערב</label>
        <select id="timeOfDay" name="timeOfDay" onChange={handleTimeChange}>
          <option value="">בחר...</option>
          <option value="morning">בוקר</option>
          <option value="evening">ערב</option>
        </select>
      </div>
      <div className="center">
        {selectedDateTime.date && <p>Selected Date: {selectedDateTime.date }</p>}
      </div>
      <div className="center">
      {selectedDateTime.shift && <p>Selected Shift: {selectedDateTime.shift === 'morning' ? 'בוקר' : 'ערב'}</p>}
      </div>

      {/* Button to send data to server */}
      <div className="center">
        <button onClick={sendDataToServer}>הירשם</button>
      </div>
    </>
  );
};

export default ShiftOrganizer;