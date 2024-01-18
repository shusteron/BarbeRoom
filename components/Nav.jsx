"use client" // turn it from server component to client component

import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import '@styles/globals.css'



const Nav = () => {
  return (
    <nav className='.navbar'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src="/images/Logo.svg" 
          alt='BarbeRoom Logo' // shown incase the photo doesn't display
          width={30}
          height={30}
        /> 
        <p className='logo_text'>BarbeRoom</p>
      </Link>
    </nav>
  )
}

export default Nav