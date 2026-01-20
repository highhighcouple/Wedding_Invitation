
import React from 'react';
import { motion } from 'framer-motion';
import { EffectStyle } from '../types';

const Particles: React.FC<{ style: EffectStyle }> = ({ style }) => {
  const getParticleChar = () => {
    switch(style) {
      case EffectStyle.PETAL: return '🌸';
      case EffectStyle.SNOW: return '❄️';
      case EffectStyle.LEAF: return '🍃';
      case EffectStyle.STAR: return '✨';
      case EffectStyle.RAIN: return '💧';
      case EffectStyle.DANDELION: return '☁️';
      case EffectStyle.BUTTERFLY: return '🦋';
      case EffectStyle.DRAGONFLY: return '🎐';
      case EffectStyle.PIGEON: return '🕊️';
      default: return '🌸';
    }
  };

  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            top: '110%',
            left: `${(Math.random() - 0.5) * 20 + (Math.random() * 100)}%`,
            opacity: [0, 0.7, 0],
            rotate: 360
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute text-xl"
        >
          {getParticleChar()}
        </motion.div>
      ))}
    </div>
  );
};

export default Particles;
