import {connect} from "../../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import Clients from "../../../../../models/clientModel";

connect();

export async function POST (request) {
    try { 
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // Check if user exists
        const client = await Clients.findOne({ email });
        if (!client) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        console.log("User exists");

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, client.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }
        console.log(client);

        // Create token data
        const tokenData = {
            id: client._id,
            name: client.username,
            lastName: client.lastName,
            phoneNumber: client.phoneNumber,
            email: client.email,
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
        response.cookies.set("userType", "client", {
            httpOnly: false,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
