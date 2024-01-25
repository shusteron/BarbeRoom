// "use client";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import {useRouter} from "next/navigation";
// import axios from "axios";
// import { toast } from "react-hot-toast";




// export default function SignupPage() {
//     const router = useRouter();
//     const [barber, setBarber] = React.useState({
//         name: "",
//         lastName: "",
//         email: "",
//         password: "",
//     })
//     const [buttonDisabled, setButtonDisabled] = React.useState(true);
//     const [loading, setLoading] = React.useState(false);

//     const onSignup = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/barbers/signup", barber);
//             console.log("Signup success", response.data);
//             router.push("/app/barbers/page.jsx");
            
//         } catch (error) {
//             console.log("Signup failed", error.message);
            
//             toast.error(error.message);
//         }finally {
//             setLoading(false);
//         }
//     }

//     // useEffect(() => {
//     //     if(barber.email.length > 0 && barber.password.length > 0 && barber.name.length > 0&&barber.lastName.length > 0) {
//     //         setButtonDisabled(false);
//     //     } else {
//     //         setButtonDisabled(true);
//     //     }
//     // }, [barber]);

//     useEffect(() => {
//         const isFormValid =
//           barber.email.length > 0 &&
//           barber.password.length >= 6 && // Minimum 6 characters for password
//           barber.name.length > 0 &&
//           barber.lastName.length > 0 &&
//           barber.email.includes("@"); // Check for "@" in the email
      
//         setButtonDisabled(!isFormValid);
//       }, [barber]);
      


//     return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1>{loading ? "Processing" : "Signup"}</h1>
//         <hr />
//         <label htmlFor="name">name</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="username"
//             type="text"
//             value={barber.name}
//             onChange={(e) => setBarber({...barber, name: e.target.value})}
//             placeholder="name"
//             />
//         <label htmlFor="lastName">lastName</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="lastName"
//             type="text"
//             value={barber.lastName}
//             onChange={(e) => setBarber({...barber, lastName: e.target.value})}
//             placeholder="lastName"
//             />    
//         <label htmlFor="email">email</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="email"
//             type="text"
//             value={barber.email}
//             onChange={(e) => setBarber({...barber, email: e.target.value})}
//             placeholder="email"
//             />
//         <label htmlFor="password">password</label>
//         <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="password"
//             type="password"
//             value={barber.password}
//             onChange={(e) => setBarber({...barber, password: e.target.value})}
//             placeholder="password"
//             />
//             <button
//             onClick={onSignup}
//             disabled={buttonDisabled}
//             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
//             <Link href="../barbers/login">Visit login page</Link>
//         </div>
//     )

// }



"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/barbers/signup", values);
        console.log("Signup success", response.data);
        router.push("/barbers/login");
        

      } catch (error) {
        console.log("Signup failed", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
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

        {/* <button
          type="button" // Set type to "button" to prevent the default form submission
          onClick={() => {
            formik.handleSubmit();
          }}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
          disabled={loading || formik.isSubmitting}
        >
          {loading ? "Processing" : "Signup"}
        </button>
      </form> */}

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
