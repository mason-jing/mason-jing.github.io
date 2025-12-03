import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send } from 'lucide-react';
import EarthCanvas from '../canvas/Earth';

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

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Demo form submission - replace with actual email service
    setTimeout(() => {
      setLoading(false);
      alert('Thank you! I will get back to you as soon as possible.');
      setForm({
        name: '',
        email: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p className="text-sm uppercase tracking-widest text-white/50 mb-2">Get in touch</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white font-black mb-8">Contact.</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-white font-medium">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  className="bg-[rgba(21,16,48,0.8)] border border-[rgba(145,94,255,0.2)] rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#915eff] focus:shadow-[0_0_0_3px_rgba(145,94,255,0.1)]"
                  required
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-white font-medium">Your Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email?"
                  className="bg-[rgba(21,16,48,0.8)] border border-[rgba(145,94,255,0.2)] rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 focus:border-[#915eff] focus:shadow-[0_0_0_3px_rgba(145,94,255,0.1)]"
                  required
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-white font-medium">Your Message</span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  className="bg-[rgba(21,16,48,0.8)] border border-[rgba(145,94,255,0.2)] rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 resize-y min-h-[150px] focus:border-[#915eff] focus:shadow-[0_0_0_3px_rgba(145,94,255,0.1)]"
                  required
                />
              </label>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#915eff] to-[#ff006e] border-0 rounded-lg px-8 py-4 text-white font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(145,94,255,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(145,94,255,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send size={18} className={`transition-transform duration-200 ${!loading && 'group-hover:translate-x-1'}`} />
              </button>
            </form>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-white/70">
                <Mail className="text-[#915eff] flex-shrink-0" />
                <span>your.email@example.com</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <MapPin className="text-[#915eff] flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="min-h-[500px] lg:min-h-0"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
