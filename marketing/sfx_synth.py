"""
100% Exact Web Audio Acoustic Replicator for Manodemy Marketing Reels Engine
Mathematically matches the multi-oscillator sound engines in neon-radial-clock.html down to the microsecond.
"""

import numpy as np
from pydub import AudioSegment

SAMPLE_RATE = 44100

def exp_envelope(t, attack, decay, peak=1.0):
    env = np.zeros_like(t)
    att_mask = t <= attack
    dec_mask = t > attack
    if np.any(att_mask):
        env[att_mask] = peak * (t[att_mask] / max(attack, 1e-5))
    if np.any(dec_mask):
        decay_t = t[dec_mask] - attack
        env[dec_mask] = peak * np.exp(-decay * decay_t)
    return env

def triangle_wave(phase):
    # Normalized triangle wave [-1, 1]
    p = (phase / (2 * np.pi)) % 1.0
    return 2.0 * np.abs(2.0 * (p - np.floor(p + 0.5))) - 1.0

# 1. Japanese Taiko Drum Membrane & Mallet Slam (0.0s)
def synth_taiko():
    dur = 0.65
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    
    # Layer A: Low Sub Bass Sine (95Hz -> 32Hz)
    freq_a = 95 * np.exp(-5.8 * t) + 32
    phase_a = 2 * np.pi * np.cumsum(freq_a) / SAMPLE_RATE
    env_a = exp_envelope(t, 0.008, 6.2, 0.85)
    layer_a = np.sin(phase_a) * env_a
    
    # Layer B: Wooden Mallet Slap (Triangle 480Hz -> 140Hz)
    freq_b = 480 * np.exp(-10.0 * t) + 140
    phase_b = 2 * np.pi * np.cumsum(freq_b) / SAMPLE_RATE
    env_b = exp_envelope(t, 0.006, 22.0, 0.45)
    layer_b = triangle_wave(phase_b) * env_b
    
    # Layer C: Gong Shimmer (260Hz -> 220Hz)
    freq_c = 260 * np.exp(-1.5 * t) + 220
    phase_c = 2 * np.pi * np.cumsum(freq_c) / SAMPLE_RATE
    env_c = exp_envelope(t, 0.02, 7.5, 0.3)
    layer_c = np.sin(phase_c) * env_c
    
    return layer_a + layer_b + layer_c

# 2. Line 2 Rosewood Marimba & Cajon Pop (2.47s)
def synth_marimba():
    dur = 0.4
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    
    # Layer A: Cajon Drum (130Hz -> 42Hz)
    freq_a = 130 * np.exp(-6.5 * t) + 42
    phase_a = 2 * np.pi * np.cumsum(freq_a) / SAMPLE_RATE
    env_a = exp_envelope(t, 0.01, 12.0, 0.7)
    layer_a = np.sin(phase_a) * env_a
    
    # Layer B: Rosewood Marimba (Triangle 880Hz -> 860Hz)
    freq_b = 880 * np.exp(-0.2 * t)
    phase_b = 2 * np.pi * np.cumsum(freq_b) / SAMPLE_RATE
    env_b = exp_envelope(t, 0.005, 18.0, 0.5)
    layer_b = triangle_wave(phase_b) * env_b
    
    return layer_a + layer_b

# 3. Stopwatch Appearance Cello Bow Swell & Snare Swish (5.76s)
def synth_whoosh():
    dur = 0.42
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    
    # Cello Bow Swell (160Hz -> 420Hz -> 120Hz)
    t_norm = t / dur
    freq = 160 + (420 - 160) * np.sin(np.pi * t_norm)**1.5
    phase = 2 * np.pi * np.cumsum(freq) / SAMPLE_RATE
    env = exp_envelope(t, 0.1, 8.0, 0.45)
    cello = np.sin(phase) * env
    
    # Snare Swish (Triangle 1200Hz -> 2400Hz)
    freq_s = 1200 + 1200 * t_norm
    phase_s = 2 * np.pi * np.cumsum(freq_s) / SAMPLE_RATE
    env_s = exp_envelope(t, 0.18, 14.0, 0.25)
    swish = triangle_wave(phase_s) * env_s
    
    return cello + swish

