

import {connect} from "../../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import Barbers from "../../../../../models/barberModel";


connect();

// Define the login endpoint
export async function POST (request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const barber = await Barbers.findOne({ email });
        if (!barber) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, barber.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: barber._id,
            name: barber.username,
            lastName: barber.lastName,
            email: barber.email,
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: false,
        });

        // Set user type as a cookie
        response.cookies.set("userType", "barber", {
            httpOnly: false,
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
