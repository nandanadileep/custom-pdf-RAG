import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Heart } from 'lucide-react';


const CuteAnimals: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-50">
      {/* 1. The decorative floor/bar at the very bottom */}
      <div className="absolute bottom-0 w-full h-4 bg-[#FBCFE8] border-t-4 border-white/50 shadow-lg"></div>

      {/* 2. The Animals sitting on the bar */}
      <div className="relative w-full h-full max-w-7xl mx-auto flex items-end justify-between px-10 pb-3">
        
        {/* Left Side: A sleeping bunny */}
        <motion.img 
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm90eW54M3BpdGZ5aDV3anV6bHhqbm90eW54M3BpdGZ5aDV3anV6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1hkqkUcyQ5r0s/giphy.gif" // Placeholder cute bunny GIF
          alt="Bunny"
          className="w-24 h-24 object-contain pixel-art drop-shadow-md"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Middle: Walking Cat (Moving across) */}
        <motion.div
          className="absolute bottom-3 left-1/2"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        >
           <img 
             src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJ2eW44eXJ2eW44eXJ2eW44eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Lq0h93752f6J9tijph/giphy.gif" // Placeholder walking cat
             alt="Cat"
             className="w-20 h-20 object-contain pixel-art"
           />
        </motion.div>

        {/* Right Side: A Bear holding a heart */}
        <motion.img 
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHl5bnZ5aHl5bnZ5aHl5bnZ5aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UvZj8Pz2Jz5a/giphy.gif" // Placeholder bear
          alt="Bear"
          className="w-24 h-24 object-contain pixel-art drop-shadow-md"
          whileHover={{ scale: 1.1, rotate: 10 }}
        />
      </div>
    </div>
  );
};

export default CuteAnimals;