import { motion } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Project {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCode?: string;
  liveDemo?: string;
}

const projects: Project[] = [
  {
    name: 'Space Portfolio',
    description: 'A 3D space-themed portfolio website built with React, Three.js, and TypeScript. Features realistic Earth model and interactive animations.',
    tags: [
      { name: 'React', color: 'blue' },
      { name: 'TypeScript', color: 'purple' },
      { name: 'Three.js', color: 'pink' },
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    sourceCode: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard.',
    tags: [
      { name: 'React', color: 'blue' },
      { name: 'Node.js', color: 'green' },
      { name: 'MongoDB', color: 'purple' },
    ],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    sourceCode: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    name: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered responses using OpenAI API and WebSocket connections.',
    tags: [
      { name: 'React', color: 'blue' },
      { name: 'OpenAI', color: 'pink' },
      { name: 'Socket.io', color: 'purple' },
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    sourceCode: 'https://github.com',
  },
];

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-2">My work</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-black mb-8">Projects.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-lg text-white/70 leading-relaxed max-w-3xl mb-12"
        >
          Following projects showcase my skills and experience through real-world examples of my work.
          Each project is briefly described with links to code repositories and live demos. It reflects
          my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={fadeIn(index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="bg-[rgba(21,16,48,0.8)] border border-[rgba(145,94,255,0.2)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(145,94,255,0.3)] hover:border-[rgba(145,94,255,0.5)] group"
            >
              <div className="relative w-full h-64 overflow-hidden bg-black/30">
                <ImageWithFallback
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {project.sourceCode && (
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[rgba(145,94,255,0.2)] border-2 border-[#915eff] flex items-center justify-center text-white transition-all duration-200 hover:bg-[#915eff] hover:scale-110"
                      aria-label="View source code"
                    >
                      <Github size={24} />
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[rgba(145,94,255,0.2)] border-2 border-[#915eff] flex items-center justify-center text-white transition-all duration-200 hover:bg-[#915eff] hover:scale-110"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl text-white font-bold mb-3">{project.name}</h3>
                <p className="text-base text-white/70 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        tag.color === 'blue' ? 'text-[#61dafb] bg-[rgba(97,218,251,0.1)]' :
                        tag.color === 'purple' ? 'text-[#915eff] bg-[rgba(145,94,255,0.1)]' :
                        tag.color === 'pink' ? 'text-[#ff006e] bg-[rgba(255,0,110,0.1)]' :
                        'text-[#68d391] bg-[rgba(104,211,145,0.1)]'
                      }`}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
