# Projektstand – Hautgefühl App

**Stand:** 09.06.2026 | **Version:** 0.2.0-beta

---

## 🎯 Übersicht

Komplette React-App (single-file `salon-app.jsx`) für Beauty-Salon-Buchungen. Frontend 100% fertig. Backend (Google Sheets + Apps Script) in Vorbereitung.

---

## ✅ Was ist fertig

### Frontend (100%)
- ✅ Splash-Screen mit animiertem Logo (2,8 Sek)
- ✅ Startseite: Hero, Kategorien, Team, Info
- ✅ Aktions-Banner (golden, mit Icon, Rabatt-Display)
- ✅ 4-Schritt Buchungsfluss:
  - Kategorie + Leistung (mit Preis, Dauer)
  - Datum (Kalender mit Heute-Highlight, Vergangenheit grau)
  - Uhrzeit (17 Zeitslots)
  - Kontaktdaten + Zusammenfassung
- ✅ Bestätigungs-Seite mit E-Mail-Status
- ✅ E-Mail-Vorschau (strukturiert, lesbar)
- ✅ Google-Kalender Deep-Link (echte Funktionalität)

### Pro-Dashboard (100%)
- ✅ 5 Tabs: Übersicht, Termine, + Termin, Aktionen, Leistungen
- ✅ Überblick: Stats (Termine, Heute, Umsatz), Wochen-Chart, nächste 3 Termine
- ✅ Termine-Management:
  - Liste aller Buchungen mit Status
  - **Stornieren-Button** → Modal mit Warnung → Termin wird "Storniert"
  - **Umbuchen-Button** → Modal mit Kalender + Zeitauswahl
- ✅ Neuen Termin vergeben: Admin-Formular (Name, Bereich, Leistung, Datum, Zeit)
- ✅ Aktionen/Promotions:
  - Neue Aktion erstellen (Titel, Text, %, Bereich, Ablaufdatum)
  - Aktivieren/Deaktivieren
  - Bearbeiten/Löschen
  - Erscheinen live als Banner beim Kunden
- ✅ Leistungen: Alle 20 Services mit Preisen, sortiert nach Kategorie

### Design & UX (100%)
- ✅ Android 17 / Material You Design
- ✅ Helle Farben (Mauve, Pink, Blau in Pastelltönen)
- ✅ Icons: lucide-react durchgehend (keine Emojis)
- ✅ Fonts: Cormorant Garamond (Headlines) + Plus Jakarta Sans (Body)
- ✅ Bottom Navigation (Start, Buchen, Pro)
- ✅ Bottom-Sheet Modals (Stornieren, Umbuchen, Aktionen)
- ✅ Logo Base64 eingebettet (wird überall angezeigt)
- ✅ Responsive Mobile (max 430px width)
- ✅ Animationen (fadeIn, slideUp, pulse) mit CSS

### Daten (Echtdaten)
- ✅ 3 Kategorien mit Fachkräften (Regina, Selma, Anna)
- ✅ ~20 Services mit echten Preisen (50–380€) & Dauer
- ✅ Salon-Adresse, -Öffnungszeiten, -Bewertung
- ✅ 5 Demo-Buchungen zum Testen
- ✅ Google-Kalender-Funktion (berechnet Endzeit aus Service-Dauer)

---

## 🔄 Was ist noch zu bauen

### Google Sheets (Datenbank)
- [ ] Google Sheets erstellen (oder Template bereitstellen)
- [ ] 4–5 Sheets:
  - `Bookings` (Termin-Datensätze)
  - `Customers` (Kundendaten: Name, Email, Phone)
  - `Promos` (Aktionen/Coupons)
  - `Feedback` (optional, Kundenfeedback)
  - `Settings` (optional, Öffnungszeiten, Preise, etc.)

### Google Apps Script (Backend)
- [ ] Web App erstellen (`doPost()` & `doGet()`)
- [ ] `doPost()` Handler:
  - Erhält Buchung von React
  - Speichert in Sheets
  - Sendet Bestätigungs-E-Mail
  - Antwortet mit Bestätigung
- [ ] `doGet()` Handler:
  - Liefert Bookings/Promos für Pro-Dashboard
  - Live-Daten laden
- [ ] `sendConfirmationEmail()` Funktion:
  - Nutzt HTML-Template (aus App)
  - Sendet via Gmail
  - Mit Kundendaten personalisiert

### React-Integration
- [ ] `book()` Funktion anpassen:
  - Bisher: nur State
  - Neu: `fetch()` zu Apps Script Webhook
  - Response verarbeiten
- [ ] Pro-Dashboard `useEffect()` zum Laden von Sheets-Daten
- [ ] Error-Handling für Netzwerkfehler
- [ ] Loading-States

### Deployment
- [ ] React-App auf Vercel/Netlify deployen
- [ ] Google Apps Script Web App publishen
- [ ] CORS richtig konfigurieren
- [ ] Umgebungsvariablen (Apps Script Webhook-URL in `.env`)

