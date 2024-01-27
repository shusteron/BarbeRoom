
import {connect} from "../../../../../dbConfig/dbConfig";
import Clients from "../../../../../models/clientModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";

connect();

export async function POST(request ) {
    try {
        const reqBody = await request.json();
        const { name, lastName, email, phoneNumber, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const client = await Clients.findOne({ email });

        if (client) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newClient = new Clients({
            name,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword
        });

        const savedClient = await newClient.save();
        console.log(savedClient);
        return NextResponse.json(savedClient, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

