const envelopeBtn = document.getElementById("envelopeBtn");
const screenInvite = document.getElementById("screen-invite");
const screenLetter = document.getElementById("screen-letter");
const backBtn = document.getElementById("backBtn");

const phone = "+2347034768479"; // change if needed
const whatsappNumber = "2347034768479"; // WhatsApp needs country code, no +
const message = encodeURIComponent(
  "Hello, I’m confirming my attendance for Kachi’s 1st birthday. 🎉"
);

document.getElementById("whatsAppLink").href =
  `https://wa.me/${whatsappNumber}?text=${message}`;

function buildICS() {
  // 19 April 2026, 1:00 PM Nigeria (Africa/Lagos is UTC+1)
  // We’ll store as UTC for broad compatibility:
  // 1:00 PM WAT (UTC+1) = 12:00 PM UTC
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
  const a = document.getElementById("calendarLink");
  a.href = url;
}

buildICS();

envelopeBtn.addEventListener("click", () => {
  envelopeBtn.classList.add("open");
  setTimeout(() => {
    screenInvite.classList.remove("active");
    screenLetter.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 650);
});

backBtn.addEventListener("click", () => {
  screenLetter.classList.remove("active");
  screenInvite.classList.add("active");
  envelopeBtn.classList.remove("open");
});
