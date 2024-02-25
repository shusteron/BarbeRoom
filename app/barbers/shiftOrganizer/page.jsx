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
//import barberModel from '../../../models/barberModel'
import { getCookie } from '../../utils/cookies'
import Cookies from 'js-cookie';
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const RegisterShiftPage = () => {
  const isMonday = (date) => {
    return date.getDay() != 1; // Monday is represented by 1 in JavaScript's getDay() function
  };

  const disableMonday = (date) => {
    return isMonday(date);
  };


  const [shiftDay, setShiftDay] = useState(new Date());
  const [morningShift, setMorningShift] = useState(false);
  const [eveningShift, setEveningShift] = useState(false);


  const formik = useFormik({
    initialValues: {
      shiftDay: null,
      morningShift: false,
      eveningShift: false,
    },
    validationSchema: Yup.object({
      shiftDay: Yup.date().required('Shift day is required'),
      
    }),

    onSubmit: async (values) => {
      try {

        // Get the token from wherever it is stored
        const token = Cookies.get("token");

        // Convert the date to a string in a suitable format if it's not null
        const formattedShiftDay = values.shiftDay
        ? new Date(
            values.shiftDay.getTime() - values.shiftDay.getTimezoneOffset() * 60000 // Convert to UTC
          ).toISOString()
        : null;
        // Use token and formattedShiftDay for shift registration
        const response = await axios.post('/api/shiftOrganizer', {
          token,
          shiftDay: formattedShiftDay,
          morningShift: formik.values.morningShift,
          eveningShift: formik.values.eveningShift,
        });

        console.log('Shift registration success', response.data);
        toast.success('Shift registration successful!');
      } catch (error) {
        console.error('Shift registration error:', error);
        toast.error('Shift registration failed');
      }
    },
  });


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text">
      <h1>{formik.isSubmitting ? 'Processing' : 'Register Shift'}</h1>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        
        {/* Shift Day */}
        <div className="mb-4">
          {formik.touched.shiftDay && formik.errors.shiftDay && (
            <p className="text-red-500">{formik.errors.shiftDay}</p>
          )}
          <label htmlFor="shiftDay">Shift Day</label>
          <DatePicker
            id="shiftDay"
            selected={formik.values.shiftDay}
            onChange={(date) => formik.setFieldValue('shiftDay', date)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            minDate={new Date()} // Set minimum date to the current day
            dateFormat="yyyy-MM-dd"
            filterDate={disableMonday} // Disable Mondays
/>
        </div>

        {/* Select Shift */}
<div className="mb-4">
  <label>
    <input
      type="radio"
      value="morning"
      checked={formik.values.shift === 'morning'}
      onChange={() => formik.setFieldValue('shift', 'morning')}
    />
    Morning Shift
  </label>
</div>
<div className="mb-4">
  <label>
    <input
      type="radio"
      value="evening"
      checked={formik.values.shift === 'evening'}
      onChange={() => formik.setFieldValue('shift', 'evening')}
    />
    Evening Shift
  </label>
</div>

          <div className="flex items-center justify-center">
  <button
    type="submit"
    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
    disabled={
      formik.isSubmitting ||
      (!formik.values.shiftDay || (!formik.values.morningShift && !formik.values.eveningShift))
    }
  >
    {formik.isSubmitting ? 'Processing' : 'Register Shift'}
  </button>
</div>

      </form>
    </div>
  );
};


export default RegisterShiftPage;