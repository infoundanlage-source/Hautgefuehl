# Google Sheets Schema – Hautgefühl App

**Dateiname:** `Hautgefuehl-Salon-Data` (oder dein Name)

---

## 📄 Sheet 1: "Bookings" (Termin-Datensätze)

Speichert alle Buchungen von Kunden.

| Spalte | Typ | Pflicht | Format | Beispiel |
|--------|-----|---------|--------|----------|
| **A** ID | Number | ✅ | Integer, Auto | 1 |
| **B** ClientName | Text | ✅ | Beliebig | Lisa Meier |
| **C** Email | Email | ✅ | valid@email.de | lisa@example.com |
| **D** Phone | Text | ❌ | +49..., 0... | +491234567890 |
| **E** ServiceName | Text | ✅ | Exakt aus Services | Wimpern 1:1 Neumodellage |
| **F** ServicePrice | Number | ✅ | Euro | 95 |
| **G** Specialist | Text | ✅ | Regina/Selma/Anna | Selma |
| **H** Date | Date | ✅ | YYYY-MM-DD | 2026-06-15 |
| **I** Time | Text | ✅ | HH:MM (24h) | 09:00 |
| **J** Duration | Number | ✅ | Minuten | 160 |
| **K** Status | Text | ✅ | confirmed/pending/cancelled | confirmed |
| **L** CreatedAt | DateTime | ✅ | Auto (NOW()) | 2026-06-09 14:32:15 |
| **M** Notes | Text | ❌ | Interne Notizen | Neue Kundin, empfindliche Haut |

### Beispiel-Einträge
```
ID | ClientName    | Email            | Phone        | ServiceName                  | ServicePrice | Specialist | Date       | Time  | Duration | Status      | CreatedAt           | Notes
1  | Lisa Meier    | lisa@email.de    | +491234567   | Wimpern 1:1 Neumodellage     | 95           | Selma      | 2026-06-15 | 09:00 | 160      | confirmed   | 2026-06-09 14:32:15 | -
2  | Jana Koch     | jana@example.com | -            | Aquafacial Basic             | 90           | Selma      | 2026-06-15 | 11:00 | 55       | confirmed   | 2026-06-09 14:35:22 | Empfindliche Haut
3  | Petra Wolf    | petra@web.de     | +491111111   | Laser Haarentfernung Achseln | 50           | Regina     | 2026-06-16 | 10:00 | 15       | pending     | 2026-06-09 14:38:10 | -
4  | Sabine Braun  | sabine@web.de    | -            | Shellack inkl. Maniküre      | 35           | Anna       | 2026-06-17 | 14:00 | 60       | confirmed   | 2026-06-09 14:40:25 | Erstes Mal
5  | Marie Schulz  | marie@gmail.com  | +491555555   | Mini Tattoo                  | 90           | Regina     | 2026-06-18 | 15:00 | 90       | confirmed   | 2026-06-09 14:42:30 | Vorbereitet
```

### Datenvalidierung
- **ServiceName**: Dropdown (aus Services-Sheet)
- **Specialist**: Dropdown (Regina, Selma, Anna)
- **Status**: Dropdown (confirmed, pending, cancelled)
- **Date**: Datum-Format (nicht vor heute)
- **Email**: Email-Format validieren

---

## 👥 Sheet 2: "Customers" (CRM-Daten, optional)

Kundenprofil für Wiederholungsbuchungen & Marketing.

| Spalte | Typ | Pflicht | Beschreibung |
|--------|-----|---------|-------------|
| **A** ID | Number | ✅ | Eindeutig |
| **B** Name | Text | ✅ | Voller Name |
| **C** Email | Email | ✅ | Primär-Kontakt |
| **D** Phone | Text | ❌ | Telefonummer |
| **E** FirstVisit | Date | ✅ | Erstes Buchungsdatum |
| **F** TotalVisits | Number | ✅ | Anzahl Buchungen |
| **G** TotalSpent | Number | ✅ | Gesamtumsatz in € |
| **H** LastVisit | Date | ❌ | Zuletzt besucht |
| **I** Notes | Text | ❌ | Allergien, Vorlieben, etc. |
| **J** Newsletter | Checkbox | ❌ | Opt-in für Newsletter |

### Beispiel
```
ID | Name         | Email            | Phone      | FirstVisit | TotalVisits | TotalSpent | LastVisit  | Notes                  | Newsletter
1  | Lisa Meier   | lisa@email.de    | +49123...  | 2026-04-15 | 8          | 540 €      | 2026-06-15 | Empfindlich, allergisch | ✅
2  | Jana Koch    | jana@example.com | -          | 2026-05-01 | 3          | 210 €      | 2026-06-15 | -                      | ❌
```

**Formeln:**
- **TotalVisits:** `=COUNTIF(Bookings!G:G, A2)` (Count in Bookings, wo Status=confirmed)
- **TotalSpent:** `=SUMIF(Bookings!C:C, B2, Bookings!F:F)` (Sum ServicePrice)
- **LastVisit:** `=MAX(IF(Bookings!C:C=B2, Bookings!H:H))` (Array-Formel)

---

## 🎁 Sheet 3: "Promos" (Aktionen & Rabatte)

Werbe-Aktionen, die in der App angezeigt werden.

