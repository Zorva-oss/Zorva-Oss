/**
 * Web Audio API synthesizer for ambient futuristic sound tracks
 * Provides realistic playback, BPM pulses, and vinyl disc interaction.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(): boolean {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playSynthwaveBeat();
      return true;
    }
  }

  public playSynthwaveBeat() {
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    // Chord progressions: F minor, Ab, Eb, Bb synth arpeggios
    const notes = [174.61, 207.65, 261.63, 311.13, 349.23, 392.00, 466.16];
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime;

      // Bass drone / kick pulse
      if (step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.type = 'sine';
        kickOsc.frequency.setValueAtTime(120, t);
        kickOsc.frequency.exponentialRampToValueAtTime(38, t + 0.12);
        kickGain.gain.setValueAtTime(0.35, t);
        kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        kickOsc.connect(kickGain);
        kickGain.connect(this.masterGain);
        kickOsc.start(t);
        kickOsc.stop(t + 0.18);
      }

      // Synthwave melodic pluck
      const noteFreq = notes[(step * 3) % notes.length];
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(noteFreq, t);

      // Low pass filter for warm analog feel
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800 + Math.sin(step * 0.5) * 400, t);

      noteGain.gain.setValueAtTime(0.08, t);
      noteGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.25);

      step++;
    };

    // 144 BPM = ~104ms per sixteenth note
    this.intervalId = window.setInterval(playStep, 108);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new SoundEngine();
