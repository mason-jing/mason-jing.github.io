import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-8 pt-24 pb-8 relative">
      <div className="max-w-7xl mx-auto w-full text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white mb-4 font-bold">
            Hi, I'm <span className="bg-gradient-to-r from-[#915eff] to-[#ff006e] bg-clip-text text-transparent">Your Name</span>
          </h1>
          
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl text-white/70 mb-6 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            I develop innovative web experiences
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-white/50 leading-relaxed mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Full-stack developer passionate about creating beautiful, functional, and user-centered digital experiences.
            Specializing in React, TypeScript, and modern web technologies.
          </motion.p>

          <motion.div
            className="flex gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a
              href="https://github.com/mason-jing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(145,94,255,0.1)] border-2 border-[rgba(145,94,255,0.3)] text-white/70 transition-all duration-300 hover:bg-[rgba(145,94,255,0.2)] hover:border-[#915eff] hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(145,94,255,0.3)]"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(145,94,255,0.1)] border-2 border-[rgba(145,94,255,0.3)] text-white/70 transition-all duration-300 hover:bg-[rgba(145,94,255,0.2)] hover:border-[#915eff] hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(145,94,255,0.3)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(145,94,255,0.1)] border-2 border-[rgba(145,94,255,0.3)] text-white/70 transition-all duration-300 hover:bg-[rgba(145,94,255,0.2)] hover:border-[#915eff] hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(145,94,255,0.3)]"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer transition-colors duration-200 hover:text-[#915eff]"
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
}