| Spalte | Typ | Pflicht | Beschreibung |
|--------|-----|---------|-------------|
| **A** ID | Number | ✅ | Eindeutig |
| **B** Title | Text | ✅ | z.B. "Sommer-Aktion 🌸" |
| **C** Description | Text | ✅ | 15% Rabatt auf alle Wimpernbehandlungen |
| **D** Discount | Number | ❌ | z.B. 15 (in %) |
| **E** Category | Text | ❌ | laser/wimpern/naegel oder leer (=alle) |
| **F** ExpiresAt | Date | ✅ | YYYY-MM-DD |
| **G** Active | Checkbox | ✅ | Aktiv oder nicht |
| **H** CreatedAt | DateTime | ✅ | Auto |
| **I** Notes | Text | ❌ | Interne Notizen |

### Beispiel
```
ID | Title              | Description                           | Discount | Category | ExpiresAt  | Active | CreatedAt           | Notes
1  | Sommer-Aktion 🌸   | 15% Rabatt auf Wimpernbehandlungen   | 15       | wimpern  | 2026-06-30 | ✅     | 2026-06-01 10:00:00 | -
2  | Neue Kundin Bonus  | 20€ Rabatt auf erste Behandlung      | -        | -        | 2026-12-31 | ✅     | 2026-06-01 10:00:00 | Manuell eingeben
3  | Laser Flash Sale   | 25% Rabatt auf Laser Behandlungen    | 25       | laser    | 2026-06-20 | ❌     | 2026-06-05 14:00:00 | Abgelaufen
```

---

## ⭐ Sheet 4: "Feedback" (optional, für Kundenzufriedenheit)

Feedback nach Termin.

| Spalte | Typ | Pflicht | Beschreibung |
|--------|-----|---------|-------------|
| **A** ID | Number | ✅ | |
| **B** BookingID | Number | ✅ | Referenz zu Bookings.ID |
| **C** Rating | Number | ✅ | 1–5 Sterne |
| **D** Comment | Text | ❌ | Feedback-Text |
| **E** Email | Email | ❌ | (auto-fill von Booking) |
| **F** SubmittedAt | DateTime | ✅ | |

### Beispiel
```
ID | BookingID | Rating | Comment                          | Email           | SubmittedAt
1  | 1         | 5      | Sehr zufrieden, gerne wieder!    | lisa@email.de   | 2026-06-16 20:15:00
2  | 2         | 4      | Gut, aber etwas kurz            | jana@example.de | 2026-06-16 19:00:00
```

---

## ⚙️ Sheet 5: "Settings" (optional, für Config)

Konfiguration ohne Code zu ändern.

| Setting | Wert | Typ | Beschreibung |
|---------|------|-----|-------------|
| salon_name | Hautgefühl | Text | Name |
| salon_address | Hauptstraße 82, 34414 Warburg | Text | Für E-Mails |
| salon_phone | +49... | Text | Kontakt |
| salon_email | info@hautgefuehl... | Email | Von-Adresse |
| hours_mon_fri | 09:00-19:00 | Text | Öffnungszeiten |
| hours_sat | 09:00-14:00 | Text | |
| hours_sun | closed | Text | |
| booking_min_advance | 2 | Number | Tage voraus buchen |
| booking_max_advance | 90 | Number | Tage im voraus |
| slot_duration | 30 | Number | Minuten pro Slot |
| timezone | Europe/Berlin | Text | Für Datumsberechnungen |

---

## 🔗 Beziehungen zwischen Sheets

```
Customers ──────┐
                │ (Email)
                ↓
          Bookings ──────┐
                         │ (BookingID)
                         ↓
                     Feedback

Promos
 └── Referenced in App (Category kann Filter sein)

Settings
 └── Global Config (wird in Apps Script gelesen)
```

---

## 📊 Google Sheets Funktionen

### Auto-Fill (CreatedAt)
```javascript
// In Apps Script, wenn Booking eingefügt:
sheet.getRange(lastRow, 12).setValue(new Date());
```

### Validierung in Sheets UI
1. Daten → Datenvalidierung
2. Kriterium: Custom formula / Dropdown
3. Beispiel: `=UNIQUE(Bookings!E:E)` (Service-Namen)

### Pivot-Tabellen (für Auswertungen)
- Daten → Pivot-Tabelle
- Zeilen: Specialist, Date
- Werte: COUNT(ID)
- → Visualisierung: Wer verdient was diese Woche?

---

## 🔐 Berechtigungen

| Rolle | Was | Warum |
|-------|-----|-------|
| **Google Apps Script** | Liest/schreibt Bookings, Promos | Backend-Funktion |
| **Regina, Selma, Anna** | Lesen Bookings, Customers | Terminplanung |
| **Alex (Admin)** | Voll Zugriff | Owner |
| **Kunden** | Nichts | Frontend-Only |

---

## 💡 Best Practices

1. **Nicht direkt löschen:** Status auf "cancelled" setzen, nicht löschen
2. **Backup:** Monatlich zu Google Drive backup exportieren
3. **Formulas:** VLOOKUP/XLOOKUP nicht übertreiben (Performance)
4. **Comments:** Für interne Notizen nutzen
5. **Conditional Formatting:** Status-Farben (confirmed=grün, cancelled=grau)

---

## 📋 Migration von alten Daten

Falls ihr schon Buchungen irgendwo habt:
1. CSV/Excel exportieren
2. In Bookings-Sheet Paste
3. Spalten-Reihenfolge matchnen
4. ID-Spalte Auto-Check

---

**Schema zuletzt aktualisiert:** 09.06.2026
