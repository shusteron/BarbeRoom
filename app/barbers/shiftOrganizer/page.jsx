"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const RegisterShiftPage = () => {
  const isMonday = (date) => {
    return date.getDay() != 1 && date.getDay() != 5 && date.getDay() != 6; 
  };

  const disableMonday = (date) => {
    return isMonday(date);
  };
  const [selectedShift, setSelectedShift] = useState('');

  const formik = useFormik({
    initialValues: {
      shiftDay: null,
    },
    validationSchema: Yup.object({
      shiftDay: Yup.date().required('שדה חובה'),
    }),
    onSubmit: async (values) => {
      try {
        // Get the token from wherever it is stored
        const token = Cookies.get('token');

        // Use token and formattedShiftDay for shift registration
        const response = await axios.post('/api/shiftOrganizer', {
          token,
          shiftDay: values.shiftDay.toISOString(),
          morningShift: selectedShift === 'morning',
          eveningShift: selectedShift === 'evening',
        });

        console.log('Shift registration success', response.data);
        toast.success('משמרת נקבעה בהצלחה');
      } catch (error) {
        console.error('Shift registration error:', error);
        toast.error('הרשמה למשמרת נכשלה, את/ה רשום למשמרת באותו');
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text">
      <h1>{formik.isSubmitting ? 'מעבד' : 'הרשמה למשמרות'}</h1>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        {/* Shift Day */}
        <div className="mb-4 flex flex-col">
          {formik.touched.shiftDay && formik.errors.shiftDay && (
            <p className="text-red-500">{formik.errors.shiftDay}</p>
          )}
            <label htmlFor="shiftDay" className="label-right">תאריך</label>
            <DatePicker
            id="shiftDay"
            selected={formik.values.shiftDay}
            onChange={(date) => formik.setFieldValue('shiftDay', date)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            minDate={new Date()} // Set minimum date to the current day
            dateFormat="yyyy-MM-dd"
            filterDate={disableMonday}
          />
        </div>

        {/* Select Shift */}
        <div className="mb-4 flex items-center">
          <label htmlFor="morningShift" className="mr-2">
            משמרת בוקר
            <input
              type="radio"
              id="morningShift"
              value="morning"
              checked={selectedShift === 'morning'}
              onChange={() => setSelectedShift('morning')}
              className="ml-2"
            />
          </label>
          <label htmlFor="eveningShift" className="mr-2">
            משמרת ערב
            <input
              type="radio"
              id="eveningShift"
              value="evening"
              checked={selectedShift === 'evening'}
              onChange={() => setSelectedShift('evening')}
              className="ml-2"
            />
          </label>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            disabled={
              formik.isSubmitting || !formik.values.shiftDay || !selectedShift
            }
          >
            {formik.isSubmitting ? 'מעבד' : 'הרשמה למשמרת'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterShiftPage;
