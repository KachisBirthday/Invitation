const envelopeBtn = document.getElementById("envelopeBtn");
const screenInvite = document.getElementById("screen-invite");
const screenLetter = document.getElementById("screen-letter");
const backBtn = document.getElementById("backBtn");

const whatsappNumber = "2347034768479"; // no +
const message = encodeURIComponent(
  "Hello, I’m confirming my attendance for Kachi’s 1st birthday. 🎉"
);
document.getElementById("whatsAppLink").href =
  `https://wa.me/${whatsappNumber}?text=${message}`;

// Add cute balloon DOM elements (replaces plain before/after balloons)
function buildBalloons() {
  const left = document.querySelector(".balloons-left");
  const right = document.querySelector(".balloons-right");
  [left, right].forEach(el => {
    el.innerHTML = `
      <div class="balloon b1"></div>
      <div class="balloon b2"></div>
      <div class="balloon b3"></div>
      <div class="string"></div>
    `;
  });
}
buildBalloons();

// Calendar file (same as before)
function buildICS() {
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
  const url = URL.createObjectURL(blob);
  document.getElementById("calendarLink").href = url;
}
buildICS();

/* Confetti */
const confettiLayer = document.createElement("canvas");
confettiLayer.className = "confetti";
document.body.appendChild(confettiLayer);
const ctx = confettiLayer.getContext("2d");

function resize() {
  confettiLayer.width = window.innerWidth * devicePixelRatio;
  confettiLayer.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener("resize", resize);
resize();

let confetti = [];
function burst() {
  const colors = ["#ff4d7d","#ffd166","#4cc9f0","#ffffff"];
  const count = 140;
  confetti = Array.from({ length: count }, () => ({
    x: Math.random() * confettiLayer.width,
    y: -20 * devicePixelRatio,
    vx: (Math.random() - 0.5) * 4 * devicePixelRatio,
    vy: (Math.random() * 3 + 2) * devicePixelRatio,
    r: (Math.random() * 6 + 3) * devicePixelRatio,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2,
    c: colors[Math.floor(Math.random() * colors.length)],
    life: Math.random() * 120 + 80
  }));
}

function tick() {
  ctx.clearRect(0,0,confettiLayer.width,confettiLayer.height);
  confetti.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.vy *= 1.005;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.4);
    ctx.restore();
  });
  confetti = confetti.filter(p => p.life > 0 && p.y < confettiLayer.height + 40);
  requestAnimationFrame(tick);
}
tick();

/* Cinematic open */
envelopeBtn.addEventListener("click", () => {
  envelopeBtn.classList.add("open");
  burst();

  // slight pause like a "reveal"
  setTimeout(() => {
    screenInvite.classList.remove("active");
    screenLetter.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 750);
});

backBtn.addEventListener("click", () => {
  screenLetter.classList.remove("active");
  screenInvite.classList.add("active");
  envelopeBtn.classList.remove("open");
});
