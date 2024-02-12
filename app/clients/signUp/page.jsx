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
        name: Yup.string().required("Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        email: Yup.string().email("Invalid email address").required("Email is required").matches(/@/, 'Email must contain "@"'),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      }),
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/clients/signup", values);
          console.log("Signup success", response.data)
          // Show a success toast message
          toast.success("Signup successful!");
          router.push("/clients/login");
          
  
        } catch (error) {
          console.log(error);
          console.log(error.response);
          toast.error("signup failed");
      
          if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            console.log(errorMessage);
            // Check if the error message indicates that the email already exists
            if (errorMessage.includes("email already exists")) {
              toast.error("Email already exists. Please use a different email.");
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
      <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
  
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            />
            {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500">{formik.errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              {...formik.getFieldProps("phoneNumber")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && <p className="text-red-500">{formik.errors.phoneNumber}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              {...formik.getFieldProps("email")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>
  
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
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
                {formik.isSubmitting ? "Processing" : "Signup"}
              </button>
            </div>
          </form>
  
        <Link href="../barbers/login">Visit login page</Link>
      </div>
    );
  };
  
  export default SignupPage;
  
  