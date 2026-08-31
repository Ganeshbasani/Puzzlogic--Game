import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  size: number;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
}

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const styles = getComputedStyle(document.documentElement);
    const colors = [
      styles.getPropertyValue("--color-primary").trim(),
      styles.getPropertyValue("--color-accent").trim(),
      styles.getPropertyValue("--color-purple").trim(),
      styles.getPropertyValue("--color-indigo").trim(),
      styles.getPropertyValue("--color-light-blue").trim(),
      styles.getPropertyValue("--color-pale-blue").trim(),
      styles.getPropertyValue("--color-lavender").trim(),
    ].filter(Boolean);

    const particles: Particle[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      const maxLife = 120 + Math.random() * 80;
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)] || styles.getPropertyValue("--color-primary").trim(),
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        life: 0,
        maxLife,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rotation += p.rotSpeed;
        p.life++;
        if (p.life < p.maxLife) {
          alive++;
          const alpha = 1 - p.life / p.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        }
      }
      if (alive > 0) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default Confetti;
