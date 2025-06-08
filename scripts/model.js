'use strict';
// Basis-URL für die REST-API des externen Quiz-Servers
const BASE_URL = "https://idefix.informatik.htw-dresden.de:8888/api";
const USERNAME = "s86208@htw-dresden.de";
const PASSWORD = "meinpasswort";

/**
 * Erstellt den HTTP Authorization-Header im Basic-Auth-Format
 */
function generateBasicAuthHeader(user, pw) {
  const token = btoa(`${user}:${pw}`);
  return `Basic ${token}`;
}

let fragenDaten = null;
/**
 * Holt eine zufällige Frage vom externen Quizserver via REST-API
 */
export async function ladeExterneFrage() {
  const res = await fetch(`${BASE_URL}/quizzes/`, {
    method: "GET",
    headers: {
      "Authorization": generateBasicAuthHeader(USERNAME, PASSWORD)
    }
  });

  if (!res.ok) {
    throw new Error("Fehler beim Laden der externen Frage");
  }

  const json = await res.json();
   // Wähle zufällig eine der geladenen Fragen
  const quiz = json.content[Math.floor(Math.random() * json.content.length)];

  // Antworten mischen
  const gemischt = quiz.options
    .map((opt) => ({ text: opt, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.text);

  return {
    id: quiz.id,
    frage: quiz.title + "<br>" + quiz.text, // Titel + Fragetext
    antworten: gemischt,
    korrekteAntwort: quiz.options[quiz.answer?.[0]] // Debug
  };
}

/**
 * Sendet eine Antwort zum Server zur Auswertung
 */
export async function pruefeExterneAntwort(quizId, antwortIndex) {
  const res = await fetch(`${BASE_URL}/quizzes/${quizId}/solve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": generateBasicAuthHeader(USERNAME, PASSWORD)
    },
    body: JSON.stringify([antwortIndex])
  });

  if (!res.ok) {
    throw new Error("Antwortübermittlung fehlgeschlagen");
  }

  const result = await res.json();
  return result.success;
}

/**
 * Lädt die lokal gespeicherten Aufgaben
 */
export async function ladeFragen() {
  if (!fragenDaten) {
    const res = await fetch('data/aufgaben.json');
    fragenDaten = await res.json();
  }
  return fragenDaten;
}
