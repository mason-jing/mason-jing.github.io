import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const navLinks = [
  { id: 'hero', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'experience', title: 'Experience' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' },
];

export default function Navbar({ scrolled }: NavbarProps) {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const handleNavClick = (id: string) => {
    setActive(id);
    setToggle(false);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-8 transition-all duration-300 ${
      scrolled ? 'bg-[rgba(5,8,22,0.95)] backdrop-blur-md shadow-lg py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a
          href="#hero"
          className="flex items-center gap-1 text-2xl font-bold text-white transition-transform duration-200 hover:scale-105"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <span>Portfolio</span>
          <span className="text-[#915eff] text-3xl">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`cursor-pointer ${active === link.id ? 'text-[#915eff]' : 'text-white/70'}`}
              onClick={() => handleNavClick(link.id)}
            >
              <a 
                href={`#${link.id}`}
                className="relative text-base font-medium transition-colors duration-200 hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#915eff] after:to-[#ff006e] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            className="bg-transparent border-0 text-white cursor-pointer p-2 flex items-center justify-center transition-colors duration-200 hover:text-[#915eff]"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
          >
            {toggle ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`fixed top-0 ${toggle ? 'right-0' : 'right-[-100%]'} w-4/5 max-w-[300px] h-screen bg-[rgba(5,8,22,0.98)] backdrop-blur-xl pt-24 px-8 pb-8 transition-all duration-300 shadow-[-4px_0_20px_rgba(0,0,0,0.5)]`}>
            <ul className="list-none flex flex-col gap-8">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className="cursor-pointer"
                  onClick={() => handleNavClick(link.id)}
                >
                  <a
                    href={`#${link.id}`}
                    className={`block py-2 transition-all duration-200 text-lg font-medium ${
                      active === link.id 
                        ? 'text-[#915eff] pl-4' 
                        : 'text-white/70 hover:text-white hover:pl-4'
                    }`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}