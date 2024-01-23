"use client" // turn it from server component to client component

import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import '@styles/globals.css'



const ClientNav = () => {
  return (
    
      <ul style={{ listStyleType: 'none', padding: 1, display: 'flex', justifyContent: 'center'}}>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/cancelAppointment">ביטול תור</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/history">היסטוריית תורים</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/futureAppointments">תורים עתידיים</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/makeAppointment">קביעת תור</Link>
        </li>
        <li style={{ marginRight: '2px' }}> 
          <Link href="/clients/barbershop">על המספרה</Link>
        </li>
      </ul>
    
  )
}

export default ClientNav