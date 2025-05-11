
import { useState } from 'react';

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
  fallbackSrc = "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  className = "",
  width,
  height,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      console.log(`Image failed to load: ${src}, using fallback`);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

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
