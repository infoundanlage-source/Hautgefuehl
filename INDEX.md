# 📋 Index – Hautgefühl App GitHub-Ordner

**Alles, was du für den neuen Chat brauchst, ist hier.** Nutze diese Datei als Übersicht.

---

## 🗂 Struktur

```
hautgefuehl-app-github/
├── README.md                           👈 Hauptseite, Features, Tech Stack
├── PROJEKTSTAND.md                     👈 Detaillierter Status (was fertig, was offen)
├── NEXT_STEPS.md                       👈 Roadmap für Google-Integration (4 Phasen)
├── package.json                        👈 Node.js Dependencies
├── .gitignore                          👈 Was nicht zu Git gehört
│
├── src/
│   └── salon-app.jsx                   👈 **KOMPLETTE REACT APP** (single file, 187 KB)
│
├── docs/
│   ├── SETUP.md                        👈 Schritt-für-Schritt Anleitung (Google Sheets + Apps Script)
│   ├── GOOGLE_SHEETS_SCHEMA.md         👈 Datenbank-Design (Bookings, Customers, Promos, etc.)
│   └── APPS_SCRIPT_TEMPLATE.gs         👈 Backend-Code zum Kopieren (Google Apps Script)
│
└── transcripts/
    └── CHAT_HISTORY.txt                👈 **KOMPLETTER CHAT-VERLAUF** (alle Entscheidungen + Gründe)
```

---

## 📖 Was du wo findest

### 🎯 Schnelleinstieg
1. **README.md** – Features & Tech Stack (5 Min)
2. **NEXT_STEPS.md** – Was ist zu tun? (10 Min)
3. **docs/SETUP.md** – How-to Google-Integration (20 Min)

### 🔧 Für Entwickler
1. **src/salon-app.jsx** – Die komplette App
   - 187 KB
   - Single JSX-Datei
   - Ist ready-to-run (wenn auf Browser/Vercel deployed)
2. **docs/APPS_SCRIPT_TEMPLATE.gs** – Backend-Code
   - Kopieren → Google Apps Script → Deploy

### 📊 Für Datenbank-Setup
1. **docs/GOOGLE_SHEETS_SCHEMA.md** – Tabellen-Design
   - Bookings (Termine)
   - Customers (Kundendaten)
   - Promos (Aktionen)
   - Feedback
   - Settings

### 📝 Für Kontext
1. **PROJEKTSTAND.md** – Status quo
   - Was ist fertig? ✅
   - Was fehlt noch? 🔄
   - Wichtige Entscheidungen
2. **transcripts/CHAT_HISTORY.txt** – Kompletter Verlauf
   - Alle Diskussionen
   - Warum welche Entscheidung?
   - Alle Code-Iterationen

---

## 🚀 Typischer Workflow

### Szenario 1: "Ich will die App lokal testen"
```
1. src/salon-app.jsx anschauen
2. Als React-Komponente in Vite/CRA importieren
3. npm start
→ App läuft (Buchungen nur im RAM, kein Google-Backend)
```

### Szenario 2: "Ich will Google-Integration aufbauen"
```
1. NEXT_STEPS.md lesen (Roadmap)
2. docs/SETUP.md befolgen (Schritt-für-Schritt)
3. Google Sheets + Apps Script deployen
4. salon-app.jsx anpassen (fetch-Aufrufe)
→ Alles speichert sich jetzt in Google
```

### Szenario 3: "Ich will Details verstehen"
```
1. PROJEKTSTAND.md für Status
2. transcripts/CHAT_HISTORY.txt für Entscheidungen
3. docs/GOOGLE_SHEETS_SCHEMA.md für Datenmodell
→ Vollständiger Überblick
```

---

## 🎨 Design & Features (Quick Overview)

**Frontend:**
- ✅ React (single-file, no build needed if embedded)
- ✅ Material You Design (Android 17 style)
- ✅ Mobile-First (430px max)
- ✅ 4-Schritt Buchungsfluss
- ✅ Pro-Dashboard (5 Tabs)
- ✅ E-Mail-Vorschau + Google Calendar Link

**Backend (in Arbeit):**
- 🔄 Google Sheets (Datenbank)
- 🔄 Google Apps Script (Webhook)
- 🔄 Gmail (E-Mail-Versand)

**Geschäftsdaten (Echtdaten):**
- 3 Kategorien (Laser, Wimpern, Nägel)
- 3 Fachkräfte (Regina, Selma, Anna)
- ~20 Services mit Preisen
- Adresse: Hauptstraße 82, 34414 Warburg

---

## 💡 Was du brauchst für den neuen Chat

### Minimal (schneller Einstieg)
```
1. Diese Datei (INDEX)
2. salon-app.jsx (die App)
3. NEXT_STEPS.md (Roadmap)
```

