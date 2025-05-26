function launchConfetti() {
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.width = window.innerWidth + 'px';
  confettiCanvas.style.height = window.innerHeight + 'px';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '9999';
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  document.body.appendChild(confettiCanvas);
  const ctx = confettiCanvas.getContext('2d');

  const confettiColors = ['#00ff66', '#0c9200', '#00c6ff', '#0072ff', '#fff', '#b0ffd7'];
  const confettiCount = 120;
  const confetti = [];
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: 6 + Math.random() * 8,
      d: 2 + Math.random() * 2,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      shrink: 1
    });
  }

  let frame = 0;
  const maxFrames = 220;
  function drawConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      ctx.save();
      ctx.globalAlpha = Math.max(0, c.shrink);
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r * c.shrink, c.r * 0.6 * c.shrink, c.tilt, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      ctx.restore();
    }
    updateConfetti();
    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(drawConfetti);
    } else {
      confettiCanvas.remove();
    }
  }

  function updateConfetti() {
    for (let i = 0; i < confetti.length; i++) {
      const c = confetti[i];
      c.y += c.d + Math.sin(frame / 10 + i);
      c.x += Math.sin(frame / 15 + i) * 2;
      c.tiltAngle += c.tiltAngleIncremental;
      c.tilt = Math.sin(c.tiltAngle) * 10;
      if (frame > maxFrames * 0.5) {
        c.shrink -= 0.012;
        if (c.shrink < 0) c.shrink = 0;
      }
      if (c.y > confettiCanvas.height + 20) {
        c.y = Math.random() * -20;
        c.x = Math.random() * confettiCanvas.width;
        c.shrink = 1;
      }
    }
  }
  drawConfetti();
}

window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.select-button').forEach(btn => {
    btn.addEventListener('click', launchConfetti);
  });
}); 