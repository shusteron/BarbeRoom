import "../../styles/globals.css"
import PageImage from "../../public/images/PageImage.png"
import Image from 'next/image'


const Page = () => {
  return (
    <div className="center">
      <div className="content">
        <div className="barbeRoom image-container white-text">BarbeRoom</div>
        <div className="image-container">
          <Image src={PageImage} alt="Logo" className="image"  />
        </div>
      </div>
    </div>
  );
};

export default Page;