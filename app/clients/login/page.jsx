"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
 

export default function LoginPage() {
    const router = useRouter();
    const [client, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/clients/login", client);
            console.log("Login success", response.data);
            toast.success("נכנסת בהצלחה");
            localStorage.setItem("userType", "client");
            router.push("/clients");
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
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(client.email.length > 0 && client.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [client]);

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 white-text">
        <h1>{loading ? "עוד רגע ואתם נכנסים" : "כניסה"}</h1>
        <hr />
        
        <label htmlFor="email">אימייל</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={client.email}
            onChange={(e) => setUser({...client, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">סיסמה</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={client.password}
            onChange={(e) => setUser({...client, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">התחבר/י</button>
            <Link href="../clients/signUp">עדיין לא מנויים? הירשמו עכשיו</Link>
        </div>
    )

}