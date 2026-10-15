// Clean, charming sound generator using native Web Audio API
// No external assets required, 100% reliable and instantaneous.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a sparkling fairy chime when she cheers up or when hearts are clicked
 */
export function playSparkleChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

    gain.gain.setValueAtTime(0, now + idx * 0.07);
    gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.07);
    osc.stop(now + idx * 0.07 + 0.85);
  });
}

/**
 * Play a cardboard flap peel / rustle sound
 */
export function playCardboardUnfold() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Cardboard friction / tape peel burst
  const bufferSize = Math.floor(ctx.sampleRate * 0.1);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(500, now);
  filter.frequency.exponentialRampToValueAtTime(250, now + 0.1);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.11);

  // Soft low pop thud of cardboard flap creasing
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.09);

  oscGain.gain.setValueAtTime(0.2, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

/**
 * Play celebration chime chords
 */
export function playCelebration() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major celebratory chord

  chord.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.05);

    gain.gain.setValueAtTime(0, now + idx * 0.05);
    gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.05 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.05);
    osc.stop(now + idx * 0.05 + 1.25);
  });
}

/**
 * Play a gentle bubble pop sound
 */
export function playBubblePop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.11);
}

/**
 * Play a warm soft heartbeat thud
 */
export function playHeartbeat() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [0, 0.22].forEach((offset, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(idx === 0 ? 80 : 70, now + offset);
    osc.frequency.exponentialRampToValueAtTime(45, now + offset + 0.12);

    gain.gain.setValueAtTime(0.2, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + offset);
    osc.stop(now + offset + 0.2);
  });
}

/**
 * Play a sweet music box note
 */
export function playMusicBoxNote(freq: number, duration = 1.2) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Mix a little harmonic richness for music box feel
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.05);
}

// Background lullaby melody player
let isMusicBoxPlaying = false;
let musicBoxTimeout: number | null = null;

const melodyNotes = [
  // Sweet gentle lullaby / romance tune: Twinkle / Canon / Dreamy arpeggios
  523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 587.33,
  523.25, 587.33, 659.25, 523.25, 659.25, 587.33, 440.00, 523.25,
  659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 587.33
];

export function toggleMusicBox(onStateChange?: (playing: boolean) => void) {
  if (isMusicBoxPlaying) {
    stopMusicBox();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startMusicBox();
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startMusicBox() {
  const ctx = getAudioContext();
  if (!ctx) return;
  isMusicBoxPlaying = true;

  let noteIndex = 0;
  function step() {
    if (!isMusicBoxPlaying) return;
    const freq = melodyNotes[noteIndex % melodyNotes.length];
    playMusicBoxNote(freq, 1.4);
    noteIndex++;
    musicBoxTimeout = window.setTimeout(step, 650);
  }

  step();
}

export function stopMusicBox() {
  isMusicBoxPlaying = false;
  if (musicBoxTimeout) {
    clearTimeout(musicBoxTimeout);
    musicBoxTimeout = null;
  }
}

export function getIsMusicBoxPlaying() {
  return isMusicBoxPlaying;
}
