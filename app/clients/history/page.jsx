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

          // ==================================================================
    // <>
    // <div className='absolute -z-10 w-full'>
    //     <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000}>
    //     </Image>
    //   </div>

    //   <div className="center">historyPage</div>


    //   <div>
    //   <h1>Book List</h1>
    //   <BookTable books={booksData} />
    // </div>

    // </>

  )
}

export default historyPage  