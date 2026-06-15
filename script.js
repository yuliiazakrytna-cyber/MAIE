/* ============================================================
   OPERATION: LONDON — interactive logic
   ============================================================ */

const AGENT = "CIARA";

/* ---------- 1. BOOT SEQUENCE ---------- */
const bootLines = [
  "> establishing secure uplink to VAUXHALL CROSS...",
  "> handshake .......... [OK]",
  "> decrypting channel AES-256 .......... [OK]",
  "> geolocating asset .......... LONDON, UK",
  "> loading case file 007-LDN .......... [OK]",
  "> biometric scan .......... MATCH FOUND",
  "> WELCOME BACK, AGENT.",
  "",
];

const bootEl = document.getElementById("bootlog");
const authEl = document.getElementById("auth");
let li = 0, ci = 0;

function typeBoot() {
  if (li >= bootLines.length) {
    authEl.classList.remove("hidden");
    document.getElementById("agentname").focus();
    return;
  }
  const line = bootLines[li];
  if (ci <= line.length) {
    bootEl.textContent = bootLines.slice(0, li).join("\n") +
      (li ? "\n" : "") + line.slice(0, ci) + "█";
    ci++;
    setTimeout(typeBoot, line.length ? 18 : 200);
  } else {
    bootEl.textContent = bootLines.slice(0, li + 1).join("\n");
    li++; ci = 0;
    setTimeout(typeBoot, 160);
  }
}
window.addEventListener("load", () => setTimeout(typeBoot, 400));

/* ---------- AUTH ---------- */
function authenticate() {
  const input = document.getElementById("agentname");
  // any name works — we welcome her as Ciara regardless
  const typed = input.value.trim();
  if (typed) {
    const hero = document.getElementById("hero-agent");
    if (typed.length <= 18) hero.textContent = "AGENT " + typed.toUpperCase();
  }
  document.getElementById("terminal").classList.add("hidden");
  const app = document.getElementById("app");
  app.classList.remove("hidden");
  window.scrollTo(0, 0);
  startClock();
  typeBrief();
}
document.getElementById("authbtn").addEventListener("click", authenticate);
document.getElementById("agentname").addEventListener("keydown", (e) => {
  if (e.key === "Enter") authenticate();
});

/* ---------- 2. CLOCK ---------- */
function startClock() {
  const el = document.getElementById("clock");
  setInterval(() => {
    const now = new Date();
    const t = now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour12: false });
    el.textContent = t;
  }, 1000);
}

/* ---------- 3. BRIEFING TYPEWRITER ---------- */
const briefMsg =
  "Agent Ciara — your assignment is London. Eight landmarks across the capital " +
  "each conceal a fragment of intelligence. Recover all five active CLUES, " +
  "decrypt the intercepted transmission, and report to the SIS building for " +
  "final orders. Trust no pigeon. Tip your taxi driver. And whatever you do… " +
  "look like you belong. This is the one mission only YOU can complete.";

function typeBrief() {
  const el = document.getElementById("brief-text");
  let i = 0;
  el.textContent = "";
  (function step() {
    if (i <= briefMsg.length) {
      el.textContent = briefMsg.slice(0, i);
      i += 2;
      setTimeout(step, 22);
    }
  })();
}

/* ---------- 4. DOSSIER FLIP ---------- */
const dCard = document.querySelector(".dossier-card");
dCard.addEventListener("click", () => dCard.classList.toggle("flipped"));
dCard.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dCard.classList.toggle("flipped"); }
});

/* ---------- 5. CAESAR CIPHER ---------- */
const PLAIN = "MEET ME UNDER BIG BEN AT NOON";
const CORRECT_SHIFT = 7; // displayed cipher uses +7; user must apply -7 to read
function caesar(str, shift) {
  return str.replace(/[A-Z]/g, (c) =>
    String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26 + 26) % 26 + 65)
  );
}
const cipherText = caesar(PLAIN, CORRECT_SHIFT); // the intercepted (encrypted) message
let shift = 0;
const outEl = document.getElementById("cipher-out");
const shiftValEl = document.getElementById("shift-val");
const statusEl = document.getElementById("cipher-status");

function renderCipher() {
  // applying the inverse shift to the displayed text
  outEl.textContent = caesar(cipherText, -shift);
  shiftValEl.textContent = shift;
  if (shift === CORRECT_SHIFT) {
    statusEl.textContent = "✅ DECRYPTED — message recovered.";
    statusEl.classList.add("solved");
    registerClue("cipher");
  } else {
    statusEl.textContent = "Awaiting decryption…";
    statusEl.classList.remove("solved");
  }
}
document.getElementById("shift-up").addEventListener("click", () => {
  shift = (shift + 1) % 26; renderCipher();
});
document.getElementById("shift-down").addEventListener("click", () => {
  shift = (shift + 25) % 26; renderCipher();
});
renderCipher();

