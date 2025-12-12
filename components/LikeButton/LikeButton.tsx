import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { database } from '../../lib/firebase';

export default function LikeButton() {
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Listen to likes count from Firebase
    const likesRef = ref(database, 'likes');
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const count = snapshot.val() || 0;
      setLikes(count);
    });

    // Check if user has already liked (stored in localStorage)
    const liked = localStorage.getItem('portfolio-liked') === 'true';
    setHasLiked(liked);

    return () => unsubscribe();
  }, []);

  const handleLike = async () => {
    if (hasLiked) return;

    setIsAnimating(true);
    setShowParticles(true);
    setHasLiked(true);
    localStorage.setItem('portfolio-liked', 'true');

    // Update Firebase
    const likesRef = ref(database, 'likes');
    try {
      await runTransaction(likesRef, (currentLikes) => {
        return (currentLikes || 0) + 1;
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      // Revert on error
      setHasLiked(false);
      localStorage.removeItem('portfolio-liked');
    }

    setTimeout(() => {
      setIsAnimating(false);
      setShowParticles(false);
    }, 1000);
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-[999]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        className={`relative bg-[rgba(21,16,48,0.9)] backdrop-blur-md border-2 rounded-full px-6 py-3 cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
          hasLiked 
            ? 'bg-gradient-to-br from-[rgba(145,94,255,0.3)] to-[rgba(255,0,110,0.2)] border-[rgba(255,0,110,0.5)]' 
            : 'border-[rgba(145,94,255,0.3)] hover:border-[#915eff] hover:shadow-[0_6px_30px_rgba(145,94,255,0.4)]'
        } ${hasLiked && 'cursor-not-allowed'}`}
        onClick={handleLike}
        disabled={hasLiked}
        whileHover={hasLiked ? {} : { scale: 1.05 }}
        whileTap={hasLiked ? {} : { scale: 0.95 }}
      >
        <motion.div
          className="flex items-center gap-3"
          animate={isAnimating ? {
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.6 }}
        >
          <Heart
            className={`transition-all duration-300 ${hasLiked ? 'text-[#ff006e] fill-[#ff006e]' : 'text-white/70'}`}
            size={24}
          />
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-lg font-bold text-white leading-none">{likes.toLocaleString()}</span>
            <span className={`text-xs uppercase tracking-wide leading-none ${hasLiked ? 'text-[#ff006e]' : 'text-white/50'}`}>
              {hasLiked ? 'Liked!' : 'Like'}
            </span>
          </div>
        </motion.div>

        {/* Particle effects */}
        <AnimatePresence>
          {showParticles && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#ff006e] pointer-events-none"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1,
                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: Math.sin((i * Math.PI * 2) / 8) * 60,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Sparkles size={12} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!hasLiked && (
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-[rgba(21,16,48,0.95)] backdrop-blur-md border border-[rgba(145,94,255,0.3)] rounded-lg text-white/70 text-sm whitespace-nowrap shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2 }}
          >
            Show some love! 💜
            <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[rgba(145,94,255,0.3)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
