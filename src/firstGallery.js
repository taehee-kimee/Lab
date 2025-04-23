import React, { useState, useRef, useEffect } from "react";
import './firstGallery.css';
import { HoverImagePortal } from './HoverImagePortal';

const photos = [
  { src: '/images/1.avif' },
  { src: '/images/2.avif' },
];


function getRandomStyle(maxWidth, maxHeight, size = 160) {
  const top = Math.floor(Math.random() * (maxHeight - size));
  const left = Math.floor(Math.random() * (maxWidth - size));
  const rotate = Math.floor(Math.random() * 40 - 20);
  return {
    top: `${top}px`,
    left: `${left}px`,
    transform: `rotate(${rotate}deg)`,
  };
}

function FirstGallery() {
  const [styles, setStyles] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  const refs = useRef([]);
  // const imageSize = 160;

  useEffect(() => {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    const newStyles = photos.map(() => getRandomStyle(maxWidth, maxHeight));
    setStyles(newStyles);
  }, []);

  const handleMouseEnter = (i) => {
    const rect = refs.current[i].getBoundingClientRect();
    setHovered({
      src: photos[i].src,
      top: rect.top,
      left: rect.left,
      width: rect.width,
    });
    setVisible(false); 
    setTimeout(() => setVisible(true), 10);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="gallery">
      {photos.map((photo, i) => (
        <img
          key={i}
          ref={(el) => (refs.current[i] = el)}
          src={photo.src}
          alt={`photo-${i}`}
          className="photo"
          style={styles[i]}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      ))}

      {hovered && (
        <HoverImagePortal
          key={hovered.src} 
          src={hovered.src}
          top={hovered.top}
          left={hovered.left}
          width={hovered.width}
        />
      )}
    </div>
  );
}

export default FirstGallery;
