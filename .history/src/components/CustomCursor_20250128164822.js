import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion"; // Tambahkan useSpring

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Tambahkan spring animation untuk smooth movement
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Update spring values
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y]); // Tambahkan dependencies

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 bg-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: x.to((curr) => curr - 8),
          y: y.to((curr) => curr - 8),
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 250,
            damping: 25,
          },
        }}
      />
      <motion.div
        className="fixed w-8 h-8 border-2 border-neon-cyan rounded-full pointer-events-none z-[9999]"
        style={{
          x: x.to((curr) => curr - 16),
          y: y.to((curr) => curr - 16),
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 20,
          },
        }}
      />
    </>
  );
};

export default CustomCursor;
