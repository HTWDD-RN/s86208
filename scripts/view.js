'use strict';

// Thema-Auswahl mit Callback für Klick auf Button
export function zeigeAuswahl(onThemaGewaehlt) {
  const buttons = document.querySelectorAll('.aufgaben-grid button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const thema = button.textContent;
      onThemaGewaehlt(thema);
    });
  });
}

export function zeigeQuizfrage(frage, antworten, onAntwortGewaehlt, note = null) {
  // Startseite ausblenden, Quizbereich einblenden
  document.querySelector('.aufgaben-grid').style.display = 'none';
  document.getElementById('quiz-bereich').style.display = 'flex';

  // Frage anzeigen
  const frageElement = document.getElementById('quiz-frage');
  frageElement.innerHTML = frage;

  const container = document.getElementById('antwort-buttons');
  container.innerHTML = ''; // vorherige Inhalte löschen

  // Notenanzeige
    if (note) {
    const frageElement = document.getElementById('quiz-frage');
    frageElement.innerHTML = frage;
    //Notenanzeige mit Vexflow
    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'noten-frage';
    frageElement.appendChild(canvasContainer);

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(canvasContainer, VF.Renderer.Backends.SVG);
    renderer.resize(220, 150);
    const context = renderer.getContext();

    const vexKey = note.replace(/([A-G])(#?)(\d)/i, (_, p1, p2, p3) => `${p1.toLowerCase()}${p2}/${p3}`);
    const stave = new VF.Stave(10, 40, 180);
    stave.addClef("treble").setContext(context).draw();

    const staveNote = new VF.StaveNote({
        clef: "treble",
        keys: [vexKey],
        duration: "q"
    });

    const voice = new VF.Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables([staveNote]);
    new VF.Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(context, stave);


    const container = document.getElementById('antwort-buttons');
    container.innerHTML = '';
  // Piano für Antwort
    const pianoWrapper = document.createElement('div');
    pianoWrapper.className = 'piano';

    const whiteNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    const blackNotesMap = {
    0: "C#4",
    1: "D#4",
    3: "F#4",
    4: "G#4",
    5: "A#4"
    };


    whiteNotes.forEach((note, index) => {
    const whiteKey = document.createElement('div');
    whiteKey.className = 'white-key';
    whiteKey.dataset.note = note;
    whiteKey.onclick = () => {
        spieleTon(note);
        onAntwortGewaehlt(note);
    };

    //Schwarzr Tasten einfügen
    if (blackNotesMap[index]) {
        const blackKey = document.createElement('div');
        blackKey.className = 'black-key';
        blackKey.dataset.note = blackNotesMap[index];
        blackKey.onclick = (e) => {
        e.stopPropagation();
        spieleTon(blackNotesMap[index]);
        onAntwortGewaehlt(blackNotesMap[index]);
        };

        blackKey.style.left = `${index * 50 + 35}px`; 
        pianoWrapper.appendChild(blackKey);
    }

    pianoWrapper.appendChild(whiteKey);
    });


    container.appendChild(pianoWrapper);
    

  } else {
    // normale Fragen falls keine Noten
    antworten.forEach(text => {
      const button = document.createElement('button');
      button.innerHTML = text;
      button.onclick = () => onAntwortGewaehlt(text);
      container.appendChild(button);
    });
  }

  // Katex für Matheformeln
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.getElementById('quiz-bereich'), {
      delimiters: [
        { left: "\\(", right: "\\)", display: false },
        { left: "$$", right: "$$", display: true }
      ]
    });
  }
}
// Fortschrittsleiste aktualisieren
export function zeigeFortschritt(aktuell, gesamt) {
  const bar = document.getElementById('fortschritt-bar');
  const prozent = Math.round((aktuell / gesamt) * 100);
  bar.style.width = `${prozent}%`;
}

// Statistik am Ende
export function zeigeStatistik(richtig, gesamt) {
  document.getElementById('quiz-bereich').style.display = 'none';
  const statistikDiv = document.getElementById('statistik-bereich');
  statistikDiv.style.display = 'block';
  statistikDiv.innerHTML = `
    <h2>Ergebnis</h2>
    <p>Du hast ${richtig} von ${gesamt} Fragen richtig beantwortet.</p>
    <button onclick="window.location.reload()">Nochmal spielen</button>
  `;
}

// Ton für Pianonotenauswahl
function spieleTon(noteName) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    const freqs = {
    "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13,
    "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30,
    "A4": 440.00, "A#4": 466.16, "B4": 493.88, "C5": 523.25
    };


    const freq = freqs[noteName];
    if (!freq) return;

    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5); 
}