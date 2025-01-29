import { motion } from "framer-motion";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-mono text-lightest-slate mb-8 md:mb-16 text-center"
        >
          <span className="text-neon-cyan font-normal">04.</span> Get In Touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass rounded-lg p-4 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono text-light-slate mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-navy-light/50 border border-navy-lighter rounded-lg px-3 py-2 md:py-3 text-light-slate focus:outline-none focus:border-neon-cyan transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-light-slate mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-navy-light/50 border border-navy-lighter rounded-lg px-3 py-2 md:py-3 text-light-slate focus:outline-none focus:border-neon-cyan transition-colors"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-mono text-light-slate mb-2">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full bg-navy-light/50 border border-navy-lighter rounded-lg px-3 py-2 md:py-3 text-light-slate focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center gap-2 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-neon-cyan/10 transition-colors group"
              >
                <span className="text-sm md:text-base font-mono">
                  Send Message
                </span>
                <FiSend className="text-lg md:text-xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate text-sm md:text-base mt-6 md:mt-8"
        >
          You can also reach me at{" "}
          <a
            href="mailto:resanso99@gmail.com"
            className="text-neon-cyan hover:underline"
          >
            resanso99@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
