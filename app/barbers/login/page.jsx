"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [barber, setBarber] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/barbers/login", barber);
          console.log("Login success", response.data);
          toast.success("Login success");
          localStorage.setItem("userType", "barber");
          router.push("/barbers");
        } catch (error) {
            console.log("Login failed", error.message);
            setLoading(false); // Make sure to set loading to false here
        
            // Handle incorrect email or password fields.
            if (error.response && error.response.status === 400) {
                // Unauthorized - Incorrect email or password
                toast.error("Incorrect email or password. Please try again.");
            } else {
                // Other error cases
                toast.error("Login failed. Please try again later.");
            }
        }
    };
      

    useEffect(() => {
        if(barber.email.length > 0 && barber.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [barber]); 

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text">
        <h1>{loading ? "עוד רגע ואתם נכנסים" : "כניסה"}</h1>
        <hr />
        
        <label htmlFor="email">אימייל</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={barber.email}
            onChange={(e) => setBarber({...barber, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">סיסמא</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={barber.password}
            onChange={(e) => setBarber({...barber, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">התחבר/י</button>
            <Link href="../barbers/signUp" >הצטרפו עכשיו לצוות הספרים</Link>
        </div>
    )

}