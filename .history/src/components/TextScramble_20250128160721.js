import { useState, useEffect } from "react";

const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono text-neon-cyan">{displayText}</span>;
};

export default TextScramble;
