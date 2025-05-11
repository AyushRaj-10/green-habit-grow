
import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  
  useEffect(() => {
    // Show text after a short delay
    setTimeout(() => {
      setTextVisible(true);
    }, 400);
    
    // Animate progress
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setProgress(Math.min(start, 100));
      
      if (start >= 100) {
        clearInterval(interval);
        // Delay complete callback to let animations finish
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 20);
    
    return () => clearInterval(interval);
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
        
        <div className="w-64 h-2 bg-green-200 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="mt-4 text-green-600 dark:text-green-400 animate-fade-in animate-delay-300">
          Building a greener tomorrow...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