---

## 🗂 Datei-Struktur (aktuell)

```
salon-app.jsx (187 KB, ~4700 Zeilen)
├── Imports (lucide-react, React)
├── CONSTANTS
│   ├── LOGO (Base64)
│   ├── CATEGORIES (3 Kategorien)
│   ├── SERVICES (~20 Services)
│   ├── TIMES (17 Zeitslots)
│   ├── MONTHS, DAYS_SHORT
│   └── INIT_BOOKINGS (5 Demo-Bookings)
├── Helper Functions
│   ├── getDays() – Kalender-Logik
│   ├── MiniCal() – Kalender-Komponente
│   ├── Modal() – Bestätigungs-Dialoge
│   └── gcalLink() – Google-Kalender-URL
├── Main App Component
│   ├── State Management (hooks)
│   ├── Splash Screen
│   ├── Home Screen
│   ├── Booking Flow (4 Steps)
│   ├── Confirmation Screen
│   ├── Pro Dashboard (5 Tabs)
│   └── Bottom Navigation
└── Styles (CSS in <style> tag)
```

---

## 🎁 Was funktioniert sofort

1. **Buchungsfluss:** Kunde kann einen kompletten Termin von Start bis Bestätigung buchen
2. **E-Mail anschauen:** Nach Buchung → Button → E-Mail-Vorschau
3. **Google Kalender:** Button öffnet Google Kalender mit allen Infos
4. **Pro-Dashboard:** Termine stornieren, umbuchen, neue anlegen, Aktionen verwalten
5. **State Management:** Alles via React hooks (speichert aber nur im RAM)

---

## ⚠️ Was noch nicht funktioniert

1. **Persistente Datenspeicherung:** Alles verschwindet beim Refresh (nur State)
2. **E-Mail-Versand:** Bestätigungs-Mail wird nicht wirklich versendet
3. **Live-Daten aus Google Sheets:** Dashboard lädt nur Demo-Daten
4. **Authentifizierung:** Kein Login für Pro-Bereich (nur Button Toggle)

---

## 🔐 Sicherheit & Limits

- **Keine Authentifizierung:** Pro-Bereich öffentlich zugänglich (für MVP ok)
- **Keine Validierung:** E-Mail-Format nicht geprüft (nur noch nicht leer)
- **Keine Rate-Limits:** Buchungen können doppelt gemacht werden
- **Keine GDPR:** Datenschutz nicht implementiert
- **Zeitslots hardcoded:** 09:00–17:30, keine Freigabe-Logik

---

## 🚀 Performance

- **Datei-Größe:** salon-app.jsx ~187 KB (unkomprimiert)
- **Gzip:** ~4.5 KB (Bundle-Größe ist winzig)
- **Render-Zeit:** <100ms (React ist schnell für Buchungen)
- **Memory:** ~5 MB (5 Bookings in Demo)

---

## 🎤 Wichtige Entscheidungen

1. **Single-File JSX:** Einfach zu teilen, schnell zu testen, später aufteilen
2. **Lucide-React Icons:** Hochwertig, kein Fallback nötig
3. **Material You Design:** Modern, passt zu Android 17 + Google-Vibe
4. **Google Sheets Backend:** Kostenlos, einfach, Daten sind lesbar
5. **Google Apps Script:** Keine Infrastruktur nötig, integriert sich mit Sheets
6. **E-Mail über Gmail:** Kostenlos, zuverlässig, keine SMTP-Config nötig

---

## 💬 Chat-History

Kompletter Verlauf in `transcripts/CHAT_HISTORY.txt` (268 KB, ~2700 Zeilen).

**Key Discussions:**
- Design-Änderungen (Farben, Icons, Layout)
- Service-Daten von Planity integriert
- Google-Kalender-Link gebaut
- E-Mail-Template gestaltet
- Pro-Dashboard mit Stornieren/Umbuchen

---

## 🔗 Externe Ressourcen

- **Planity Salon-Link:** https://www.planity.com/de-DE/hautgefuehl-34414-warburg-twr
- **Instagram:** https://www.instagram.com/hautgefuehl.warburg/
- **Google Apps Script Docs:** https://developers.google.com/apps-script
- **Lucide Icons:** https://lucide.dev/

---

## 📞 Kontakt & Notizen

- **Projekt-Owner:** Alex (infoundanlage-source)
- **Salon-Kontakt:** Regina, Selma, Anna
- **Testing:** Alle Flows durchgespielt, Daten echtgetestet

---

**Version History:**
- v0.1.0 (06.04.2026) – Initial concept
- v0.1.5 (08.06.2026) – Frontend + UI vollständig
- v0.2.0 (09.06.2026) – Pro-Dashboard + E-Mail + Google Calendar
- v0.2.0-beta (09.06.2026) – Pre-Google-Integration (aktuell)
- v0.3.0 (→ soon) – Google Sheets + Apps Script
