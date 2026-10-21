// A small canvas particle field. It uses a limited number of particles
// to keep the effect relatively light on modest hardware.
(() => {
  const canvas = document.querySelector(".scene__particles");
  const context = canvas.getContext("2d", { alpha: true });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!context) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let animationFrame = 0;
  let lastFrameTime = 0;
  const particleCount = 42;
  const colors = ["147, 197, 253", "167, 139, 250", "196, 181, 253"];

  function resizeCanvas() {
    // Cap the pixel ratio so a high-DPI display doesn't create a huge canvas.
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.6 + Math.random() * 1.5,
      speed: 0.12 + Math.random() * 0.32,
      drift: (Math.random() - 0.5) * 0.18,
      alpha: 0.2 + Math.random() * 0.55,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  function drawFrame(timestamp = 0) {
    // Limit animation to roughly 30 FPS; enough for subtle background motion.
    if (timestamp - lastFrameTime < 33) {
      animationFrame = requestAnimationFrame(drawFrame);
      return;
    }
    lastFrameTime = timestamp;
    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      particle.y -= particle.speed;
      particle.x += particle.drift;

      if (particle.y < -5) {
        particle.y = height + 5;
        particle.x = Math.random() * width;
      }
      if (particle.x < -5) particle.x = width + 5;
      if (particle.x > width + 5) particle.x = -5;

      context.beginPath();
      context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }

    animationFrame = requestAnimationFrame(drawFrame);
  }

  function stopAnimation() {
    cancelAnimationFrame(animationFrame);
    context.clearRect(0, 0, width, height);
  }

  function updateMotionPreference() {
    if (reducedMotion.matches) {
      stopAnimation();
    } else {
      cancelAnimationFrame(animationFrame);
      lastFrameTime = 0;
      animationFrame = requestAnimationFrame(drawFrame);
    }
  }

  resizeCanvas();
  updateMotionPreference();
  window.addEventListener("resize", resizeCanvas, { passive: true });
  reducedMotion.addEventListener("change", updateMotionPreference);
})();
