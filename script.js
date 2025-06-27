//Geluidseffecten voor de acties
const soundPeukie = new Audio("audio/peukie.m4a");
const soundBiertje = new Audio("audio/biertje.m4a");
const soundMic = new Audio("audio/microfoon.m4a");

// Timer (in secondes)
const durations = {
  bier: 20,
  peuk: 30,
  mic: 50
};

// Huidige tijd per actie (loopt op tot max)
const timers = {
  bier: 0,
  peuk: 0,
  mic: 0
};

// Interval referenties per actie
const intervals = {};

// Werkt elke seconde de bijbehorende balk bij en toont tekst op de helft
// type: 'beer', 'smoke' of 'mic'
// Ik heb hier chatgpt om hulp gevraagd bij het correct tonen van tekstwolkjes op het juiste moment, ik liep hier namelijk een beetje vast.
function updateBar(type) {
  const fill = document.getElementById(`${type}-bar`);
  const percent = ((durations[type] - timers[type]) / durations[type]) * 100;
  fill.style.width = `${percent}%`;

  const speech = document.getElementById('speech');

  if (timers[type] === durations[type] / 2) {
    switch (type) {
      case 'bier':
        speech.textContent = 'Ik heb trek in een pilsie';
        break;
      case 'peuk':
        speech.textContent = 'Ik zou wel een peukie lusten';
        break;
      case 'mic':
        speech.textContent = 'Ik moet zo optreden, maar heb wel mn microfoon nodig';
        break;
    }
    speech.style.display = 'block';
    setTimeout(() => { speech.style.display = 'none'; }, 3000);
  }

  timers[type]++;

  if (timers[type] > durations[type]) {
    clearInterval(intervals[type]);
    fill.style.width = '0%';
  }
}

// Start een timer voor een bepaald type (balk en tekst worden geactiveerd)
// type: 'beer', 'smoke' of 'mic'
function startTimer(type) {
  clearInterval(intervals[type]);
  timers[type] = 0;
  intervals[type] = setInterval(() => updateBar(type), 1000);
}

// Reset een timer en speel geluid en animatie
// type: 'beer', 'smoke' of 'mic'
function resetTimer(type) {
  startTimer(type);
  const character = document.getElementById("character");
  let newImage = "";

  if (type === 'bier') {
    soundBiertje.currentTime = 0;
    soundBiertje.play();
    newImage = "img/hazesbiertje.png";
  } else if (type === 'peuk') {
    soundPeukie.currentTime = 0;
    soundPeukie.play();
    newImage = "img/hazespeuk.png";
  } else if (type === 'mic') {
    soundMic.currentTime = 0;
    soundMic.play();
    newImage = "img/hazesmicrofoon.png";
  }

  character.src = newImage;
  setTimeout(() => {
    character.src = "img/defaulthazes.png";
  }, 2000);
}

// Start alle timers bij het laden van de pagina
startTimer('bier');
startTimer('peuk');
startTimer('mic');