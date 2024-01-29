"use client" // turn it from server component to client component

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react"; 



const DaySelector = () => {

    const [days, setDays] = useState([]);

    useEffect(() => {
        // Fetch days for the selected barber from API or local data
        // Example:
        const fetchedDays = ['Monday', 'Tuesday', 'Wednesday'];
        setDays(fetchedDays);
    }, [barberId]);

    return (
        <div>
        <h2>Select a Day:</h2>
        <ul>
            {days.map(day => (
            <li key={day} onClick={() => onSelectDay(day)}>
                {day}
            </li>
            ))}
        </ul>
        </div>
    );
}

export default DaySelector