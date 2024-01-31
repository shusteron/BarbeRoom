"use client"
import Link from "next/link"
// import '@styles/globals.css'
import "../../../styles/globals.css"
import axios from "axios";
import BarbersList from "../../../components/BarbersList"


const makeAppointmentsPage = () => {


  return ( 
    <div>
      <BarbersList></BarbersList>
    </div>
  )
}

export default makeAppointmentsPage 