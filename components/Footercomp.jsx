"use client"
import  styles from "../styles/globals.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWaze } from '@fortawesome/free-brands-svg-icons'

const Footercomp = () => {
     const openWaze = () => {
    // Specify the latitude and longitude of the destination
    const latitude = 31.346199557479526; 
    const longitude =  34.30400826617248;
    

    // Open Waze URL with the specified location in a new tab
    window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, '_blank');
  };

  return (
    <footer className={styles.footer}> {/* Use className to apply the styles */}
      <a href='mailto:BarbeRoom@gmail.com' className={styles.button}>
        <FontAwesomeIcon icon={faEnvelope} />
        <span> Mail</span>
      </a>

      <a href='tel:0523201458' className={styles.button}>
        <FontAwesomeIcon icon={faPhone} />
        <span> Call Us</span>
      </a>

      <button onClick={openWaze} className={styles.button}>
        <FontAwesomeIcon icon={faWaze} />
        <span> Waze</span>
      </button>
    </footer>
  )
}

export default Footercomp