import "../../styles/globals.css"
import PageImage from "../../public/images/PageImage.png"
import Image from 'next/image'


const Page = () => {
  return (
    <div className="center">
      <div className="content">
          <div className="image-container">
            <Image src={PageImage} alt="Logo" className="image"  />
          </div>
          <div className="barbeRoomBarber white-text">BarbeRoom</div>
      </div>
    </div>
  );
};

export default Page; 