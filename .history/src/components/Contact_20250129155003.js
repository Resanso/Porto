import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

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
    <section
      id="contact"
      className="relative min-h-[80vh] sm:min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightest-slate">
            Get In Touch
          </h2>

          <p className="text-sm sm:text-base text-slate max-w-lg mx-auto leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to
            you!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 
                bg-glass-gradient border border-neon-cyan/30 text-neon-cyan 
                text-sm sm:text-base font-mono rounded-lg hover:bg-neon-cyan/10 
                transition-all duration-300"
            >
              <FiMail className="text-lg sm:text-xl" />
              <span>Say Hello</span>
            </a>
          </motion.div>

          <div className="mt-12 sm:mt-16">
            <p className="text-xs sm:text-sm text-slate/60">
              Built with React & Tailwind CSS
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
