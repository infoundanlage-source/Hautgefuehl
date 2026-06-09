# Setup Guide – Hautgefühl App

**Ziel:** Die komplette App (Frontend + Google Backend) zum Laufen bringen.

---

## 🚀 Schritt-für-Schritt

### Phase 1: Vorbereitung (15 Minuten)

#### 1.1 Repository forken / klonen
```bash
git clone https://github.com/YOUR_USERNAME/hautgefuehl-app.git
cd hautgefuehl-app
```

#### 1.2 Google-Account vorbereiten
- Google-Konto (kostenlos)
- Google Drive offen
- Gmail-Account aktiviert

---

### Phase 2: Google Sheets erstellen (30 Minuten)

#### 2.1 Neue Google Sheet erstellen
1. Google Drive öffnen → **+ Neu** → **Google Tabellen**
2. Name: `Hautgefuehl-Salon-Data`
3. Sheet-Tabs umbenennen:
   - `Bookings` (default)
   - Rechtsklick → **Tabelle hinzufügen**: `Customers`, `Promos`, `Feedback`, `Settings`

#### 2.2 Spalten-Header setzen
Siehe `docs/GOOGLE_SHEETS_SCHEMA.md` — für jedes Sheet die Spalten-Header kopieren.

**Bookings (Beispiel):**
```
A: ID
B: ClientName
C: Email
D: Phone
E: ServiceName
F: ServicePrice
G: Specialist
H: Date
I: Time
J: Duration
K: Status
L: CreatedAt
M: Notes
```

Genauso für `Customers`, `Promos`, etc.

#### 2.3 Sheet-ID kopieren
Öffne Bookings-Sheet, URL-Zeile:
```
https://docs.google.com/spreadsheets/d/1m4r5Ek2_AbC... ← Diese ID (lange Buchstabenkombination)
```

Speichern für Schritt 3.

---

### Phase 3: Google Apps Script deployen (45 Minuten)

#### 3.1 Apps Script Projekt erstellen
1. Sheets öffnen → **Tools** → **Script Editor**
2. Neue Datei erstellen
3. Den Code aus `docs/APPS_SCRIPT_TEMPLATE.gs` **komplett kopieren**
4. In Script Editor **einfügen** (alten Code ersetzen)

#### 3.2 Sheet-ID eintragen
In Script Editor, oben:
```javascript
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";
```

Ersetzen mit deiner echten Sheet-ID (aus 2.3).

#### 3.3 Script testen (optional)
1. **Run** → **testBooking**
2. Genehmigung geben (Google warnt vor "unsafe app" → **Advanced** → **Go to project**)
3. Nach Ausführung in Sheets prüfen: eine Test-Zeile sollte da sein

#### 3.4 Als Web App deployen
1. **Deploy** → **New Deployment** → Zahnrad
2. Type: **Web app**
3. Execute as: **[Dein Google-Konto]**
4. Who has access: **Anyone**
5. **Deploy**
6. **Neue Deployment-URL kopieren** (sieht so aus):
   ```
   https://script.google.com/macros/d/1m_4r5Ek2_AbC.../usercontent
   ```

---

### Phase 4: React App einrichten (20 Minuten)

#### 4.1 `.env` Datei erstellen
Projektordner-Root:
```bash
# .env
REACT_APP_WEBHOOK_URL=https://script.google.com/macros/d/1m_4r5Ek2_AbC.../usercontent
```

**Wichtig:** Genau die URL aus 3.4 einsetzen.

#### 4.2 React-Projekt starten (falls lokal)

Option A: **Nur Frontend testen** (ohne Google)
```bash
# Falls du `salon-app.jsx` als React-Komponente nutzt
npm install
npm start
```

Option B: **Mit Google Backend**
```bash
npm install
npm start
# Dann in Browser Fehler in Console sehen, wenn Webhook nicht erreichbar
```

