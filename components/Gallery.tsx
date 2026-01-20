
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="space-y-4">
      {/* Main Slideshow */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setSelectedImage(images[activeIndex])}
          />
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-6 bg-white' : 'w-1 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer shadow-sm border-2 ${i === activeIndex ? 'border-rose-200' : 'border-transparent'}`}
            onClick={() => setActiveIndex(i)}
          >
            <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              className="max-w-full max-h-full rounded shadow-2xl" 
            />
            <button className="absolute top-6 right-6 text-white text-3xl">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