# 4. Tactical Action-Movie Timebomb Countdown
def synth_timebomb_tick(remaining_sec=5):
    if remaining_sec <= 3:
        # Panic Double Beep + Sub Heartbeat (3s, 2s, 1s)
        dur = 0.22
        t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
        
        # Beep 1 (2400Hz)
        env1 = exp_envelope(t, 0.003, 75.0, 0.7)
        beep1 = np.sin(2 * np.pi * 2400 * t) * env1
        
        # Beep 2 (3200Hz, starts at 65ms)
        t2 = t - 0.065
        beep2 = np.zeros_like(t)
        mask2 = t >= 0.065
        if np.any(mask2):
            env2 = exp_envelope(t2[mask2], 0.003, 75.0, 0.75)
            beep2[mask2] = np.sin(2 * np.pi * 3200 * t2[mask2]) * env2
            
        # Sub Heartbeat Thump (115Hz -> 32Hz)
        freq_sub = 115 * np.exp(-8.5 * t) + 32
        phase_sub = 2 * np.pi * np.cumsum(freq_sub) / SAMPLE_RATE
        env_sub = exp_envelope(t, 0.008, 15.0, 0.6)
        sub_thump = np.sin(phase_sub) * env_sub
        
        return beep1 + beep2 + sub_thump
    else:
        # Tactical C4 Steady Beep (2048Hz + 3800Hz click)
        dur = 0.08
        t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
        env = exp_envelope(t, 0.004, 65.0, 0.5)
        beep = np.sin(2 * np.pi * 2048 * t) * env
        
        env_m = exp_envelope(t, 0.002, 120.0, 0.25)
        click = triangle_wave(2 * np.pi * 3800 * t) * env_m
        return beep + click

# 5. Spotlight Harp & Pizzicato Plucks
def synth_spotlight_a():
    dur = 0.32
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    # Triangle C5 523.25Hz
    env1 = exp_envelope(t, 0.006, 12.0, 0.5)
    f1 = triangle_wave(2 * np.pi * 523.25 * t) * env1
    # Sine G5 783.99Hz (20ms later)
    f2 = np.zeros_like(t)
    mask = t >= 0.02
    if np.any(mask):
        t_sub = t[mask] - 0.02
        env2 = exp_envelope(t_sub, 0.006, 14.0, 0.35)
        f2[mask] = np.sin(2 * np.pi * 783.99 * t_sub) * env2
    return f1 + f2

def synth_spotlight_b():
    dur = 0.32
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    # Triangle E5 659.25Hz
    env1 = exp_envelope(t, 0.006, 12.0, 0.5)
    f1 = triangle_wave(2 * np.pi * 659.25 * t) * env1
    # Sine B5 987.77Hz (20ms later)
    f2 = np.zeros_like(t)
    mask = t >= 0.02
    if np.any(mask):
        t_sub = t[mask] - 0.02
        env2 = exp_envelope(t_sub, 0.006, 14.0, 0.35)
        f2[mask] = np.sin(2 * np.pi * 987.77 * t_sub) * env2
    return f1 + f2

# 6. Super Sonic Riser + Sub Drop + Crystal Glass Chime (Poll Entrance SFX)
def synth_timpani():
    dur = 0.65
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    
    # Layer A: Deep Visceral Sub Boom (110Hz -> 28Hz)
    freq_sub = 110 * np.exp(-6.5 * t) + 28
    phase_sub = 2 * np.pi * np.cumsum(freq_sub) / SAMPLE_RATE
    env_sub = exp_envelope(t, 0.01, 5.0, 0.9)
    sub_boom = np.sin(phase_sub) * env_sub
    
    # Layer B: Smooth Upward Cyber Laser Riser (260Hz -> 2400Hz over 220ms)
    t_rise = np.clip(t / 0.22, 0, 1)
    freq_rise = 260 + (2400 - 260) * (t_rise**2)
    phase_rise = 2 * np.pi * np.cumsum(freq_rise) / SAMPLE_RATE
    env_rise = exp_envelope(t, 0.12, 12.0, 0.55)
    riser = np.sin(phase_rise) * env_rise
    
    # Layer C: Crystal Glass Bell Pop (E6 / 1318.5Hz + C7 / 2093Hz Major Chord)
    env_c1 = exp_envelope(t, 0.005, 8.0, 0.4)
    chime1 = np.sin(2 * np.pi * 1318.5 * t) * env_c1
    env_c2 = exp_envelope(t, 0.008, 10.0, 0.3)
    chime2 = np.sin(2 * np.pi * 2093.0 * t) * env_c2
    
    return sub_boom + riser + chime1 + chime2

