// import '@styles/globals.css'
import "../../styles/globals.css"
// import ClientNav from '@components/ClientNav'
import ClientNav from "../../components/ClientNav"

const clientsPage = () => {
  return (
    <div>
      {/* signup/login code before redirect it to the client navbar */}
      <ClientNav></ClientNav>
    </div>
  )
}

export default clientsPage