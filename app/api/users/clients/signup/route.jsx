// import {connect} from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import Clients from "@/models/clientModel";


// connect()


// export async function POST(request: NextRequest){
//     try {
//         const reqBody = await request.json()
//         const {name,lastName, email,phoneNumber, password} = reqBody

//         console.log(reqBody);

//         //check if user already exists
//         const Client = await Clients.findOne({email})

//         if(Client){
//             return NextResponse.json({error: "User already exists"}, {status: 400})
//         }

//         //hash password
//         const salt = await bcryptjs.genSalt(10)
//         const hashedPassword = await bcryptjs.hash(password, salt)

//         const newClient = new Clients({
//             name,
//             lastName,
//             email,
//             phoneNumber,
//             password: hashedPassword
//         })

//         const savedClient = await newClient.save()
//         console.log(savedClient);


//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {status: 500})

//     }
// }

const { connect } = require("@/dbConfig/dbConfig");
const { NextRequest, NextResponse } = require("next/server");
const bcryptjs = require("bcryptjs");
const Clients = require("@/models/clientModel");

connect();

module.exports.POST = async function (request) {
    try {
        const reqBody = await request.json();
        const { name, lastName, email, phoneNumber, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const Client = await Clients.findOne({ email });

        if (Client) {
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
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

