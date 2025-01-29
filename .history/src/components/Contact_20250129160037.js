import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi"; // Add this import at the top

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <section id="contact" className="py-32 bg-dark-blue relative">
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-neon-cyan font-mono">04. What's Next?</span>
          <h2 className="text-5xl font-mono text-light-slate mt-4">
            Get In Touch
          </h2>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-mono text-lightest-slate mb-6 md:mb-16 text-center"
        >
          <span className="text-neon-cyan font-normal">04.</span> Get In Touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass rounded-lg p-3 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-mono text-light-slate mb-1 md:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-navy-light/50 border border-navy-lighter rounded-lg px-2 md:px-3 py-1.5 md:py-3 text-sm md:text-base text-light-slate focus:outline-none focus:border-neon-cyan transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-mono text-light-slate mb-1 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-navy-light/50 border border-navy-lighter rounded-lg px-2 md:px-3 py-1.5 md:py-3 text-sm md:text-base text-light-slate focus:outline-none focus:border-neon-cyan transition-colors"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs md:text-sm font-mono text-light-slate mb-1 md:mb-2">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full bg-navy-light/50 border border-navy-lighter rounded-lg px-2 md:px-3 py-1.5 md:py-3 text-sm md:text-base text-light-slate focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="flex items-center gap-1.5 md:gap-2 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan px-3 md:px-6 py-1.5 md:py-3 rounded-lg hover:bg-neon-cyan/10 transition-colors group"
              >
                <span className="text-sm md:text-base font-mono">
                  Send Message
                </span>
                <FiSend className="text-base md:text-xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
