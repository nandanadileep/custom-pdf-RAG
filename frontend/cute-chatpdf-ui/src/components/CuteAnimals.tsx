import React from 'react';
import { motion } from 'framer-motion';

const animals = [
  { emoji: '🐰', delay: 0 },
  { emoji: '🐥', delay: 2 },
  { emoji: '🐱', delay: 4 },
  { emoji: '🐻', delay: 6 },
];

const CuteAnimals: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 overflow-hidden pointer-events-none z-10">
      {/* Pink Glow Gradient */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-kawaii-100/50 to-transparent dark:from-kawaii-900/20" />

      {/* Walking Animals Track */}
      <div className="relative w-full h-full flex items-end pb-2">
        {animals.map((animal, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl select-none"
            initial={{ x: -50 }}
            animate={{
              x: ['-10vw', '110vw'],
              y: [0, -10, 0, -5, 0] // Hopping effect
            }}
            transition={{
              x: {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: animal.delay
              },
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {animal.emoji}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CuteAnimals;