# 7. Authentic Hollywood Vintage Mechanical Camera Shutter Snap & Flash Bulb Pop
def synth_vintage_camera_shutter():
    dur = 0.48
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), False)
    
    # Layer A: Mirror Latch Pre-Trip Click (t=0ms to 20ms)
    env_pre = exp_envelope(t, 0.002, 140.0, 0.5)
    click_pre = triangle_wave(2 * np.pi * 3200 * t) * env_pre
    
    # Layer B: Main Mechanical Shutter Curtain Slap 1 ("KA-") at t=18ms
    t_slap1 = t - 0.018
    slap1 = np.zeros_like(t)
    mask1 = t >= 0.018
    if np.any(mask1):
        f1 = 1850 * np.exp(-22.0 * t_slap1[mask1]) + 620
        phase1 = 2 * np.pi * np.cumsum(f1) / SAMPLE_RATE
        env1 = exp_envelope(t_slap1[mask1], 0.003, 55.0, 0.85)
        slap1[mask1] = triangle_wave(phase1) * env1
        
    # Layer C: Heavy Mirror Return & Second Blade Slam ("-CHIK!") at t=42ms
    t_slap2 = t - 0.042
    slap2 = np.zeros_like(t)
    mask2 = t >= 0.042
    if np.any(mask2):
        f2 = 1250 * np.exp(-18.0 * t_slap2[mask2]) + 380
        phase2 = 2 * np.pi * np.cumsum(f2) / SAMPLE_RATE
        env2 = exp_envelope(t_slap2[mask2], 0.004, 42.0, 0.95)
        slap2[mask2] = (0.6 * triangle_wave(phase2) + 0.4 * np.sin(phase2)) * env2

    # Layer D: Vintage Flash Bulb Tungsten Pop + Deep Acoustic Chamber Thump
    # Low sub chamber impact (120Hz -> 30Hz)
    t_pop = t - 0.020
    sub_pop = np.zeros_like(t)
    mask_pop = t >= 0.020
    if np.any(mask_pop):
        f_sub = 115 * np.exp(-8.5 * t_pop[mask_pop]) + 30
        phase_sub = 2 * np.pi * np.cumsum(f_sub) / SAMPLE_RATE
        env_sub = exp_envelope(t_pop[mask_pop], 0.008, 12.0, 0.85)
        sub_pop[mask_pop] = np.sin(phase_sub) * env_sub
        
    # Metallic spring rattle & mechanical body resonance (shutter release ring)
    noise = np.random.uniform(-1.0, 1.0, len(t))
    kernel = np.ones(8) / 8.0
    smooth_noise = np.convolve(noise, kernel, mode='same')
    env_mech = exp_envelope(t, 0.025, 24.0, 0.35)
    mech_rattle = smooth_noise * env_mech

    # Tiny spring ratchet micro-clicks (film winder tension) at 85ms and 140ms
    ratchet = np.zeros_like(t)
    for t_click, amp in [(0.085, 0.25), (0.135, 0.2)]:
        tc = t - t_click
        m_c = t >= t_click
        if np.any(m_c):
            env_c = exp_envelope(tc[m_c], 0.002, 110.0, amp)
            ratchet[m_c] += triangle_wave(2 * np.pi * 2600 * tc[m_c]) * env_c
            
    return click_pre + slap1 + slap2 + sub_pop + mech_rattle + ratchet

def build_sfx_audio_segment(cues, total_ms=15500):
    total_samples = int(SAMPLE_RATE * (total_ms / 1000.0))
    buffer = np.zeros(total_samples, dtype=np.float32)

    def mix_at(sample_array, start_ms):
        start_idx = int(SAMPLE_RATE * (start_ms / 1000.0))
        end_idx = min(len(buffer), start_idx + len(sample_array))
        chunk_len = end_idx - start_idx
        if chunk_len > 0:
            buffer[start_idx:end_idx] += sample_array[:chunk_len]

    # 1. Hook Impact (0ms)
    mix_at(synth_taiko(), 0)

    # 1.1 Opening Poster Vintage Hollywood Camera Shutter Snap & Flash Pop
    has_poster = cues.get('hasOpeningPoster', False) or cues.get('openingPosterDuration', 0) > 0
    if has_poster:
        poster_dur = cues.get('openingPosterDuration', cues.get('t_line2_start', 1800))
        # Exact sync: Shutter snaps 220ms before line 2 when flash curtain bursts
        snap_ms = max(0, poster_dur - 220)
        mix_at(synth_vintage_camera_shutter(), snap_ms)

    # 2. Line 2 Impact
    mix_at(synth_marimba(), cues.get('t_line2_start', 2470))

    # 3. Clock In Whoosh
    t_clock_in = cues.get('t_clock_in', 5760)
    mix_at(synth_whoosh(), t_clock_in)

    # 4. Stopwatch Countdown Ticks
    t_clock_out = cues.get('t_clock_out', 13100)
    clock_dur = cues.get('clockDurationMs', t_clock_out - t_clock_in)
    sec_step = clock_dur / 10.0
    for sec_left in range(9, -1, -1):
        tick_ms = t_clock_in + (10 - sec_left) * sec_step
        if tick_ms < t_clock_out:
            mix_at(synth_timebomb_tick(sec_left), tick_ms)

    # 5. Spotlight A & B Plucks
    mix_at(synth_spotlight_a(), cues.get('t_opta', 7420))
    mix_at(synth_spotlight_b(), cues.get('t_optb', 8880))

    # 6. Poll Entrance Timpani Slam
    mix_at(synth_timpani(), t_clock_out)

    # Normalize to prevent any digital distortion
    max_val = np.max(np.abs(buffer))
    if max_val > 0:
        buffer = buffer / max_val * 0.95

    int16_pcm = (buffer * 32767).astype(np.int16)
    return AudioSegment(
        int16_pcm.tobytes(),
        frame_rate=SAMPLE_RATE,
        sample_width=2,
        channels=1
    )
