# Hautgefühl Beauty Salon – Booking App

Eine moderne React/JSX Beauty-Salon-Buchungsapp für **Hautgefühl** in Warburg, Deutschland. 

**Status:** MVP (Minimally Viable Product) – Frontend 100%, Google Sheets/Apps Script Integration in Vorbereitung.

---

## 🎨 Features

### Kundenseite
- ✨ Splash-Screen mit Logo
- 🏠 Übersichtliche Startseite mit Aktions-Banner
- 📅 **4-Schritt Buchungsfluss:**
  1. Bereich + Leistung wählen
  2. Datum & Uhrzeit (moderner Kalender)
  3. Fachkraft anzeigen (automatisch zugewiesen)
  4. Kontaktdaten (Name, E-Mail, Telefon)
- 📧 **Strukturierte Bestätigungs-E-Mail** mit:
  - Google-Kalender-Link (echte Deep-Link)
  - Termin-Details
  - Kontakt-Info
  - E-Mail-Vorschau in der App
- 📱 Responsive Design (Mobile-First, max 430px)

### Pro-Dashboard (Admin)
- 📊 Übersicht: Stats, Wochen-Chart, nächste Termine
- 📅 Termine verwalten: **Stornieren** + **Umbuchen**
- ➕ Neue Termine für Kunden anlegen
- 🎁 Aktionen/Werbe-Banner erstellen & verwalten
- 📋 Leistungs-Übersicht

---

## 🛠 Tech Stack

| Teil | Technologie | Status |
|------|------------|--------|
| **Frontend** | React (JSX), lucide-react Icons | ✅ Fertig |
| **Design** | Cormorant Garamond + Plus Jakarta Sans, Material You (Android 17) | ✅ Fertig |
| **Datenspeicherung** | Google Sheets | 🔄 In Arbeit |
| **Backend** | Google Apps Script | 🔄 In Arbeit |
| **E-Mail** | Gmail via Apps Script | 🔄 In Arbeit |
| **Calendar** | Google Calendar Deep-Links | ✅ Fertig |
| **Logo** | Base64 eingebettet | ✅ Fertig |

---

## 📦 Projekt-Struktur

```
hautgefuehl-app-github/
├── README.md                          (diese Datei)
├── .gitignore
├── PROJEKTSTAND.md                    (detaillierter Stand)
├── NEXT_STEPS.md                      (Nächste Schritte)
├── src/
│   └── salon-app.jsx                  (komplette React-App, single file)
├── docs/
│   ├── SETUP.md                       (Deployment-Anleitung)
│   ├── GOOGLE_SHEETS_SCHEMA.md        (Datenbank-Design)
│   └── APPS_SCRIPT_TEMPLATE.gs        (Backend-Code)
└── transcripts/
    └── CHAT_HISTORY.txt               (kompletter Chat-Verlauf)
```

---

## 🚀 Schnellstart

### 1. Lokal testen (nur Frontend)
```bash
# clone
git clone https://github.com/[dein-username]/hautgefuehl-app.git
cd hautgefuehl-app

# Datei öffnen (React benötigt Node.js + Vite/Create-React-App Setup)
# Oder direkt in Browser-DevTools testen:
# salon-app.jsx als React-Komponente importieren
```

### 2. Mit Google Sheets + Apps Script verbinden
- Siehe `docs/SETUP.md` für komplette Anleitung
- Google Sheets Template erstellen → Apps Script Webhook → React anpassen

---

## 📊 Geschäftsdaten (Echtdaten von Planity)

| Info | Wert |
|------|------|
| **Name** | Hautgefühl Beauty Salon |
| **Adresse** | Hauptstraße 82, 34414 Warburg |
| **Öffnungszeiten** | Mo–Fr 09:00–19:00, Sa 09:00–14:00, So geschlossen |
| **Bewertung** | 5,0 ⭐ (99 Bewertungen) |
| **Instagram** | @hautgefuehl.warburg |

