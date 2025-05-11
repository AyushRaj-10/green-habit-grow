
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

interface GreenGrowthAnimationProps {
  className?: string;
}

const GreenGrowthAnimation: React.FC<GreenGrowthAnimationProps> = ({ className }) => {
  const [grow, setGrow] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setGrow(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-[300px] ${className || ''}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Tree trunk */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: grow ? 180 : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-8 bg-amber-800 dark:bg-amber-700 rounded-sm z-10"
          style={{ transformOrigin: 'bottom' }}
        />
        
        {/* Tree branches */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: grow ? 1 : 0, scale: grow ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
          className="absolute bottom-[140px] z-20"
        >
          <div className="flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="h-2 bg-amber-700 dark:bg-amber-600 rounded-full"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: grow ? 1 : 0, scale: grow ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
          className="absolute bottom-[100px] z-20"
        >
          <div className="flex justify-end">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 90 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="h-2 bg-amber-700 dark:bg-amber-600 rounded-full"
              style={{ transformOrigin: 'right' }}
            />
          </div>
        </motion.div>
        
        {/* Leaves */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute z-30"
        >
          {[...Array(12)].map((_, i) => {
            const delay = 2 + (i * 0.1);
            const size = Math.floor(Math.random() * 16) + 24;
            const posX = (Math.random() * 240) - 120;
            const posY = (Math.random() * 140) - 180;
            const rotation = Math.floor(Math.random() * 360);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: posX, 
                  y: posY, 
                  rotate: rotation 
                }}
                transition={{ 
                  duration: 1.2,
                  delay: delay,
                  type: "spring",
                  stiffness: 50
                }}
                className="absolute"
              >
                <Leaf 
                  size={size} 
                  className={
                    i % 3 === 0 ? "text-green-600 dark:text-green-500" :
                    i % 3 === 1 ? "text-green-500 dark:text-green-400" :
                    "text-emerald-500 dark:text-emerald-400"
                  }
                />
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Growth particles */}
        {grow && [...Array(15)].map((_, i) => {
          const size = Math.floor(Math.random() * 4) + 2;
          const delay = 0.5 + (Math.random() * 2);
          
          return (
            <motion.div
              key={`particle-${i}`}
              initial={{ opacity: 0.8, y: 100, x: (Math.random() * 30) - 15 }}
              animate={{ 
                opacity: 0,
                y: -150 - (Math.random() * 50),
                x: (Math.random() * 100) - 50
              }}
              transition={{ 
                duration: 3,
                delay: delay,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: Math.random() * 2
              }}
              className={`absolute rounded-full bg-green-300 dark:bg-green-500`}
              style={{ width: size, height: size }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GreenGrowthAnimation;
