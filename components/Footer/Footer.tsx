import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-4 sm:px-8 py-16 pb-8 border-t border-[rgba(145,94,255,0.2)] bg-[rgba(5,8,22,0.8)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Portfolio<span className="text-[#915eff] text-3xl">.</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Building the future, one line of code at a time
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-white mb-4">Quick Links</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#about" className="text-white/70 text-sm transition-colors duration-200 hover:text-[#915eff]">About</a></li>
              <li><a href="#experience" className="text-white/70 text-sm transition-colors duration-200 hover:text-[#915eff]">Experience</a></li>
              <li><a href="#projects" className="text-white/70 text-sm transition-colors duration-200 hover:text-[#915eff]">Projects</a></li>
              <li><a href="#contact" className="text-white/70 text-sm transition-colors duration-200 hover:text-[#915eff]">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/mason-jing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(145,94,255,0.1)] border border-[rgba(145,94,255,0.2)] text-white/70 transition-all duration-300 hover:bg-[rgba(145,94,255,0.2)] hover:border-[#915eff] hover:text-white hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(145,94,255,0.1)] border border-[rgba(145,94,255,0.2)] text-white/70 transition-all duration-300 hover:bg-[rgba(145,94,255,0.2)] hover:border-[#915eff] hover:text-white hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(145,94,255,0.1)] border border-[rgba(145,94,255,0.2)] text-white/70 transition-all duration-300 hover:bg-[rgba(145,94,255,0.2)] hover:border-[#915eff] hover:text-white hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(145,94,255,0.1)] text-center">
          <p className="text-white/50 text-sm flex items-center justify-center gap-1 flex-wrap">
            © {currentYear} Your Name. Made with <Heart size={14} className="text-[#ff006e] inline-block animate-pulse" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