#### 4.3 Test-Buchung machen
1. App öffnen
2. "Termin buchen" → alle Schritte durchgehen
3. Bestätigung sollte kommen
4. In Google Sheets unter "Bookings" sollte die Zeile jetzt auftauchen

---

### Phase 5: Deployment (30 Minuten)

#### 5.1 Vercel (empfohlen)

**Mit GitHub verbinden:**
```bash
# Lokal
git add .
git commit -m "Add hautgefuehl-app"
git push origin main
```

**Vercel-UI:**
1. https://vercel.com
2. **Import Project** → GitHub-Repo wählen
3. Environment Variable setzen:
   - **Name:** `REACT_APP_WEBHOOK_URL`
   - **Value:** [Deine URL aus 3.4]
4. **Deploy**
5. Nach 2 Minuten: Live-Link

#### 5.2 Alternativ: Netlify
1. https://netlify.com
2. Connect GitHub
3. Build: `npm run build`
4. Publish: `dist/` (oder wo die App gebaut wird)
5. Environment Variable gleich wie Vercel
6. Deploy

#### 5.3 Google Apps Script weiterhin public halten
Die Deployment-URL muss öffentlich erreichbar bleiben (bereits konfiguriert in 3.4).

---

## ✅ Checkliste

### Setup komplett?
- [ ] Google Sheets mit 5 Tabs erstellt
- [ ] Spalten-Header in allen Sheets
- [ ] Apps Script Code eingefügt
- [ ] Echte Sheet-ID in Apps Script
- [ ] Apps Script deployt + URL kopiert
- [ ] `.env` mit Webhook-URL
- [ ] Test-Buchung funktioniert
- [ ] React App zu GitHub gepusht
- [ ] Vercel/Netlify deployt

### Test-Szenario
```
1. App öffnen (lokal oder Vercel)
2. "Termin buchen"
3. Beliebige Daten eingeben
4. "Bestätigen"
5. E-Mail sollte ankommen (Spam-Ordner prüfen!)
6. Google Sheets: neue Zeile in "Bookings"
```

---

## 🆘 Häufige Fehler

| Problem | Lösung |
|---------|--------|
| "CORS-Fehler in Browser Console" | Apps Script URL nicht public? Schritt 3.4 prüfen. |
| "500 Internal Server Error" | Sheet-ID falsch in Apps Script. Aus URL kopieren. |
| "E-Mail kommt nicht an" | Gmail-Konto? 2FA aktiviert? Google kann "unsafe apps" blocken. |
| ".env wird nicht geladen" | Nach `.env`-Änderung: `npm start` neu starten. |
| "Deployment URL funktioniert nicht" | URL mit `/usercontent` endet? Nicht gekürzt? |
| "Booking speichert nicht" | Sheets-Permission: Wer hat Zugriff? Account ist der Owner? |

---

## 🔐 Sicherheit

Nach Setup folgende Optionen:

### Option 1: Apps Script Protected
```javascript
// Nur HTTPS requests akzeptieren:
function doPost(e) {
  if (!e.parameter.token || e.parameter.token !== "SECRET") {
    return HtmlService.createHtmlOutput("Forbidden");
  }
  // ...
}
```

Dann in React:
```javascript
fetch(URL + "?token=SECRET", {method: "POST", ...})
```

### Option 2: Google OAuth
Apps Script kann Google-Login erzwingen (komplexer).

### Option 3: Für MVP ausreichend
Öffentliche Web App ist ok, solange nur seriöse Daten rein.

---

## 📞 Support

Siehe `transcripts/CHAT_HISTORY.txt` für komplette Entwicklungs-Dokumentation.

Fragen:
- **React-Fehler?** Browser Console öffnen (F12)
- **Sheets-Fehler?** Apps Script Editor → Ausführungsprotokolle prüfen
- **Google-Fehler?** Google Support / Apps Script Docs

---

**Setup zuletzt aktualisiert:** 09.06.2026