### Kategorien & Fachkräfte
1. **⚡ Laser & Tattoo** → Regina (7 Leistungen, 50–150€)
2. **👁️ Wimpern & Gesicht** → Selma (10 Leistungen, 52–380€)
3. **💅 Nägel & Fuß** → Anna (6 Leistungen, 25–70€)

---

## 🎨 Design

**Farbschema (Material You / Android 17):**
- Primary: `#6B2F5E` (Mauve)
- Secondary: `#8B4F7A` (Darker Mauve)
- Tertiary: `#C084A8` (Light Mauve)
- Category Colors:
  - Laser: `#9333EA` (Lila)
  - Wimpern: `#DB2777` (Pink)
  - Nägel: `#0284C7` (Blau)

**Schriften:**
- Headlines: `Cormorant Garamond` (elegant, serif)
- Body: `Plus Jakarta Sans` (modern, sans-serif)

**Icons:** lucide-react (keine Emojis)

---

## 📧 E-Mail-Template

Die App generiert eine strukturierte HTML-E-Mail mit:
- Header mit Logo & Gradient
- Persönliche Anrede
- Termin-Details in übersichtlicher Box
- Adresse + Kontakt
- Google-Kalender-CTA
- Disclaimer

**Versand via:** Google Apps Script → Gmail (noch zu integrieren)

---

## 📝 Chat-Verlauf

Der komplette Entwicklungs-Chat ist in `transcripts/CHAT_HISTORY.txt` gespeichert.

**Wichtige Meilensteine:**
- 08.06.2026 18:02–23:00 Uhr: Komplette App-Entwicklung (Frontend + UI/UX)
- 09.06.2026 10:00–16:00 Uhr: Pro-Dashboard, E-Mail-Integration, Google Kalender
- **Aktuelle Phase:** Google Sheets + Apps Script Setup

---

## 🔄 Nächste Schritte

Siehe `NEXT_STEPS.md` für detaillierte Roadmap.

**Kurzversion:**
1. ✅ **Frontend komplett** – salon-app.jsx (4,5KB gzipped)
2. 🔄 **Google Sheets Struktur** – Bookings, Customers, Promos, Feedback
3. 🔄 **Google Apps Script Backend**
   - `doPost()` → Buchungen speichern + E-Mails versenden
   - `doGet()` → Live-Daten für Dashboard
4. 🔄 **React-Integration** – fetch zu Apps Script statt nur State
5. ✋ **Deployment** – Vercel/Netlify + Google-Autorisierung

---

## 📖 Dokumentation

- **`PROJEKTSTAND.md`** – Detaillierter Stand des Projekts
- **`NEXT_STEPS.md`** – Roadmap & spezifische Aufgaben
- **`docs/SETUP.md`** – Schritt-für-Schritt Google-Integration
- **`docs/GOOGLE_SHEETS_SCHEMA.md`** – Datenbank-Design
- **`docs/APPS_SCRIPT_TEMPLATE.gs`** – Backend-Code-Template

---

## 🤝 Contributing

Dies ist ein Einzelprojekt für Hautgefühl Warburg. 

**Für Änderungen:**
1. Chat-Chathistorie lesen (`transcripts/`)
2. `PROJEKTSTAND.md` & `NEXT_STEPS.md` checken
3. Branch erstellen: `git checkout -b feature/xyz`
4. PR öffnen mit Beschreibung

---

## 📄 Lizenz

Privates Projekt. Keine Lizenz.

---

## 👤 Projekt-Lead

Alex (infoundanlage-source) – Entwicklung, Konzept, Business-Logik

---

## 📞 Support / Fragen

Im Zweifelsfall: Chat-Transkript lesen! Alle Entscheidungen + Gründe sind dort dokumentiert.

---

**Zuletzt aktualisiert:** 09.06.2026 | **Version:** 0.2.0-beta (Pre-Google-Integration)
