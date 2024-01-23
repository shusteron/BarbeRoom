import Image from 'next/image'
import Link from "next/link"
import Background from '../public/images/Background.jpg'

export default function Home() {
  return (
    <main> 
      <div className='absolute -z-10 w-full'>
        <Image src={Background} alt="Background Image" className="w-full" width={1000} height={1000}>
        </Image>
      </div>
      <div className='text-center' >
        <Link href="/clients">לקוחות</Link> 
      </div>
      <div className='text-center'>
        <Link href="/barbers">ספרים</Link>
      </div>
    </main>
  )
}
