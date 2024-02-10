"use client"
import Image from 'next/image'
import Link from "next/link"
import Background from '../public/images/Background.jpg'
import loginBarber from "./barbers/login/page"
import { useEffect } from 'react';


export default function Home() {
// At first, clear all the local storage and cookies to ensure blank Nav-bar
  useEffect(() => {
    // Clear local storage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(';').forEach(function(cookie) {
      document.cookie = cookie.replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  }, []); // Empty dependency array ensures this effect runs only once when component mounts


  return (
    <main> 
      <div className='absolute -z-10 w-full'>
        <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000}>
        </Image>
      </div>
      <div className='text-center mb-8' >
        <Link href="/clients/login" style={{ fontSize: '40px' }}>לקוחות</Link> 
      </div>
      <div className='text-center'>
        <Link href="/barbers/login" style={{ fontSize: '40px' }}>ספרים</Link>
      </div>
    </main>
  )
}
 