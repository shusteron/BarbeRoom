// WazeButton.js
import React from 'react';

const WazeButton = () => {
  const openWaze = () => {
    // Specify the latitude and longitude of TLV Airport
    const latitude = 32.0004; // Example latitude for TLV Airport
    const longitude = 34.8702; // Example longitude for TLV Airport
    // Open Waze URL with the specified location in a new tab
    window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, '_blank');
  };

  return (
    <div>
      <button className="waze-button" onClick={openWaze}>
        <img src="/images/waze.png" alt="Waze Icon" />
        Open in Waze
      </button>
      
    </div>
  );
};

export default WazeButton;
