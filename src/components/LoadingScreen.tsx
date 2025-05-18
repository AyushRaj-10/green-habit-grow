
import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [routineLetters, setRoutineLetters] = useState<string[]>([]);
  
  useEffect(() => {
    const green = "GREEN";
    const routine = "ROUTINE";
    const letterDelay = 200; // milliseconds between each letter
    
    // Animate "GREEN" dropping from top
    green.split('').forEach((letter, index) => {
      setTimeout(() => {
        setGreenLetters(prev => [...prev, letter]);
      }, (index + 1) * letterDelay);
    });
    
    // Animate "ROUTINE" rising from bottom
    routine.split('').forEach((letter, index) => {
      setTimeout(() => {
        setRoutineLetters(prev => [...prev, letter]);
      }, (green.length + index + 1) * letterDelay);
    });
    
    // Complete loading after all animations + extra time
    setTimeout(() => {
      onComplete();
    }, (green.length + routine.length + 2) * letterDelay);
    
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 z-50">
      <div className="flex flex-col items-center">
        <Leaf className="h-16 w-16 text-primary animate-pulse mb-6" />
        
        <div className="flex mb-2 h-16 overflow-hidden">
          {Array.from("GREEN").map((letter, index) => (
            <div 
              key={`green-${index}`}
              className={`text-4xl md:text-5xl font-bold overflow-hidden transition-all duration-300 ease-in-out transform`}
            >
              <span 
                className={`inline-block ${
                  greenLetters.includes(letter) 
                    ? 'translate-y-0 opacity-100' 
                    : '-translate-y-full opacity-0'
                } transition-all duration-500 text-foreground dark:text-foreground`}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex h-16 overflow-hidden">
          {Array.from("ROUTINE").map((letter, index) => (
            <div 
              key={`routine-${index}`}
              className="text-4xl md:text-5xl font-bold overflow-hidden transition-all duration-300 ease-in-out transform"
            >
              <span 
                className={`inline-block ${
                  routineLetters.includes(letter) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-full opacity-0'
                } transition-all duration-500 text-foreground dark:text-foreground`}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>
        
        <p className={`mt-10 text-green-600 dark:text-green-400 animate-fade-in animate-delay-300 ${greenLetters.length === 5 && routineLetters.length === 7 ? 'opacity-100' : 'opacity-0'}`}>
          Building a greener tomorrow...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
