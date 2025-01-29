import { useState } from "react";
import { motion } from "framer-motion";

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
    <section id="contact" className="py-16 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-mono text-light-slate mb-4 sm:mb-8">
          <span className="text-neon-cyan">04.</span> Get In Touch
        </h2>

        <p className="text-sm sm:text-lg text-slate mb-6 sm:mb-10 max-w-2xl mx-auto">
          {/* ...existing text... */}
        </p>

        {/* Contact form container */}
        <div className="bg-navy-light/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-navy-lighter/50 border border-slate/20 rounded-lg focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan text-light-slate placeholder-slate/50"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-navy-lighter/50 border border-slate/20 rounded-lg focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan text-light-slate placeholder-slate/50"
              />
            </div>
            <textarea
              placeholder="Message"
              rows="5"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-navy-lighter/50 border border-slate/20 rounded-lg focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan text-light-slate placeholder-slate/50"
            ></textarea>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan text-sm sm:text-base font-mono rounded-lg hover:bg-neon-cyan/10 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
