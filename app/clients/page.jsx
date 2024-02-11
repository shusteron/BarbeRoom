import "../../styles/globals.css"
import PageImage from "../../public/images/PageImage.png"
import Image from 'next/image'


const Page = () => {
  return (
    <div className="center">
      <div className="content">
        <div className="barbeRoomClient image-container white-text">BarbeRoom</div>
        <div className="image-container">
        </div>

        <div className="container white-text">
        <div className="details">
        <p>הנדסת תוכנה, אריאל</p>
        <p>054-8085030</p>
        <p>054-5605087</p>
        <p>052-3201458</p>
        <p>052-2860930</p>  
        </div>
        <div className="opening-hours">
        <h2>:שעות פתיחה</h2>
        <p>ראשון - שישי 21:00 - 08:00</p>
        </div>
        <div className="navigation-link">
        {/* <Link href="https://waze.com/ul?q=BarbeRoom%20Barbershop%2C%20Handasa%20100%2C%20Ariel">
          <a target="_blank" rel="noopener noreferrer">Navigate with Waze</a>
        </Link> */}
        </div>
        </div>

      </div>

      

    </div>
  ); 
};

export default Page;