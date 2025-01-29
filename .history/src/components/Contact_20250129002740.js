import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useHasBeenViewed } from "../hooks/useHasBeenViewed";

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

  const sectionRef = useRef(null);
  const hasBeenViewed = useHasBeenViewed(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-dark-blue relative"
    >
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasBeenViewed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-neon-cyan font-mono">04. What's Next?</span>
          <h2 className="text-5xl font-mono text-light-slate mt-4">
            Get In Touch
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-6 bg-navy-light/50 p-8 rounded-lg backdrop-blur-sm border border-navy-lighter"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-mono text-light-slate"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-dark-blue/50 border border-navy-lighter text-light-slate 
                focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-mono text-light-slate"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-dark-blue/50 border border-navy-lighter text-light-slate 
                focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-colors h-32"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan font-mono 
              rounded-lg hover:border-neon-cyan/60 transition-colors relative overflow-hidden group"
            type="submit"
          >
            <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Send Message</span>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
