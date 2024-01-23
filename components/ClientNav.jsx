"use client" // turn it from server component to client component

import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
// import '@styles/globals.css'
import "../styles/globals.css"



const ClientNav = () => {
  return (
    
      <ul style={{ listStyleType: 'none', padding: 1, display: 'flex', justifyContent: 'center'}}>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/dashboard">ביטול תור</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/appointments">היסטוריית תורים</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/appointments">תורים עתידיים</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/booking">קביעת תור</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/clients/appointments">על המספרה</Link>
        </li>
      </ul>
    
  )
}

export default ClientNav