"use client"
import React from 'react';
import styles from './ImageSlider.module.css'; // Import the styles 
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "@material-tailwind/react";
import ImageGallery from "react-image-gallery";

const ImageSlider = (props) => {
  const { images } = props;

  return (
    <div className={styles.container}> {/* Use CSS module classes */}
      <div className={styles.slider}> {/* Use CSS module classes */}
        {images.map((image, index) => (
          <img
            key={index}
            className={` ${styles.image} aspect-video`}
            src={image}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
    
  );
};

export default ImageSlider;
