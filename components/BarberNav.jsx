"use client" // turn it from server component to client component

import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import '@styles/globals.css'



const BarberNav = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 1, display: 'flex', justifyContent: 'center'}}>
        <li style={{ marginRight: '2px' }}>
          <Link href="/barbers/workSchedule">סידור עבודה</Link>
        </li>
        <li>
          <Link href="/barbers/shiftOrganizer">שיבוץ ימי עבודה</Link>
        </li>
      </ul>
    </nav>
  )
}

export default BarberNav