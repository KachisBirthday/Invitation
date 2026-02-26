const envelopeBtn = document.getElementById("envelopeBtn");
const screenInvite = document.getElementById("screen-invite");
const screenLetter = document.getElementById("screen-letter");
const backBtn = document.getElementById("backBtn");

const whatsappNumber = "2347034768479";
const message = encodeURIComponent("Hello, I’m confirming my attendance for Kachi’s 1st birthday. 🎉");
document.getElementById("whatsAppLink").href = `https://wa.me/${whatsappNumber}?text=${message}`;

// Background balloons like Canva (random scatter)
const bg = document.querySelector(".bg-balloons");
const colors = ["--yellow","--blue","--pink","--mint"];
function makeBalloons(count = 16){
  bg.innerHTML = "";
  for(let i=0;i<count;i++){
    const b = document.createElement("span");
    const c = colors[Math.floor(Math.random()*colors.length)];
    b.style.backgroundColor = `var(${c})`;
    b.style.left = `${Math.random()*100}%`;
    b.style.top = `${Math.random()*100}%`;
    b.style.transform = `translateY(${Math.random()*18}px)`;
    b.style.animationDelay = `${Math.random()*2.2}s`;
    b.style.opacity = `${0.45 + Math.random()*0.45}`;
    // sizes
    const w = 58 + Math.random()*36;
    b.style.width = `${w}px`;
    b.style.height = `${w*1.25}px`;
    bg.appendChild(b);
  }
}
makeBalloons(window.innerWidth < 520 ? 12 : 18);

// Confetti
const confettiLayer = document.createElement("canvas");
confettiLayer.className = "confetti";
document.body.appendChild(confettiLayer);
const ctx = confettiLayer.getContext("2d");

function resize() {
  confettiLayer.width = window.innerWidth * devicePixelRatio;
  confettiLayer.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener("resize", () => { resize(); makeBalloons(window.innerWidth < 520 ? 12 : 18); });
resize();

let confetti = [];
function burst() {
  const palette = ["#ff4d7d","#ffd166","#4cc9f0","#7cf7c6","#ffffff"];
  const count = 170;
  confetti = Array.from({ length: count }, () => ({
    x: (window.innerWidth * Math.random()) * devicePixelRatio,
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

function tick() {
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

// Calendar
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
  document.getElementById("calendarLink").href = URL.createObjectURL(blob);
}
buildICS();

// Realistic open: flap partially opens, letter slides, then page reveals
envelopeBtn.addEventListener("click", () => {
  envelopeBtn.classList.add("open");
  burst();

  // keep realism: show partial opening a bit longer before switching screens
  setTimeout(() => {
    screenInvite.classList.remove("active");
    screenLetter.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1050);
});

backBtn.addEventListener("click", () => {
  screenLetter.classList.remove("active");
  screenInvite.classList.add("active");
  envelopeBtn.classList.remove("open");
});
