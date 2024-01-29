// import Appointment from "../../../models/Appointment";
// import { NextResponse } from "next/server";


// // create Appointment
// export async function POST(request)
// {
//     try 
//     {
//         const requestBody = await request.json();
//         const appointmentData = requestBody.dataFormat;
//         await Appointment.create(appointmentData);

//         return NextResponse.json({ message: "Appointment created" }, { status: 201 });
//     } 
    
//     catch (error) 
//     {
//         return NextResponse.json({ message: "Couldn't create an Appointment", error }, { status: 500 });
//     }
// } 