# Changelog

## v0.2.1 – Bugfix Release (12.06.2026)

### 🐛 Fehler behoben
1. **"Heute"-Statistik** – nutzt jetzt das echte Tagesdatum statt hardcoded 2026-06-08
2. **Kalender** – startet jetzt im aktuellen Monat (Buchung, Umbuchen, Admin)
3. **Kategorie-Wechsel** – Leistung aus anderer Kategorie wird zurückgesetzt → keine falsche Fachkraft mehr möglich
4. **Startseiten-Kategorie-Klick** – öffnet jetzt korrekt Schritt 1 mit aufgeklappter Kategorie
5. **Sonntage gesperrt** – Sa-Slots enden so dass Behandlung bis 14 Uhr fertig ist
6. **E-Mail-Validierung** – Regex-Prüfung + roter Hinweis bei ungültiger Adresse
7. **Doppelbuchungen blockiert** – belegte Zeiten werden gar nicht mehr angezeigt; Überlappungsprüfung über gesamte Behandlungsdauer
8. **Umsatz & Dauer** – direkt in Buchung gespeichert (nicht mehr fragil über Namen gesucht)
9. **Splash-Timer** – mit Cleanup (kein Memory Leak)
10. **Alle 24 Planity-Leistungen** – Oberschenkel 85€, Tattoo Beratung 30€, PM Lippen 380€, Neumodellage Natur 50€ wiederhergestellt

### ✨ Verbesserungen
- Wochen-Chart zeigt echte Buchungszahlen (Mo–So aktueller Woche)
- Lösch-Bestätigung bei Aktionen (kein versehentliches Löschen)
- Tag-Wechsel setzt Uhrzeit zurück
- Neue Leistung → Datum/Zeit wird zurückgesetzt
- Hinweis "Keine freien Zeiten" wenn alles belegt
- Umbuchen-Modal: eigener Termin bei Slot-Berechnung ausgenommen

## v0.2.0 – Feature Release (09.06.2026)

### Features
- Pro-Dashboard: Stornieren, Umbuchen, Neuer Termin, Aktionen/Werbung
- Google Kalender Deep-Link (echte Funktionalität)
- Strukturierte E-Mail-Vorschau nach Buchung
- E-Mail Pflichtfeld bei Buchung
- Android 17 / Material You Design komplett
- Aktions-Banner auf Kundenstartseite
- Logo Base64 eingebettet (Splash-Screen)

## v0.1.0 – Initial (08.06.2026)

- Initiale App mit Buchungsflow, Home, Pro-Dashboard
