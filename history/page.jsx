"use client"
import Link from "next/link"
import Image from 'next/image'
import Background from '../../../public/images/Background.jpg'
//import '@styles/globals.css'

import BookTable from '../history/comp/BookTable';


const booksData = [
  { name: 'barner 1', date: '2024-01-25', time: '10:00 AM' },
  { name: 'barner 2', date: '2024-01-26', time: '02:30 PM' },
];


const historyPage = () => {
  return (
    <>
    <div className='absolute -z-10 w-full'>
        <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000}>
        </Image>
      </div>

      <div className="center">historyPage</div>


      <div>
      <h1>Book List</h1>
      <BookTable books={booksData} />
    </div>

    </>
  )
}

export default historyPage