"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";



const BarbersList = () => {

    const [barbers, setBarbers] = useState([]); // list of barbers - initially an empty list

    useEffect(() => {
        const fetchedBarbersList = 
        fetch("https://cloud.mongodb.com/v2/65aff01b55810e6cbc10acd3#/metrics/replicaSet/65aff13a7f4e3a6b810c8bad/explorer/barbersDB/barbers/find")

        setBarbers(fetchedBarbersList);
    }, [barbers])

    return ( 
      <div>
          <h2>בחר ספר\ספרית</h2>
          <ul>
          {
              barbers.map(barber => (
              <li key={barber.id} onClick={() => onSelectBarber(barber)}>
                  {barber.name}
              </li>
              ))
          }
        </ul>

      </div>
    )
}

export default BarbersList