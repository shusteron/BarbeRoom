import {connect} from "@/dbConfig/dbConfig";
import Barbers from "@/models/barberModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {name,lastName, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const Barber = await Barbers.findOne({email})

        if(Barber){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newBarber = new Barber({
            name,
            lastName,
            email,
            password: hashedPassword
        })

        const savedBarber = await newBarber.save()
        console.log(savedBarber);


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}