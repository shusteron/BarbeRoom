import { Inter } from 'next/font/google'
// import '@styles/globals.css'
import "../styles/globals.css"
// import Nav from '@components/Nav'
import Nav from '../components/Nav'
import Footercomp from '../components/Footercomp'
import { Toaster } from 'react-hot-toast'


const inter = Inter({ subsets: ['latin'] })

 
export const metadata = {
  title: 'BarbeRoom', // title of the page
  description: 'A room for your hair. Book your next appointment effortlessly through our website.', // A short description displayed in the search engine
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav></Nav>
        {children}
        <Toaster />
        <Footercomp/>
      </body>
    </html>
  )
}
