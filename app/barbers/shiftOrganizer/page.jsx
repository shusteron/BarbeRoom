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
        toast.error('הרשמה למשמרת נכשלה');
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text">
      <h1>{formik.isSubmitting ? 'מעבד' : 'הרשמה למשמרות'}</h1>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        {/* Shift Day */}
        <div className="mb-4">
          {formik.touched.shiftDay && formik.errors.shiftDay && (
            <p className="text-red-500">{formik.errors.shiftDay}</p>
          )}
          <label htmlFor="shiftDay">תאריך</label>
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
        <div className="mb-4">
          <label>
            <input
              type="radio"
              value="morning"
              checked={selectedShift === 'morning'}
              onChange={() => setSelectedShift('morning')}
            />
            משמרת בוקר
          </label>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="radio"
              value="evening"
              checked={selectedShift === 'evening'}
              onChange={() => setSelectedShift('evening')}
            />
            משמרת ערב
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
            {formik.isSubmitting ? 'מעבד' : 'הרשמה למשמרות'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterShiftPage;
