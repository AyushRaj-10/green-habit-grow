
import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [textVisible, setTextVisible] = useState(false);
  
  useEffect(() => {
    // Show text after a short delay
    setTimeout(() => {
      setTextVisible(true);
    }, 400);
    
    // Complete after a fixed time without progress bar
    setTimeout(() => {
      onComplete();
    }, 2500);
    
    return () => {};
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 z-50">
      <div className="flex flex-col items-center">
        <Leaf className="h-16 w-16 text-primary animate-pulse" />
        
        <div className="overflow-hidden h-16 mt-6">
          <h1 
            className={`text-4xl md:text-5xl font-bold green-gradient-text animate-text-drop-in ${textVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            Green
          </h1>
        </div>
        
        <div className="overflow-hidden h-16 -mt-2">
          <h1 
            className={`text-4xl md:text-5xl font-bold green-gradient-text animate-text-rise-in animate-delay-200 ${textVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            Routine
          </h1>
        </div>
        
        <p className="mt-10 text-green-600 dark:text-green-400 animate-fade-in animate-delay-300">
          Building a greener tomorrow...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
