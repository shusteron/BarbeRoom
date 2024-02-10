"use client"


import Link from "next/link"
import Image from "next/image"
import '../../../styles/globals.css'

const barbershopPage = () => {
  return (
    <div className="container white-text center" style={{ marginBottom: '300px' }}>
      <div className="details" style={{ marginRight: '50px', marginBottom: '300px'}}>
        <h1 style={{ marginBottom: '20px' }}>BarbeRoom מספרת</h1>
        <p style={{ marginBottom: '20px' }}>הנדסת תוכנה, אריאל</p>
        <p>054-8085030</p>
        <p>054-5605087</p>
        <p>052-3201458</p>
        <p>052-2860930</p>
      </div>
      <div className="opening-hours " style={{ marginBottom: '20px' }}>
        <h2>:שעות פתיחה</h2>
        <p>ראשון - שישי 21:00 - 08:00</p>
      </div>
      <div className="navigation-link" style={{ marginBottom: '20px' }}>
        {/* <Link href="https://waze.com/ul?q=BarbeRoom%20Barbershop%2C%20Handasa%20100%2C%20Ariel">
          <a target="_blank" rel="noopener noreferrer">Navigate with Waze</a>
        </Link> */}
      </div>
    </div>
  )
}

export default barbershopPage
