"use client"
import Link from "next/link"
// import '@styles/globals.css'
import "../../../styles/globals.css"
import axios from "axios";
import BarbersList from "../../../components/BarbersList"
import React, { useState, useEffect } from 'react';
import { NextRequest, NextResponse } from "next/server";


const makeAppointmentsPage = () => {
  return ( 
    <div>
      <BarbersList></BarbersList>
    </div>
  )
}

export default makeAppointmentsPage 