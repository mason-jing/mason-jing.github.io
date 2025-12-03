import { motion } from 'motion/react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  points: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    date: '2022 - Present',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies',
      'Collaborating with cross-functional teams including designers, product managers, and other developers',
      'Implementing responsive design and ensuring cross-browser compatibility',
      'Participating in code reviews and providing constructive feedback to other developers',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Startup Inc',
    date: '2020 - 2022',
    points: [
      'Built modern web applications with React, TypeScript, and Redux',
      'Optimized application performance and improved load times by 40%',
      'Worked closely with UX designers to implement pixel-perfect designs',
      'Mentored junior developers and conducted technical interviews',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Digital Agency',
    date: '2018 - 2020',
    points: [
      'Developed responsive websites and web applications for various clients',
      'Implemented SEO best practices and improved site rankings',
      'Collaborated with design team to create engaging user experiences',
      'Maintained and updated existing client websites',
    ],
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

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-2">What I have done so far</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-black mb-8">Work Experience.</h2>
        </motion.div>

        <div className="mt-12">
          <VerticalTimeline lineColor="rgba(145, 94, 255, 0.3)">
            {experiences.map((experience, index) => (
              <VerticalTimelineElement
                key={index}
                contentStyle={{
                  background: 'rgba(21, 16, 48, 0.8)',
                  border: '1px solid rgba(145, 94, 255, 0.2)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
                contentArrowStyle={{
                  borderRight: '7px solid rgba(145, 94, 255, 0.3)',
                }}
                date={experience.date}
                dateClassName="text-white/50 font-medium opacity-90"
                iconStyle={{
                  background: 'linear-gradient(135deg, #915eff, #ff006e)',
                  boxShadow: '0 0 20px rgba(145, 94, 255, 0.6)',
                }}
                icon={
                  <div className="flex items-center justify-center w-full h-full text-white">
                    <Briefcase size={20} />
                  </div>
                }
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                  <p className="text-base text-white/50 mb-6 uppercase tracking-wider">{experience.company}</p>
                </div>

                <ul className="mt-4 list-none p-0">
                  {experience.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="relative pl-6 mb-3 text-white/70 leading-relaxed">
                      <span className="absolute left-0 text-[#915eff] text-xl">▹</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
}
