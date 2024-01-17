import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>BarbeRoom</h1>
      <h2>------------</h2>
      <div>
        <Link href="/clients">לקוחות</Link>
      </div>
      <div>
        <Link href="/barbers">ספרים</Link>
      </div>
    </main>
  )
}