/* ---------- 6. LONDON MAP / LOCATIONS ---------- */
const LOCATIONS = {
  bigben: {
    icon: "🕰️", title: "BIG BEN & WESTMINSTER",
    body: "The Great Clock of Westminster has kept time since 1859. Its bongs were once broadcast nightly to confirm Britain hadn't been invaded. A reliable rendezvous point — it's literally never late.",
    clue: "CLUE 1: \"The hands point home at twelve.\"", isClue: true,
  },
  eye: {
    icon: "🎡", title: "THE LONDON EYE",
    body: "135 metres tall, 32 capsules — one for each London borough. On a clear day you can see 40 km. Excellent for surveillance. Terrible for hiding.",
    clue: "CLUE 2: \"Rise above the river to see the whole board.\"", isClue: true,
  },
  baker: {
    icon: "🔍", title: "221B BAKER STREET",
    body: "Home of the world's most famous fictional detective. If anyone understands deduction, observation and a good disguise, it's the ghost who lives here. Take notes, Agent.",
    clue: "CLUE 3: \"Elementary — the answer was in the details all along.\"", isClue: true,
  },
  tower: {
    icon: "🌉", title: "TOWER BRIDGE",
    body: "Often mistaken for London Bridge (which is far more boring). Its bascules still lift around 800 times a year for passing ships. Cross at the right moment and you'll lose any tail.",
    clue: "CLUE 4: \"When the bridge splits, the path opens.\"", isClue: true,
  },
  mi6: {
    icon: "🏢", title: "SIS BUILDING — VAUXHALL CROSS",
    body: "The real-life home of MI6 (the Secret Intelligence Service), on the south bank of the Thames since 1994. Famously blown up in the movies. Still standing in real life — please keep it that way.",
    clue: "CLUE 5: \"All roads in this dossier lead back here. Report for final orders.\"", isClue: true,
  },
  phonebox: {
    icon: "📞", title: "THE RED PHONE BOX (K6)",
    body: "Designed by Sir Giles Gilbert Scott in 1936. Once 70,000 of them dotted Britain. The perfect spot for a clandestine call — or a very British selfie. No clue here, just excellent cover.",
    clue: "", isClue: false,
  },
  cab: {
    icon: "🚕", title: "THE BLACK CAB",
    body: "London cabbies must pass 'The Knowledge' — memorising 25,000 streets and 100,000 landmarks. They know the city better than any GPS. And they never forget a face. Tip well.",
    clue: "", isClue: false,
  },
  tube: {
    icon: "🚇", title: "MIND THE GAP — THE UNDERGROUND",
    body: "The world's oldest underground railway (1863), 272 stations, 11 lines. The fastest way to vanish into the city. Stand on the right of the escalator or risk blowing your cover.",
    clue: "", isClue: false,
  },
};

const cluesFound = new Set();
const TOTAL_CLUES = 5;

function registerClue(id) {
  if (cluesFound.has(id)) return;
  cluesFound.add(id);
  const n = Math.min(cluesFound.size, TOTAL_CLUES);
  document.getElementById("clue-count").textContent = n;
  document.getElementById("progress-fill").style.width = (n / TOTAL_CLUES * 100) + "%";
  if (cluesFound.size >= TOTAL_CLUES) {
    document.getElementById("accept-msg").textContent =
      "All clues recovered. Decryption complete. You're cleared for the field, Agent.";
  }
}

const modal = document.getElementById("modal");
document.querySelectorAll(".loc").forEach((btn) => {
  btn.addEventListener("click", () => {
    const data = LOCATIONS[btn.dataset.loc];
    document.getElementById("modal-icon").textContent = data.icon;
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-body").textContent = data.body;
    const clueWrap = document.getElementById("modal-clue-wrap");
    const stamp = document.getElementById("modal-stamp");
    if (data.isClue) {
      clueWrap.classList.remove("hidden");
      document.getElementById("modal-clue").textContent = data.clue;
      stamp.textContent = "DECLASSIFIED";
      btn.classList.add("found");
      registerClue(btn.dataset.loc);
    } else {
      clueWrap.classList.add("hidden");
      stamp.textContent = "NO INTEL";
    }
    modal.classList.remove("hidden");
  });
});
function closeModal() { modal.classList.add("hidden"); }
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---------- 7. ACCEPT + CONFETTI ---------- */
const finalEl = document.getElementById("final");
document.getElementById("accept-btn").addEventListener("click", () => {
  document.getElementById("final-text").textContent =
    cluesFound.size >= TOTAL_CLUES
      ? "Flawless work. Every clue recovered, every code cracked. The city is yours."
      : "We'll brief you on the rest when you land. Some clues are best found in person.";
  finalEl.classList.remove("hidden");
  launchConfetti();
});
document.getElementById("final-close").addEventListener("click", () => {
  finalEl.classList.add("hidden");
  stopConfetti();
});

/* ---------- CONFETTI (canvas, no deps) ---------- */
let confettiRAF = null;
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", resize);
  const colors = ["#c8a24a", "#e0c374", "#b6202a", "#ffffff", "#3ad07a"];
  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: 6 + Math.random() * 8,
    h: 8 + Math.random() * 10,
    c: colors[(Math.random() * colors.length) | 0],
    sp: 1.5 + Math.random() * 3.5,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2,
    sway: Math.random() * 2,
  }));
  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.sp;
      p.x += Math.sin(p.y / 30) * p.sway;
      p.rot += p.vr;
      if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    confettiRAF = requestAnimationFrame(frame);
  }
  frame();
}
function stopConfetti() { if (confettiRAF) cancelAnimationFrame(confettiRAF); }
