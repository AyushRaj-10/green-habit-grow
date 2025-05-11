import { useState, useEffect } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const ImageWithFallback = ({
  src,
  alt,
  // Use a more reliable default fallback image (data URI of a simple placeholder)
  fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Cpath d='M30,40 L50,20 L70,40 L70,70 L30,70 Z' fill='%23cccccc'/%3E%3Ccircle cx='60' cy='30' r='5' fill='%23cccccc'/%3E%3C/svg%3E",
  className = "",
  width,
  height,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  
  // Reset error state when src changes
  useEffect(() => {
    if (src !== imgSrc && hasError) {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src, imgSrc, hasError]);

  const handleError = () => {
    if (!hasError) {
      console.log(`Image failed to load: ${src}, using fallback`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Add preload for better performance
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      width={width}
      height={height}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
