"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";



const SignupPage = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
  
    const formik = useFormik({
      initialValues: {
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        name: Yup.string().required("שדה חובה"),
        lastName: Yup.string().required("שדה חובה"),
        phoneNumber: Yup.string().required("שדה חובה"),
        email: Yup.string().email("אימייל לא חוקי").required("שדה חובה").matches(/@/, 'אימייל חייב להכיל "@"'),
        password: Yup.string().min(6, "סיסמא חייבת להכיל 6 תוים לפחות").required("שדה חובה"),
      }),
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/clients/signup", values);
          console.log("Signup success", response.data)
          // Show a success toast message
          toast.success("הרשמה בוצעה בהצלחה");
          router.push("/clients/login");
          
  
        } catch (error) {
          console.log(error);
          console.log(error.response);
          toast.error("הרשמה נכשלה");
          
          if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            console.log(errorMessage);
            // Check if the error message indicates that the email already exists
            if (errorMessage.includes("email already exists")) {
              toast.error("מייל כבר קיים, בבקשה הכנס מייל אחר");
            } else {
              // Handle other error messages
              toast.error(errorMessage);
            }
          } else {
            // Handle other types of errors
            toast.error(error.message);
          }
        } finally {
          setLoading(false);
        }
      },
      
      
    });
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text" style={{ direction: 'rtl' }}>
      <h1>{loading ? "עוד רגע ואתם נכנסים" : "הרשמה"}</h1>
        <hr />
  
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">שם פרטי</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black text-align-right w-full"
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="lastName"> שם משפחה</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black text-align-right w-full"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500">{formik.errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber">מספר טלפון</label>
            <input
              id="phoneNumber"
              type="tel"
              {...formik.getFieldProps("phoneNumber")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black text-align-right w-full"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && <p className="text-red-500">{formik.errors.phoneNumber}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="email">אימייל</label>
            <input
              id="email"
              type="text"
              {...formik.getFieldProps("email")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black text-align-right w-full"
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="password">סיסמה</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black text-align-right w-full"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </div>
  
          <div className="flex items-center justify-center">
              <button
                type="submit"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "עוד רגע ואתם נכנסים" : "הרשמה"}
              </button>
            </div>
          </form>
  
        <Link href="../clients/login">יש לכם כבר משתמש, הכנס עכשיו</Link>
      </div>
    );
  };
  
  export default SignupPage;
  
  