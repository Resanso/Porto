import { useEffect, useRef, useState } from "react";

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize audio context only once
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Setup visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const audio = audioRef.current;

    canvas.width = window.innerWidth;
    canvas.height = 100;

    if (!audioContextRef.current || !audio) return;

    const setupAudio = () => {
      if (sourceRef.current) return; // Prevent multiple connections

      const analyser = audioContextRef.current.createAnalyser();
      sourceRef.current =
        audioContextRef.current.createMediaElementSource(audio);
      sourceRef.current.connect(analyser);
      analyser.connect(audioContextRef.current.destination);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        const barWidth = canvas.width / bufferLength;
        let x = 0;

        dataArray.forEach((value, i) => {
          const height = value / 2;
          const hue = (i / bufferLength) * 360;

          ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.5)`;
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - height, barWidth - 1, height, 5);
          ctx.fill();

          x += barWidth;
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    // Add click handler to start audio
    const handleClick = () => {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      if (!isPlaying) {
        setupAudio();
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    };

    // Add play button
    const playButton = document.createElement("button");
    playButton.textContent = "🎵";
    playButton.className =
      "fixed bottom-4 right-4 z-50 p-3 rounded-full bg-navy-light text-neon-cyan hover:bg-navy-lighter transition-colors";
    document.body.appendChild(playButton);
    playButton.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      playButton.removeEventListener("click", handleClick);
      playButton.remove();
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none z-20">
      <canvas ref={canvasRef} className="w-full opacity-50" />
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default AudioVisualizer;
