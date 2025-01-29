import { useEffect, useRef } from "react";

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const audio = audioRef.current;

    canvas.width = window.innerWidth;
    canvas.height = 100;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
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

    audio.play();
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      audioContext.close();
    };
  }, []);

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
