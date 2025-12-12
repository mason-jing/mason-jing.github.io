import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LikeButton from './components/LikeButton/LikeButton';
import StarsCanvas from './components/canvas/Stars';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#0a0a1f] to-[#050816] overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <StarsCanvas />
      </div>
      
      <Navbar scrolled={scrolled} />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
      <LikeButton />
    </div>
  );
}