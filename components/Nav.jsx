"use client" // turn it from server component to client component

import Image from 'next/image'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import "../styles/globals.css"
import ClientNav from './ClientNav'
import BarberNav from './BarberNav'
import Background from '../public/images/Background.jpg'
import { deleteCookie, getCookie } from "../app/utils/cookies";
import {useRouter} from "next/navigation";
import {calculateUserType} from "../app/utils/calculateUserType";
import { usePathname } from 'next/navigation'
import Cookies from "js-cookie"
const Nav = () => {

  const pathname = usePathname();
  const userType = calculateUserType(pathname);
  console.log(userType);


  const router = useRouter();
  // Get the token from cookies
  const token = Cookies.get("token");
  
  //get user type from cookie
  const userNavBar = () => {
    console.log(userType)
    if(!userType || !getCookie("token")) return <></>
    return userType === "barber" ? <BarberNav/>  : <ClientNav />
    
  }

  const homePage = () => {

    if(!userType || !getCookie("token")) return '/'
    return userType === "barber"? "/barbers"  : "/clients"
    
  }

  
  const logout = () => {
    // Clear all items from local storage
    localStorage.clear();
    deleteCookie("token");
    // // Delete the 'userType' cookie
    document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push("/");
  }


  return (
<>
<div className='absolute -z-10 w-full'>
    <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000} />
  </div>
    <nav className='.navbar'>
      <Link href={homePage()} className='flex gap-2 flex-center'>
        <Image
          src="/images/Logo.svg" 
          alt='BarbeRoom Logo' // shown incase the photo doesn't display
          width={50}
          height={50}
          className='rounded'
        /> 
        <p className='logo_text'>BarbeRoom</p>
      </Link>
      {userNavBar()}

      {/* Displaying the logout button or not depands if there is a user signed in */}
      {token && (<button className='bg-red-500 text-white px-4 py-2 rounded-md fixed right-0 top-0 mt-4 mr-4' onClick={() => logout()}>התנתק</button>)}
    
    </nav>
    </>
  )
}

export default Nav