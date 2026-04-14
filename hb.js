const text = "You are the best thing that ever happened to me. I love you so much ❤️ Happy Birthday! 🎉🎂. I can't imagine my life without you! You are amazing! I love you so much!";
let i = 0;
const speed = 40;

function typeWriter() {
  if (i < text.length) {
    const span = document.createElement("span");
    span.classList.add("glow");
    span.textContent = text.charAt(i);

    document.getElementById("typing").appendChild(span);

    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

// Slideshow
let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("slides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000);
}
showSlides();

// Countdown
const countdownDate = new Date("Apr 15, 2026 00:00:00").getTime();
const countdownFunction = setInterval(function () {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    "Countdown: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerHTML = "It's her Birthday 🎉";
  }
}, 1000);

// Floating Hearts Animation
// ===== Romantic Glowing Hearts + Text Shape =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

// Create text shape points
function getTextPoints(text) {
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  tempCtx.fillStyle = "white";
  tempCtx.font = "bold 80px Arial";
  tempCtx.textAlign = "center";
  tempCtx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
  const points = [];

  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      if (imageData.data[index + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

const textPoints = getTextPoints("I LOVE YOU");

// Create glowing hearts continuously
function createHearts() {
  setInterval(() => {
    const point = textPoints[Math.floor(Math.random() * textPoints.length)];
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      targetX: point.x,
      targetY: point.y,
      size: Math.random() * 8 + 6,
      speed: Math.random() * 0.05 + 0.02
    });
  }, 100);
}

// Draw glowing heart
function drawHeart(x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size, x, y + size * 2);
  ctx.bezierCurveTo(x + size * 2, y + size, x + size, y - size, x, y);
  ctx.fill();
}

// Animate hearts
function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((h, index) => {
    // Move towards text position
    h.x += (h.targetX - h.x) * h.speed;
    h.y += (h.targetY - h.y) * h.speed;

    // Glow effect
    ctx.shadowColor = "pink";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "rgba(255, 105, 180, 0.9)";

    drawHeart(h.x, h.y, h.size);

    // Remove if settled
    if (Math.abs(h.x - h.targetX) < 1 && Math.abs(h.y - h.targetY) < 1) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animateHearts);
}

// Start everything
function startCelebration() {
  document.getElementById("music").play();
  createHearts();
  animateHearts();
}
