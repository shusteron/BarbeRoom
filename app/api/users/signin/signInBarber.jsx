// import {connect} from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Barbers from "@/models/barberModel";

// connect()

// export async function POST(request: NextRequest){
//     try {

//         const reqBody = await request.json()
//         const {email, password} = reqBody;
//         console.log(reqBody);

//         //check if user exists
//         const Barber = await Barbers.findOne({email})
//         if(!Barber){
//             return NextResponse.json({error: "User does not exist"}, {status: 400})
//         }
//         console.log("user exists");
        
        
//         //check if password is correct
//         const validPassword = await bcryptjs.compare(password, Barber.password)
//         if(!validPassword){
//             return NextResponse.json({error: "Invalid password"}, {status: 400})
//         }
//         console.log(Barber);
        
//         //create token data
//         const tokenData = {
//             id: Barber._id,
//             name: Barber.username,
//             lastName: Barber.lastName,
//             email: Barber.email
//         }
//         //create token
//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

//         const response = NextResponse.json({
//             message: "Login successful",
//             success: true,
//         })
//         response.cookies.set("token", token, {
//             httpOnly: true, 
            
//         })
//         return response;

//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {status: 500})
//     }
// }



const { connect } = require("@/dbConfig/dbConfig");
const { NextRequest, NextResponse } = require("next/server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Barbers = require("@/models/barberModel");

connect();

module.exports.POST = async function (request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // Check if user exists
        const Barber = await Barbers.findOne({ email });
        if (!Barber) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        console.log("User exists");

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, Barber.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        console.log(Barber);

        // Create token data
        const tokenData = {
            id: Barber._id,
            name: Barber.username,
            lastName: Barber.lastName,
            email: Barber.email,
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
