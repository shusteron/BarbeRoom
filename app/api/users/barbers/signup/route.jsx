import {connect} from "../../../../../dbConfig/dbConfig";
import Barbers from "../../../../../models/barberModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";


connect()


export async function POST(request ){
    try {
        const reqBody = await request.json()
        const {name,lastName, email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const barber = await Barbers.findOne({email})

        if(barber){
            return NextResponse.json({error: "email already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newBarber = new Barbers({
            name,
            lastName,
            email,
            password: hashedPassword
        })

        const savedBarber = await newBarber.save()
        console.log(savedBarber);

        return NextResponse.json(savedBarber, {status: 201})


    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message}, {status: 500})

    }
}



