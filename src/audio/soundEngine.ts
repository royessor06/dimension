/**
 * Generative Web Audio API Engine for DIMENSION Lab
 * 100% procedural, zero external 404 dependencies.
 * Creates an ethereal ambient sci-fi soundscape and interactive haptic tones.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isInitialized: boolean = false;

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low ambient resonant filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4.0, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Sub drone osc 1 (deep A1 = ~55Hz)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);
      this.droneOsc1.connect(this.filter);
      this.droneOsc1.start();

      // Drone osc 2 detuned harmonic
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(110.5, this.ctx.currentTime);
      
      const drone2Gain = this.ctx.createGain();
      drone2Gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.droneOsc2.connect(drone2Gain);
      drone2Gain.connect(this.filter);
      this.droneOsc2.start();

      this.isInitialized = true;
    } catch {
      // AudioContext not permitted before gesture
    }
  }

  public toggleMute(): boolean {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.25;
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.3);
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Modulate ambient filter with user scroll / mouse speed
  public modulateAtmosphere(intensity: number) {
    if (!this.filter || !this.ctx || this.isMuted) return;
    const freq = Math.min(1800, 160 + intensity * 900);
    this.filter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.1);
  }

  // Crystalline chime when interacting with 3D nodes
  public playChime(freq = 587.33) { // D5
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Exponential decay
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch {
      // ignore
    }
  }

  // Shockwave impact sound on 3D sculpture click
  public playShockwave() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // Sub boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.5);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(now + 0.6);

      // Shimmer ping
      this.playChime(880);
      setTimeout(() => this.playChime(1174.66), 90);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
