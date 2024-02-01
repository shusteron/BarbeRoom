"use client"
import Link from "next/link"
// import '@styles/globals.css'
import "../../../styles/globals.css"


const historyPage = () => {









  return (
    <div>
      <h1 className="center">היסטוריית תורים</h1>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <strong>:ספר\ספרית</strong> {appointment.barberName}<br />
            <strong>:תאריך</strong> {appointment.date}<br />
            <strong>:שעה</strong> {appointment.hour}<br />
            <strong>:סוג תספורת</strong> {appointment.haircutType}
          </li>
        ))}
      </ul>      
    </div>
  )
}

export default historyPage  