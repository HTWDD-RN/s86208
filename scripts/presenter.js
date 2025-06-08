'use strict';

import { zeigeAuswahl, zeigeQuizfrage, zeigeStatistik, zeigeFortschritt } from './view.js';
import { ladeFragen } from './model.js';
import { ladeExterneFrage, pruefeExterneAntwort } from './model.js';

let fragen = []; 
let aktuelleFrage = 0;
let richtigeAntworten = 0;

//warten auf laden des DOMs
document.addEventListener("DOMContentLoaded", () => {
  //Zeige Themenauswahl und reagiere auf Auswahl
  zeigeAuswahl(async (thema) => {
    if (thema.toLowerCase() === "externe aufgaben") {
        starteExternesQuiz(); // falls extern wird externes Quiz gestartet
        return;
    }

    // Fragen von gewählten Thema laden
    const daten = await ladeFragen();
    const themenFragen = daten[thema.toLowerCase()];

    if (!themenFragen || themenFragen.length === 0) {
      alert("Keine Fragen für dieses Thema vorhanden.");
      return;
    }

    // Fragen mischen
    fragen = [...themenFragen]
      .map(f => ({ ...f, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(f => ({ ...f }));

    aktuelleFrage = 0;
    richtigeAntworten = 0;

    zeigeNaechsteFrage();
  });
});

//Zeige nächste Frage im Quiz
function zeigeNaechsteFrage() {
  if (aktuelleFrage >= fragen.length) {
    zeigeStatistik(richtigeAntworten, fragen.length); //Quizende
    return;
  }

  const frageObj = fragen[aktuelleFrage];
  const antworten = [...frageObj.l];
  const korrekt = antworten[frageObj.correctIndex];

  // Antworten mischen
  const gemischt = antworten
    .map((text) => ({ text, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.text);


  // Frage anzeigen und Antwort auswerten
  zeigeQuizfrage(frageObj.a, gemischt, (auswahl) => {
    if (auswahl === korrekt) {
      richtigeAntworten++;
    }

    aktuelleFrage++;
    zeigeNaechsteFrage(); // Nächste Frage zeigen
  }, frageObj.note || null);

  zeigeFortschritt(aktuelleFrage + 1, fragen.length);
}

//Startet externes Quiz
async function starteExternesQuiz() {
  let punktzahl = 0;
  let anzahl = 5;

  for (let i = 0; i < anzahl; i++) {
    const daten = await ladeExterneFrage();

    //Frage anzeigen und auf Antwort davon warten
    await new Promise(resolve => {
      zeigeQuizfrage(daten.frage, daten.antworten, async (auswahl) => {
        const korrekt = await pruefeExterneAntwort(daten.id, auswahl);
        if (korrekt) punktzahl++;
        resolve(); // nächste Frage
      });
    });

    zeigeFortschritt(i + 1, anzahl);
  }

  zeigeStatistik(punktzahl, anzahl);// Beenden von Quiz
}