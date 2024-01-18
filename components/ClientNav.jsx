"use client" // turn it from server component to client component

import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import '@styles/globals.css'



const ClientNav = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 1, display: 'flex', justifyContent: 'center'}}>
        <li style={{ marginRight: '2px' }}>
          <Link href="/client/dashboard">ביטול תור</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/client/appointments">היסטוריית תורים</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/client/appointments">תורים עתידיים</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/client/appointments">קביעת תור</Link>
        </li>
        <li style={{ marginRight: '2px' }}>
          <Link href="/client/appointments">על המספרה</Link>
        </li>
      </ul>
    </nav>
  )
}

export default ClientNav