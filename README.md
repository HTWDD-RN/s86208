# Lernprogramm

## Übersicht

Dieses Projekt ist ein webbasiertes Lernprogramm, das als Progressive Web App (PWA) umgesetzt wurde. Es wurde im Rahmen des Belegs zur Lehrveranstaltung „Webtechnologien“ an der HTW Dresden entwickelt. Die App ist darauf ausgelegt, dem Benutzer eine Auswahl an Themengebieten zu geben und anschließend dazu passende Quizfragen zu stellen mit anschließender Auswertung.

## Funktionen

- Auswahl zwischen 5 Aufgabenkategorien: Mathematik, Webtechnologie, Allgemeinwissen, Noten lernen und Externe Aufgaben
- Darstellung von Fragen mit 4 Antwortmöglichkeiten (Zufallsreihenfolge)
- Externe Aufgaben via REST-API
- Fortschrittsanzeige per Progressbar
- Statistikanzeige am Ende
- Responsive Design für Desktop, Tablet und Smartphone
- Offline-Nutzung über PWA-Installation
- Piano-Keyboard mit Soundausgabe via Web Audio API
- Notenanzeige mit VexFlow, Matheformeln mit KaTeX

## Genutzte Technologien

- **HTML5**, **CSS3**, **JavaScript** (ES6, strikt)
- **DOM-Manipulation**
- **VexFlow** zur Anzeige von Noten
- **KaTeX** zur Darstellung mathematischer Ausdrücke
- **Web Audio API** für die Tonausgabe beim Piano
- **Fetch API** + JSON für REST-Zugriff
- **Service Worker** und **Manifest** für PWA-Funktionalität

## Entwicklung und Tools

Entwickelt wurde das Projekt mit **Visual Studio Code**. Für die schnelle Vorschau habe ich die **Live Server**-Erweiterung genutzt. Spätere Tests wurden im **Firefox** durchgeführt, für die PWA-Installation und Mobiltests kam **Google Chrome** auf dem **iPhone** zum Einsatz.

## Schwierigkeiten

Die größten Herausforderungen lagen bei:

- **KaTeX-Integration** (korrekte Formatierung, Render-Trigger)
- **Piano-Design** und dessen responsives Verhalten
- **Piano-Funktionalität** mit Audioausgabe und Tonzuordnung
- Allgemein beim Responsive Design und der sauberen Trennung von Logik und Darstellung

## Einsatz von KI

Ich habe **ChatGPT** unterstützend eingesetzt, insbesondere in folgenden Bereichen:

- **Piano-Funktion** (Design und Klangzuordnung mit Web Audio API)
- **KaTeX** (Syntax, Einbindung, Render-Verhalten)
- **Allgemeine Architekturfragen** zur Struktur von Modulen
- **CSS-Layout**-Fragen, z. B. für das Piano oder für die responsive Darstellung

Ich habe den generierten Code immer verstanden, angepasst und wo nötig erweitert oder optimiert.

## Weiterentwicklungsideen

- Speichern des Lernfortschritts im LocalStorage
- Mehrfachauswahl bei Fragen ermöglichen
- Nutzeraccounts mit Punktespeicherung
- Eigene Fragen hinzufügen über ein Admin-Interface

## Kompatibilität

Getestet in folgenden Browsern:

- **Firefox (aktuell)**
- **Google Chrome (aktuell)**
- **Mobile Safari (iOS über Chrome)**

Die Anwendung funktioniert sowohl am Desktop als auch mobil und ist installierbar als PWA.

## Aufruf

Online verfügbar unter:

`https://www.informatik.htw-dresden.de/~s86208/Lernprogramm/`  



