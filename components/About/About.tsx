import { motion } from 'motion/react';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';

const services = [
  {
    title: 'Frontend Development',
    icon: Code2,
    description: 'Building responsive and interactive user interfaces with React, TypeScript, and modern web technologies.',
  },
  {
    title: 'UI/UX Design',
    icon: Palette,
    description: 'Designing beautiful and intuitive user experiences with attention to detail and accessibility.',
  },
  {
    title: 'Backend Development',
    icon: Rocket,
    description: 'Creating scalable server-side applications and RESTful APIs with Node.js and databases.',
  },
  {
    title: 'Performance Optimization',
    icon: Zap,
    description: 'Optimizing web applications for speed, efficiency, and excellent user experience.',
  },
];

const fadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn('', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Introduction</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-black mb-8">Overview.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn('', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-lg text-white/70 leading-relaxed max-w-3xl mb-12"
        >
          I'm a skilled software developer with experience in TypeScript and JavaScript,
          and expertise in frameworks like React, Node.js, and Three.js. I'm a quick learner
          and collaborate closely with clients to create efficient, scalable, and user-friendly
          solutions that solve real-world problems. Let's work together to bring your ideas to life!
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeIn('right', index * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="relative bg-gradient-to-br from-[rgba(145,94,255,0.1)] to-[rgba(255,0,110,0.05)] border border-[rgba(145,94,255,0.2)] rounded-2xl p-8 transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(145,94,255,0.3)] group"
            >
              <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-[#915eff] to-[#ff006e] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />
              
              <service.icon className="text-[#915eff] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:text-[#ff006e]" size={40} />
              <h3 className="text-2xl text-white mb-4 font-bold">{service.title}</h3>
              <p className="text-base text-white/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}