# Nächste Schritte – Hautgefühl App

**Aktuelle Phase:** Pre-Google-Integration (Frontend 100% fertig)

---

## 🎯 Phase 1: Google Sheets Setup (1–2 Tage)

### 1.1 Google Sheets erstellen
```
Neue Tabelle: "Hautgefuehl-Salon-Data"
```

**Sheet 1: "Bookings"**
| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| ID | Number | Eindeutige ID (Auto-Increment) |
| ClientName | Text | Kundenname |
| Email | Email | Kundenemail |
| Phone | Text | Telefonnummer |
| ServiceName | Text | Leistungsname |
| ServicePrice | Number | Preis in €  |
| Specialist | Text | Regina/Selma/Anna |
| Date | Date | YYYY-MM-DD |
| Time | Time | HH:MM |
| Duration | Number | Dauer in Min |
| Status | Text | confirmed/pending/cancelled |
| CreatedAt | DateTime | Zeitstempel |
| Notes | Text | Interne Notizen |

**Sheet 2: "Customers"** (optional, für CRM)
| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| ID | Number | Kundennummer |
| Name | Text | Voller Name |
| Email | Email | |
| Phone | Text | |
| FirstVisit | Date | Erstes Buchungs-Datum |
| TotalSpent | Number | Gesamtumsatz €|
| Preferences | Text | Notizen (z.B. Allergien) |

**Sheet 3: "Promos"**
| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| ID | Number | |
| Title | Text | z.B. "Sommer-Aktion" |
| Description | Text | Beschreibung |
| Discount | Number | z.B. 15 |
| Category | Text | laser/wimpern/naegel (oder leer = alle) |
| ExpiresAt | Date | YYYY-MM-DD |
| Active | Checkbox | true/false |
| CreatedAt | DateTime | |

**Sheet 4: "Feedback"** (optional)
| Spalte | Typ | Beschreibung |
|--------|-----|-------------|
| ID | Number | |
| BookingID | Number | Referenz zu Bookings.ID |
| Rating | Number | 1–5 Sterne |
| Comment | Text | Feedback-Text |
| SubmittedAt | DateTime | |

**Sheet 5: "Settings"** (optional)
| Setting | Wert | Typ |
|---------|------|------|
| salon_name | Hautgefühl | Text |
| address | Hauptstraße 82, 34414 Warburg | Text |
| hours_mon_fri | 09:00-19:00 | Text |
| hours_sat | 09:00-14:00 | Text |
| phone | | Text |
| email | info@... | Email |

---

## 🔌 Phase 2: Google Apps Script (2–3 Tage)

### 2.1 Web App erstellen
1. Sheets öffnen → Tools → Script Editor
2. Neues Project: "Hautgefuehl-Backend"
3. Code (siehe unten / `docs/APPS_SCRIPT_TEMPLATE.gs`)

### 2.2 Apps Script Code (Struktur)

```javascript
// CONFIG
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // aus URL kopieren
const SHEET_NAME = "Bookings";

// ─── MAIN HANDLERS ───
function doPost(e) {
  // Erhält Buchung vom Frontend
  // Validiert → speichert in Sheets → sendet E-Mail
  // Antwortet mit {"success": true, "bookingId": 123}
}

function doGet(e) {
  // GET /api/getBookings → JSON mit allen Buchungen
  // GET /api/getPromos → JSON mit aktiven Promos
  // Wird vom Pro-Dashboard zum Laden verwendet
}

// ─── HILFSFUNKTIONEN ───
function appendBooking(data) {
  // Schreibt Booking in Sheet
}

function sendConfirmationEmail(booking) {
  // HTML-Mail versenden
  // Nutzt GmailApp.sendEmail()
}

function getActivePromos() {
  // Liest aktive Aktionen aus Sheet
}
```

### 2.3 Deploy
```
Publish → Deploy as → New deployment → Web app
Führe als: [dein Account]
Wer hat Zugriff: Anyone
```

→ Public URL kopieren (z.B. `https://script.google.com/macros/d/...`)

---

## 📱 Phase 3: React Integration (1–2 Tage)

### 3.1 Environment Variables
```bash
# .env (oder netlify/vercel env vars)
REACT_APP_WEBHOOK_URL=https://script.google.com/macros/d/.../usercontent/...
```

### 3.2 book() Funktion anpassen
```javascript
async function book(){
  if(!selCat||!selSvc||!selDay||!selTime||!form.name||!form.email)return;
  
  // NEUER CODE:
  const payload = {
    clientName: form.name,
    email: form.email,
    phone: form.phone,
    serviceName: selSvc.name,
    servicePrice: selSvc.price,
    specialist: selCat.specialist,
    date: `${calY}-${String(calM+1).padStart(2,"0")}-${String(selDay).padStart(2,"0")}`,
    time: selTime,
    duration: selSvc.dur,
    notes: ""
  };
  
  try {
    const res = await fetch(process.env.REACT_APP_WEBHOOK_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    
    if(data.success) {
      setBookings(prev => [...prev, {id: data.bookingId, ...payload, status: "confirmed"}]);
      setDone(true);
    } else {
      alert("Fehler beim Speichern. Bitte versuche es später erneut.");
    }
  } catch(err) {
    console.error(err);
    alert("Netzwerkfehler. Prüfe deine Internetverbindung.");
  }
}
```