### Standard (gutes Verständnis)
```
1. Diese Datei (INDEX)
2. salon-app.jsx
3. PROJEKTSTAND.md
4. NEXT_STEPS.md
5. docs/SETUP.md (wenn Google-Integration)
```

### Komplett (volle Kontrolle)
```
Einfach den kompletten Ordner hochladen.
Oder: GitHub-Link teilen.
```

---

## 🔍 Wichtige Dateien nach Usecase

| Ich möchte... | Datei | Was? |
|--------------|-------|------|
| App testen | `src/salon-app.jsx` | React-Code |
| Features verstehen | `README.md` | Überblick |
| Status sehen | `PROJEKTSTAND.md` | Was fertig? Was offen? |
| Nächstes planen | `NEXT_STEPS.md` | Roadmap (4 Phasen) |
| Google aufsetzen | `docs/SETUP.md` | Schritt-für-Schritt |
| Datenbank designen | `docs/GOOGLE_SHEETS_SCHEMA.md` | Sheets-Struktur |
| Backend-Code | `docs/APPS_SCRIPT_TEMPLATE.gs` | Apps Script zum Kopieren |
| Chat-Geschichte | `transcripts/CHAT_HISTORY.txt` | Alles, was wir gemacht haben |
| Basics | `package.json` | Dependencies |

---

## 📊 Dateigröße Übersicht

| Datei | Größe | Format |
|-------|-------|--------|
| salon-app.jsx | 187 KB | JavaScript/JSX |
| CHAT_HISTORY.txt | 268 KB | Text (JSON-struktur) |
| NEXT_STEPS.md | ~25 KB | Markdown |
| PROJEKTSTAND.md | ~20 KB | Markdown |
| GOOGLE_SHEETS_SCHEMA.md | ~15 KB | Markdown |
| APPS_SCRIPT_TEMPLATE.gs | ~10 KB | JavaScript |
| Andere Dateien | ~5 KB | Markdown/Config |

**TOTAL:** ~540 KB (alles zusammen)

---

## 🎯 Nächster Schritt (für deinen neuen Chat)

1. **GitHub-Repo initieren** (optional):
   ```bash
   cd hautgefuehl-app-github
   git init
   git add .
   git commit -m "Initial commit: Hautgefühl App MVP"
   ```

2. **Zum neuen Chat bringen:**
   - Diese ganze **Ordner-Struktur hochladen**, oder
   - **GitHub-Link teilen** (wenn repo öffentlich), oder
   - **Nur wesentliche Dateien** (salon-app.jsx + PROJEKTSTAND.md + NEXT_STEPS.md)

3. **Im neuen Chat sagen:**
   > "Hier ist das Projekt. Wir waren bei Google-Integration. Bau Phase 1 auf (Google Sheets)."

---

## ✅ Qualitäts-Checklist

Bevor es zu GitHub geht:

- ✅ salon-app.jsx läuft lokal
- ✅ Alle Doku gelesen (README, PROJEKTSTAND, NEXT_STEPS)
- ✅ Schema verstanden (Sheets, Apps Script)
- ✅ Setup-Anleitung nachvollziehbar
- ✅ Chat-Verlauf als Backup gespeichert
- ✅ .gitignore konfiguriert
- ✅ package.json vorhanden

---

## 🆘 Wenn Fragen entstehen

1. **Erst lesen:**
   - transcripts/CHAT_HISTORY.txt (dort ist ALLES erklärt)
   - PROJEKTSTAND.md (Status)
   - Relevante .md-Datei (docs/)

2. **Dann im neuen Chat fragen:**
   - Mit Screenshot/Code zeigen
   - Welche Schritte hast du gemacht?
   - Welcher Fehler?

---

## 📞 Kontakt & Credits

- **Projekt:** Hautgefühl Beauty Salon, Warburg
- **Lead:** Alex (infoundanlage-source)
- **Status:** MVP 0.2.0-beta (Pre-Google-Integration)
- **Letzte Update:** 09.06.2026

---

## 🎓 Learning Path (wenn neu bei Google + React)

**Level 1 (Basics):**
- README.md
- PROJEKTSTAND.md
- salon-app.jsx (Code lesen, nicht ändern)

**Level 2 (Setup):**
- docs/SETUP.md
- docs/GOOGLE_SHEETS_SCHEMA.md
- NEXT_STEPS.md

**Level 3 (Development):**
- docs/APPS_SCRIPT_TEMPLATE.gs
- salon-app.jsx (Code anpassen)
- transcripts/ (Context für Entscheidungen)

---

**Fertig?** → Alles ist in diesem Ordner. Zur GitHub hochladen und starten! 🚀
