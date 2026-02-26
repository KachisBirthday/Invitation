const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");

// WhatsApp + Calendar (same as before)
const whatsappNumber = "2347034768479"; // no +
const message = encodeURIComponent("Hello, I’m confirming my attendance for Kachi’s 1st birthday. 🎉");
document.getElementById("whatsAppLink").href = `https://wa.me/${whatsappNumber}?text=${message}`;

function buildICS() {
  // 19 April 2026, 1:00 PM WAT (UTC+1) => 12:00 PM UTC
  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kachi Birthday//Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@kachisbirthday
DTSTAMP:20260201T000000Z
DTSTART:20260419T120000Z
DTEND:20260419T150000Z
SUMMARY:Kachi’s 1st Birthday Celebration
LOCATION:20b Ekulu Avenue, GRA, Enugu (DSTV Office, Opposite Veronica Suites)
DESCRIPTION:Come dressed in your most colourful & festive attire. RSVP: 0703 476 8479
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar" });
  document.getElementById("calendarLink").href = URL.createObjectURL(blob);
}
buildICS();

// ===== Background balloons generator (Canva vibe) =====
const bg = document.querySelector(".bg-balloons");
const colors = ["#ffd166", "#4cc9f0", "#ff4d7d", "#7cf7c6", "#ffffff"];

function makeBalloons(count = 18){
  bg.innerHTML = "";
  for(let i=0;i<count;i++){
    const b = document.createElement("span");
    const w = 56 + Math.random() * 42;
    b.style.width = `${w}px`;
    b.style.height = `${w * 1.25}px`;
    b.style.left = `${Math.random() * 100}%`;
    b.style.top = `${Math.random() * 100}%`;
    b.style.opacity = `${0.35 + Math.random() * 0.55}`;
    b.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    b.style.animationDelay = `${Math.random() * 2.2}s`;
    bg.appendChild(b);
  }
}
makeBalloons(window.innerWidth < 520 ? 12 : 18);

window.addEventListener("resize", () => {
  makeBalloons(window.innerWidth < 520 ? 12 : 18);
});

// ===== Confetti burst =====
const confettiLayer = document.createElement("canvas");
confettiLayer.className = "confetti";
document.body.appendChild(confettiLayer);
const ctx = confettiLayer.getContext("2d");

function resizeCanvas(){
  confettiLayer.width = window.innerWidth * devicePixelRatio;
  confettiLayer.height = window.innerHeight * devicePixelRatio;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];

function burst(){
  const palette = ["#ff4d7d","#ffd166","#4cc9f0","#7cf7c6","#ffffff"];
  const count = 180;
  confetti = Array.from({ length: count }, () => ({
    x: (Math.random() * window.innerWidth) * devicePixelRatio,
    y: (-30) * devicePixelRatio,
    vx: (Math.random() - 0.5) * 5 * devicePixelRatio,
    vy: (Math.random() * 3 + 2.5) * devicePixelRatio,
    r: (Math.random() * 7 + 3) * devicePixelRatio,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.25,
    c: palette[Math.floor(Math.random() * palette.length)],
    life: Math.random() * 130 + 90
  }));
}

function tick(){
  ctx.clearRect(0,0,confettiLayer.width,confettiLayer.height);
  confetti.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vy *= 1.01;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
    ctx.restore();
  });
  confetti = confetti.filter(p => p.life > 0 && p.y < confettiLayer.height + 60);
  requestAnimationFrame(tick);
}
tick();

// ===== Open behavior (realistic timing) =====
function openEnvelope(){
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  burst();

  // Smooth scroll so user notices the letter rising
  setTimeout(() => {
    envelope.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 250);
}

openBtn.addEventListener("click", openEnvelope);
envelope.addEventListener("click", openEnvelope);