### 3.3 Pro-Dashboard mit Live-Daten
```javascript
useEffect(() => {
  // Beim App-Start oder Dashboard-Öffnen:
  async function loadData() {
    const res = await fetch(`${process.env.REACT_APP_WEBHOOK_URL}?action=getBookings`);
    const data = await res.json();
    setBookings(data.bookings || []);
  }
  if(screen === "pro") loadData();
}, [screen]);
```

---

## 🚀 Phase 4: Deployment (1 Tag)

### 4.1 GitHub
```bash
git init
git add .
git commit -m "Initial commit: hautgefuehl-app v0.2.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hautgefuehl-app.git
git push -u origin main
```

### 4.2 Vercel/Netlify
```bash
# Vercel (empfohlen)
npm install -g vercel
vercel --env REACT_APP_WEBHOOK_URL="YOUR_URL"
```

Oder über UI:
1. GitHub-Repo verbinden
2. Environment Variable setzen
3. Deploy

### 4.3 Google Apps Script
- URL in React `.env` aktualisieren
- Apps Script bleibt wie ist (keine Secrets nötig)

---

## ✅ Checkpoints

### Nach Phase 1 (Google Sheets)
- [ ] Sheets erstellt mit allen 5 Tabs
- [ ] Test-Eintrag manuell eingefügt
- [ ] Struktur passt zu salon-app.jsx

### Nach Phase 2 (Apps Script)
- [ ] Web App deployed
- [ ] Public URL verfügbar
- [ ] Test-Anfrage mit Postman/curl funktioniert
- [ ] E-Mail versendet korrekt

### Nach Phase 3 (React Integration)
- [ ] `.env` mit Webhook-URL
- [ ] `book()` macht POST zu Google
- [ ] Buchung erscheint in Sheets
- [ ] E-Mail kommt an
- [ ] Pro-Dashboard lädt live Daten

### Nach Phase 4 (Deployment)
- [ ] App auf Vercel/Netlify live
- [ ] GitHub hat Source-Code
- [ ] Domains/SSL konfiguriert
- [ ] Telemetry/Analytics optional

---

## 📋 Detaillierte Aufgabenliste

### Google Sheets
- [ ] Google-Konto bereit (Gmail)
- [ ] Neue Sheets erstellen
- [ ] Spalten-Header setzen
- [ ] Datenvalidierung (z.B. Status = Dropdown)
- [ ] Bedingte Formatierung (Status-Farben)

### Google Apps Script
- [ ] Web App erstellen
- [ ] `doPost()` Handler schreiben
- [ ] `doGet()` Handler schreiben
- [ ] `sendConfirmationEmail()` HTML-Template anpassen
- [ ] Error-Handling
- [ ] Logging (für Debugging)
- [ ] Deployen + URL kopieren

### React
- [ ] `book()` Funktion modernisieren
- [ ] `useEffect()` für Daten-Laden hinzufügen
- [ ] `.env` Setup
- [ ] Error-Handling (Toast/Alert)
- [ ] Loading-States (Spinner)
- [ ] Pro-Dashboard Tab "Übersicht" → live-Daten

### GitHub
- [ ] Repository erstellen
- [ ] `.gitignore` (node_modules, .env, .DS_Store)
- [ ] `package.json` (falls React-Projekt)
- [ ] Commit + Push
- [ ] README + Dokumentation prüfen

### Deployment
- [ ] Vercel/Netlify verbunden
- [ ] Build-Script testet
- [ ] Environment Variables konfiguriert
- [ ] Domain/SSL (optional)
- [ ] Monitoring (optional)

---

## 🎓 Learning Resources

- **Google Apps Script:** https://developers.google.com/apps-script
- **Google Sheets API:** https://developers.google.com/sheets/api
- **Gmail API in Apps Script:** https://developers.google.com/apps-script/reference/gmail
- **React Hooks:** https://react.dev/reference/react
- **Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## 📊 Zeitschätzung

| Phase | Aufwand | Schwierigkeit |
|-------|---------|--------------|
| 1 – Sheets | 2–4 h | Einfach |
| 2 – Apps Script | 4–6 h | Mittel |
| 3 – React Integration | 3–5 h | Mittel |
| 4 – Deployment | 2–3 h | Einfach |
| **TOTAL** | **11–18 h** | Mittel |

---

## 🆘 Häufige Fehler

| Problem | Lösung |
|---------|--------|
| CORS-Fehler | Apps Script URL muss public sein |
| E-Mail kommt nicht an | Gmail-Konto Sicherheit prüfen (2FA) |
| Sheets-Eintrag nicht gespeichert | Sheet-Name/ID falsch in Code |
| React sieht `.env` nicht | Rebuild nötig, nicht nur refresh |
| Webhook-URL falsch | Ganze URL kopiert? Nicht gekürzt? |

---

**Nächster Schritt:** Phase 1 starten → Sheets-Struktur aufbauen!
