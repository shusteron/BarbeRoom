"use client"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import '@styles/globals.css'

import React from 'react'

const booking = () => {

  // Ensuring that minimum date is set to the current date.
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Ensure month and day are formatted with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="center">
        <label for="date-picker">בחר תאריך</label>
        <input type="date" name="trip-start" id="date-picker"
        min={getCurrentDate()} />
    </div>
  )
}

export default booking