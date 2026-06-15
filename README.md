# 🕵️ OPERATION: LONDON — Agent Dossier for Ciara

A spy & mystery themed, interactive webpage built for **Ciara** — a different
take on the "Mission London" page, this time as a classified MI6-style dossier.

> Classification: ULTRA · Case File 007-LDN · For the eyes of Agent Ciara only.

## What's inside

- **Secure terminal boot-up** — a typing access sequence with biometric "match found".
- **Mission briefing** from M, typed out live on a typewriter, with a live clue-tracker.
- **Agent dossier card** — tap to flip & declassify (with playfully redacted details).
- **Caesar cipher decoder** — spin the dial to crack an intercepted transmission.
- **London surveillance map** — 8 clickable landmarks (Big Ben, the London Eye,
  221B Baker Street, Tower Bridge, the SIS/MI6 building, a red phone box, a black
  cab and the Underground), each revealing real London trivia and hidden clues.
- **Q-Branch gadget kit** — tactical umbrella, Oyster card, emergency teabag…
- **"Accept the mission"** finale with a confetti celebration.

Recover all 5 clues + crack the cipher to fully clear Agent Ciara for the field.

## Theme & London attributes

Dark intelligence-agency aesthetic — gold & classified-red, scanlines, paper
dossiers, redaction bars, TOP SECRET stamps — paired with an SVG London skyline
and landmark icons throughout. Times shown in GMT / London time.

## Running it

No build step, no dependencies. Just open `index.html` in any browser:

```
open index.html        # macOS
xdg-open index.html    # Linux
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure & content |
| `styles.css` | Spy-dossier styling, skyline, animations |
| `script.js`  | Boot sequence, typewriter, cipher, map, confetti |
