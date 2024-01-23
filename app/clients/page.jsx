import '@styles/globals.css'
import ClientNav from '@components/ClientNav'

const page = () => {
  return (
    <div>
      {/* signup/login code before redirect it to the client navbar */}
      <ClientNav></ClientNav>
    </div>
  )
}

export default page