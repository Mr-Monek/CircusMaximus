'use client'

import { useState } from 'react'

// ─── HOTSPOT DATA ─────────────────────────────────────────────────────────────
const HOTSPOTS = [
  {
    id: 'track',
    label: 'The Track',
    fx: 0.1709,
    fy: 0.2315,
    title: 'Via Circensis',
    subtitle: 'The Grand Racing Track',
    body: 'Stretching 621 meters in length, the Circus Maximus was the longest racetrack in the Roman world. Charioteers raced seven grueling laps around the central spina — a combined distance of over 8 kilometers, reaching speeds that terrified and thrilled the hundreds of thousands watching from above.',
  },
  {
    id: 'spina',
    label: 'The Spina',
    fx: 0.4318,
    fy: 0.3956,
    title: 'Spina',
    subtitle: 'The Central Spine',
    body: 'The long central barrier around which all chariots raced was adorned with statues, shrines, and elaborate ornaments. Seven wooden eggs and seven bronze dolphins tracked each completed lap. Two massive Egyptian obelisks — later moved to the Piazza del Popolo and Piazza di San Giovanni — once rose from its center.',
  },
  {
    id: 'carceres',
    label: 'Starting Gates',
    fx: 0.8408,
    fy: 0.7416,
    title: 'Carceres',
    subtitle: 'The Starting Gates',
    body: 'Twelve arched starting gates were set in a slight curve across the straight end — angled to equalize each competitor\'s distance to the first turn. Races began when the praetor dropped a white cloth, releasing all gates simultaneously. The rush to the first corner was the most dangerous moment of every race.',
  },
  {
    id: 'cavea',
    label: 'The Crowd',
    fx: 0.7314,
    fy: 0.4682,
    title: 'Cavea',
    subtitle: 'The Seating Terraces',
    body: 'At its peak, over 250,000 spectators packed the Circus Maximus — more than any other sporting venue in history. The Emperor watched from a private box connected directly to the Palatine Hill. Senators held marble front-row seats; the general public filled the massive wooden tiers rising far above the track.',
  },
  {
    id: 'racers',
    label: 'Our Racers',
    fx: 0.7929,
    fy: 0.6289,
    title: 'Quadrigae Nostrae',
    subtitle: 'The Competitors',
    body: 'Our model features two motorized racers competing around the track in real time. Each racer\'s speed is randomized at the start of every race — just as ancient charioteers competed with different horses on any given day. Watch carefully, place your bets, and may the swiftest claim glory.',
  },
  {
    id: 'credits',
    label: 'About',
    fx: 0.1094,
    fy: 0.8527,
    title: 'Aedificatores',
    subtitle: 'Project Credits',
    body: 'This Circus Maximus replica was designed and built as a GT project. The model features two motorized racers, randomized speed mechanics, and a live betting leaderboard. Scroll down to meet the builders.',
  },
]

// ─── ZOOM MATH ────────────────────────────────────────────────────────────────
function getZoomTransform(hs, scale = 1.8) {
  if (!hs) return 'scale(1) translate(0%, 0%)'
  const tx = (0.5 - hs.fx) * 100
  const ty = (0.5 - hs.fy) * 100
  return `scale(${scale}) translate(${tx}%, ${ty}%)`
}

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function CircusMaximusPage() {
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [zoomed, setZoomed]               = useState(false)
  const [panelVisible, setPanelVisible]   = useState(false)
  const [mode, setMode]                   = useState('fancy')

  const handleHotspot = (hs) => {
    if (zoomed) return
    setActiveHotspot(hs)
    setZoomed(true)
    setTimeout(() => setPanelVisible(true), 750)
  }

  const handleClose = () => {
    setPanelVisible(false)
    setTimeout(() => {
      setZoomed(false)
      setTimeout(() => setActiveHotspot(null), 850)
    }, 300)
  }

  const handleToggle = () => {
    if (zoomed) handleClose()
    setTimeout(() => setMode(m => m === 'fancy' ? 'simple' : 'fancy'), zoomed ? 1200 : 0)
  }

  const zoomTransform = zoomed ? getZoomTransform(activeHotspot) : 'scale(1) translate(0%, 0%)'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:         #2C1608;
          --gold:        #D4A84B;
          --gold-bright: #F0C86A;
          --gold-dim:    #8B6A1A;
          --gold-muted:  #6B500F;
          --parch:       #EDD9A4;
          --parch-mid:   #C8A86A;
          --parch-dim:   #A88848;
          --page:        #0B0804;
          --panel-bg:    #100C05;
          --border:      rgba(212,168,75,0.22);
          --border-mid:  rgba(212,168,75,0.45);
        }

        .cm-root {
          font-family: 'Cinzel', serif;
          background: var(--page);
          color: var(--parch);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ─── Noise grain overlay ─── */
        .cm-root::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.35;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
        }

        /* ─── Hotspot marker ─── */
        .cm-hotspot {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 10;
        }
        .cm-hotspot-inner {
          width: 14px;
          height: 14px;
          background: radial-gradient(circle at 38% 32%, #F5D878, #C9943A 55%, #7A5010);
          border-radius: 50%;
          border: 1.5px solid rgba(245,220,140,0.75);
          position: relative;
          z-index: 2;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          box-shadow:
            0 0 0 2px rgba(201,148,58,0.25),
            0 0 10px rgba(201,148,58,0.85),
            0 0 22px rgba(201,148,58,0.35),
            inset 0 1px 2px rgba(255,230,130,0.4);
        }
        .cm-hotspot:hover .cm-hotspot-inner {
          transform: scale(1.4);
          box-shadow:
            0 0 0 3px rgba(201,148,58,0.3),
            0 0 16px rgba(201,148,58,1),
            0 0 34px rgba(201,148,58,0.55),
            inset 0 1px 3px rgba(255,230,130,0.5);
        }
        .cm-hotspot-pulse {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid rgba(212,168,75,0.7);
          background: transparent;
          animation: cm-pulse 2.4s ease-out infinite;
        }
        .cm-hotspot-label {
          position: absolute;
          top: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 7px;
          letter-spacing: 0.16em;
          color: var(--ink);
          font-family: 'Cinzel', serif;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(234,212,148,0.92);
          border: 0.5px solid rgba(90,48,16,0.4);
          padding: 2px 6px 1px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .cm-hotspot:hover .cm-hotspot-label { opacity: 1; }

        @keyframes cm-pulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.65; }
          70%  { opacity: 0.1; }
          100% { transform: translate(-50%,-50%) scale(4.5); opacity: 0; }
        }

        /* ─── Arena viewport ─── */
        .cm-viewport {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          height: clamp(420px, 75vh, 800px);
          background:
            radial-gradient(ellipse 80% 70% at 50% 52%, #1D1106 0%, #0B0804 72%);
        }
        /* Subtle stone-floor grid */
        .cm-viewport::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(212,168,75,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,75,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .cm-zoom-wrap {
          transition: transform 0.88s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          width: 90%;
          max-width: 920px;
          flex-shrink: 0;
          padding: 24px 0;
          /* Torch-glow halo around the map */
          filter: drop-shadow(0 0 40px rgba(180,130,40,0.18)) drop-shadow(0 8px 32px rgba(0,0,0,0.9));
        }

        /* ─── Back button ─── */
        .cm-back {
          position: absolute;
          top: 18px; left: 18px;
          z-index: 30;
          font-family: 'Cinzel', serif;
          font-size: 9.5px;
          letter-spacing: 0.2em;
          color: var(--parch-mid);
          background: rgba(11,8,4,0.92);
          border: 1px solid var(--border-mid);
          padding: 9px 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          opacity: 0;
          pointer-events: none;
          text-transform: uppercase;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .cm-back.visible { opacity: 1; pointer-events: auto; }
        .cm-back:hover {
          background: rgba(212,168,75,0.1);
          border-color: var(--gold);
          color: var(--gold);
        }

        /* ─── Info panel ─── */
        .cm-panel {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 20;
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      opacity 0.35s ease;
          pointer-events: none;
        }
        .cm-panel.visible {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .cm-panel-inner {
          background:
            linear-gradient(180deg, rgba(11,8,4,0.97) 0%, rgba(16,12,5,1) 100%);
          border-top: 1px solid rgba(212,168,75,0.3);
          padding: 16px 32px 20px 36px;
          backdrop-filter: blur(6px);
          position: relative;
          overflow: hidden;
        }
        /* Gold shimmer line at very top of panel */
        .cm-panel-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, var(--gold-dim) 20%,
            var(--gold) 50%,
            var(--gold-dim) 80%, transparent 100%);
        }

        /* ─── Rule ornament ─── */
        .cm-rule {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 11px;
        }
        .cm-rule-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,168,75,0.45), transparent);
        }

        /* ─── Close button ─── */
        .cm-close {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(212,168,75,0.35);
          background: transparent;
          color: var(--gold-dim);
          cursor: pointer;
          font-size: 17px;
          line-height: 1;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .cm-close:hover {
          background: rgba(212,168,75,0.12);
          border-color: var(--gold);
          color: var(--gold-bright);
        }

        /* ─── About section cards ─── */
        .cm-about-card {
          border: 1px solid var(--border);
          padding: 34px 32px;
          background:
            linear-gradient(145deg, rgba(212,168,75,0.04) 0%, rgba(100,60,10,0.03) 100%);
          position: relative;
          transition: border-color 0.3s ease, background 0.3s ease;
          box-shadow: inset 0 1px 0 rgba(212,168,75,0.06), 0 2px 20px rgba(0,0,0,0.4);
        }
        .cm-about-card:hover {
          border-color: rgba(212,168,75,0.4);
          background: linear-gradient(145deg, rgba(212,168,75,0.06) 0%, rgba(100,60,10,0.05) 100%);
        }
        .cm-about-corner {
          position: absolute;
          width: 10px;
          height: 10px;
        }
        /* Corner L-brackets */
        .cm-about-corner.tl { top: 8px; left: 8px; border-top: 1px solid var(--gold-muted); border-left: 1px solid var(--gold-muted); }
        .cm-about-corner.tr { top: 8px; right: 8px; border-top: 1px solid var(--gold-muted); border-right: 1px solid var(--gold-muted); }
        .cm-about-corner.bl { bottom: 8px; left: 8px; border-bottom: 1px solid var(--gold-muted); border-left: 1px solid var(--gold-muted); }
        .cm-about-corner.br { bottom: 8px; right: 8px; border-bottom: 1px solid var(--gold-muted); border-right: 1px solid var(--gold-muted); }

        /* ─── Load animations ─── */
        @keyframes cm-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cm-rise-1 { animation: cm-rise 1s 0.05s ease both; }
        .cm-rise-2 { animation: cm-rise 1s 0.22s ease both; }
        .cm-rise-3 { animation: cm-rise 1s 0.42s ease both; }
        .cm-rise-4 { animation: cm-rise 1s 0.60s ease both; }
        /* ─── Mode toggle ─── */
        .cm-toggle {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid var(--border-mid);
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto;
          width: fit-content;
          margin-top: 20px;
        }
        .cm-toggle-btn {
          padding: 8px 22px;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          background: transparent;
          color: var(--gold-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .cm-toggle-btn.active {
          background: rgba(212,168,75,0.12);
          color: var(--gold);
        }
        .cm-toggle-btn:not(.active):hover {
          color: var(--parch-dim);
        }
        .cm-toggle-divider {
          width: 1px;
          height: 28px;
          background: var(--border-mid);
          flex-shrink: 0;
        }

        /* ─── Simple view ─── */
        .cm-simple-photo {
          width: 90%;
          max-width: 920px;
          margin: 0 auto;
          display: block;
          border-radius: 4px;
          opacity: 0.9;
        }
        .cm-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
        }
        .cm-info-card {
          background: var(--page);
          padding: 32px 28px;
          transition: background 0.25s ease;
        }
        .cm-info-card:hover {
          background: rgba(212,168,75,0.04);
        }

        /* ─── View transition ─── */
        .cm-view {
          animation: cm-rise 0.5s ease both;
        }
      `}</style>

      <div className="cm-root">

        {/* ════ HEADER ════ */}
        <header style={{ textAlign: 'center', padding: '52px 24px 32px', position: 'relative', borderBottom: '1px solid var(--border)', zIndex: 10, background: 'var(--page)' }}>
          {/* Top accent lines */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-dim) 30%, var(--gold) 50%, var(--gold-dim) 70%, transparent)' }}/>

          <p className="cm-rise-1" style={{ fontSize: '9px', letterSpacing: '0.6em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>
            Replica · Anno MMXXV
          </p>

          <h1 className="cm-rise-2" style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(28px, 6.5vw, 76px)',
            fontWeight: 900,
            letterSpacing: '0.1em',
            background: 'linear-gradient(180deg, #F8E8B8 0%, #E0B84A 38%, #C9943A 62%, #7A5010 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.08,
            marginBottom: '12px',
            textShadow: 'none',
          }}>
            Circus Maximus
          </h1>

          {/* Subtitle with flanking ornaments */}
          <div className="cm-rise-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-muted))' }}/>
            <span style={{ fontSize: '9px', color: 'var(--gold-dim)' }}>✦</span>
            <p style={{ fontSize: '10.5px', letterSpacing: '0.42em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>
              The Greatest Arena of the Ancient World
            </p>
            <span style={{ fontSize: '9px', color: 'var(--gold-dim)' }}>✦</span>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, var(--gold-muted))' }}/>
          </div>

          <p className="cm-rise-4" style={{
            fontSize: '8.5px', letterSpacing: '0.26em', textTransform: 'uppercase',
            color: mode === 'fancy' ? 'rgba(180,140,60,0.4)' : 'transparent',
            display: 'inline-block',
            borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            padding: '6px 20px',
          }}>
            {mode === 'fancy' ? 'Select a point of interest to explore' : '\u00A0'}
          </p>

          {/* Mode toggle */}
          <div className="cm-toggle">
            <button
              className={`cm-toggle-btn ${mode === 'fancy' ? 'active' : ''}`}
              onClick={() => mode !== 'fancy' && handleToggle()}
            >
              Interactive
            </button>
            <div className="cm-toggle-divider"/>
            <button
              className={`cm-toggle-btn ${mode === 'simple' ? 'active' : ''}`}
              onClick={() => mode !== 'simple' && handleToggle()}
            >
              Overview
            </button>
          </div>
        </header>

        {/* ════ CONDITIONAL VIEW ════ */}
        {mode === 'fancy' ? (
          <div className="cm-view" key="fancy">
            {/* ════ ARENA ════ */}
            <section className="cm-viewport">
              <button className={`cm-back ${zoomed ? 'visible' : ''}`} onClick={handleClose}>
                ← Return to Overview
              </button>
              <div className="cm-zoom-wrap" style={{ transform: zoomTransform }}>
                <ArenaSVG />
                {HOTSPOTS.map((hs) => (
                  <div
                    key={hs.id}
                    className="cm-hotspot"
                    style={{ left: `${hs.fx * 100}%`, top: `${hs.fy * 100}%` }}
                    onClick={() => handleHotspot(hs)}
                  >
                    <div className="cm-hotspot-pulse" />
                    <div className="cm-hotspot-inner" />
                    <div className="cm-hotspot-label">{hs.label}</div>
                  </div>
                ))}
              </div>
              <div className={`cm-panel ${panelVisible ? 'visible' : ''}`}>
                <InfoPanel hotspot={activeHotspot} onClose={handleClose} />
              </div>
            </section>
            <div style={{ textAlign: 'center', padding: '14px', borderBottom: '1px solid var(--border)', zIndex: 10, background: 'var(--page)', position: 'relative' }}>
              <p style={{ fontSize: '7.5px', letterSpacing: '0.35em', color: 'rgba(140,100,30,0.4)', textTransform: 'uppercase' }}>
                Scroll to meet the builders &nbsp;↓
              </p>
            </div>
          </div>
        ) : (
          <div className="cm-view" key="simple">
            <SimpleView />
          </div>
        )}

        <AboutSection />
      </div>
    </>
  )
}

// ─── ARENA IMAGE ─────────────────────────────────────────────────────────────
function ArenaSVG() {
  return (
    <img
      src="/circus.png"
      alt="Circus Maximus model"
      style={{ width: '100%', display: 'block', borderRadius: '4px' }}
      draggable={false}
    />
  )
}

function _OldArenaSVG() {
  return (
    <svg viewBox="0 0 900 320" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block' }}
      aria-label="Circus Maximus architectural map">
      <defs>
        {/* ── Gradients ── */}
        <radialGradient id="parch-base" cx="48%" cy="45%" r="65%" gradientUnits="userSpaceOnUse"
          gradientTransform="translate(450,160) scale(1.8,1) translate(-450,-160)">
          <stop offset="0%"   stopColor="#EDD8A2"/>
          <stop offset="55%"  stopColor="#D8BC88"/>
          <stop offset="100%" stopColor="#C4A46E"/>
        </radialGradient>

        {/* Warm age spots */}
        <radialGradient id="age1" cx="18%" cy="25%" r="30%">
          <stop offset="0%" stopColor="#E8C878" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="age2" cx="82%" cy="78%" r="28%">
          <stop offset="0%" stopColor="#B89050" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <radialGradient id="age3" cx="60%" cy="15%" r="22%">
          <stop offset="0%" stopColor="#D4B870" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>

        {/* Edge vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="68%" gradientUnits="userSpaceOnUse"
          gradientTransform="translate(450,160) scale(1.9,1) translate(-450,-160)">
          <stop offset="52%" stopColor="transparent"/>
          <stop offset="100%" stopColor="#7A5020" stopOpacity="0.38"/>
        </radialGradient>

        {/* Racer gradients */}
        <radialGradient id="r1g" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#D84040"/>
          <stop offset="100%" stopColor="#5A0808"/>
        </radialGradient>
        <radialGradient id="r2g" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#4060D8"/>
          <stop offset="100%" stopColor="#08185A"/>
        </radialGradient>

        {/* ── Patterns ── */}
        {/* Cross-hatch seating (two layers) */}
        <pattern id="hatch-a" x="0" y="0" width="6" height="6"
          patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#6A3A18" strokeWidth="0.65" opacity="0.5"/>
        </pattern>
        <pattern id="hatch-b" x="0" y="0" width="10" height="10"
          patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#5A3010" strokeWidth="0.4" opacity="0.28"/>
        </pattern>

        {/* Fine horizontal sand lines for track surface */}
        <pattern id="sand" x="0" y="0" width="900" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="900" y2="0" stroke="#B89A60" strokeWidth="0.3" opacity="0.22"/>
        </pattern>

        {/* ── Filters ── */}
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="soft-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#3A1A04" floodOpacity="0.55"/>
        </filter>

        {/* Clip path for seating fill */}
        <clipPath id="outer-clip">
          <path d="M 32 22 L 728 22 A 139 139 0 0 1 728 298 L 32 298 Z"/>
        </clipPath>
        <clipPath id="track-clip">
          <path d="M 79 65 L 708 65 A 95 95 0 0 1 708 255 L 79 255 Z"/>
        </clipPath>
      </defs>

      {/* ══ PARCHMENT BACKGROUND ══ */}
      <rect width="900" height="320" fill="url(#parch-base)" rx="4"/>
      <rect width="900" height="320" fill="url(#age1)" rx="4"/>
      <rect width="900" height="320" fill="url(#age2)" rx="4"/>
      <rect width="900" height="320" fill="url(#age3)" rx="4"/>
      <rect width="900" height="320" fill="url(#vignette)" rx="4"/>

      {/* ══ DECORATIVE MAP FRAME ══ */}
      {/* Outer thick border */}
      <rect x="4"  y="4"  width="892" height="312" fill="none" stroke="#4A2A0E" strokeWidth="2.8" rx="3.5"/>
      {/* Middle fine border */}
      <rect x="9"  y="9"  width="882" height="302" fill="none" stroke="#5A3418" strokeWidth="0.9" rx="2.5"/>
      {/* Inner dashed border */}
      <rect x="13" y="13" width="874" height="294" fill="none" stroke="#5A3418" strokeWidth="0.45"
        rx="1.5" strokeDasharray="5 4"/>

      {/* Corner bracket ornaments */}
      {[
        [14,14,  1, 1],  // top-left
        [886,14,-1, 1],  // top-right
        [14,306, 1,-1],  // bottom-left
        [886,306,-1,-1], // bottom-right
      ].map(([x,y,sx,sy],i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${sx},${sy})`}>
          <path d="M0,0 L14,0 L14,2 L2,2 L2,14 L0,14 Z" fill="#5A3418" opacity="0.8"/>
          <rect x="5" y="5" width="4" height="4" fill="#7A5030" opacity="0.6"/>
        </g>
      ))}

      {/* ══ OUTER CIRCUS BOUNDARY ══ */}
      <path
        d="M 32 22 L 728 22 A 139 139 0 0 1 728 298 L 32 298 Z"
        fill="#CAAA76"
        stroke="#3A2008"
        strokeWidth="2.4"
        filter="url(#soft-shadow)"
      />

      {/* ══ SEATING (CAVEA) — hatched fill ══ */}
      <path d="M 32 22 L 728 22 A 139 139 0 0 1 728 298 L 32 298 Z"
        fill="url(#hatch-a)"/>
      <path d="M 32 22 L 728 22 A 139 139 0 0 1 728 298 L 32 298 Z"
        fill="url(#hatch-b)"/>
      {/* Seating tone wash */}
      <path d="M 32 22 L 728 22 A 139 139 0 0 1 728 298 L 32 298 Z"
        fill="#C4A272" opacity="0.4"/>

      {/* Seating tier lines — north cavea */}
      {[16,28,40,52].map((offset,i) => (
        <path key={i}
          d={`M 79 ${65-offset} L ${700-offset*0.15} ${65-offset} A ${95+offset} ${95+offset} 0 0 0 79 ${65-offset}`}
          fill="none" stroke="#5A3418" strokeWidth="0.4" opacity={0.2 - i*0.04}
          clipPath="url(#outer-clip)"
        />
      ))}
      {/* Seating tier lines — south cavea */}
      {[16,28,40,52].map((offset,i) => (
        <path key={i}
          d={`M 79 ${255+offset} L ${700-offset*0.15} ${255+offset}`}
          fill="none" stroke="#5A3418" strokeWidth="0.4" opacity={0.2 - i*0.04}
          clipPath="url(#outer-clip)"
        />
      ))}

      {/* ══ INNER TRACK WALL ══ */}
      <path
        d="M 79 65 L 708 65 A 95 95 0 0 1 708 255 L 79 255 Z"
        fill="#E8D2A0"
        stroke="#3A2008"
        strokeWidth="1.8"
      />

      {/* ══ TRACK SURFACE ══ */}
      <path d="M 79 65 L 708 65 A 95 95 0 0 1 708 255 L 79 255 Z" fill="#EDD8A8"/>
      <path d="M 79 65 L 708 65 A 95 95 0 0 1 708 255 L 79 255 Z" fill="url(#sand)"/>

      {/* ══ SPINA ══ */}
      {/* Outer body */}
      <ellipse cx="415" cy="160" rx="214" ry="27"
        fill="#B89050" stroke="#3A2008" strokeWidth="1.8"/>
      {/* Inner face */}
      <ellipse cx="415" cy="160" rx="207" ry="20" fill="#CCB078"/>
      {/* Centerline */}
      <line x1="202" y1="160" x2="628" y2="160"
        stroke="#7A5020" strokeWidth="0.5" opacity="0.35" strokeDasharray="3 5"/>

      {/* Left meta — three turning cones with stone base */}
      <rect x="183" y="167" width="36" height="6" rx="1"
        fill="#8A6030" stroke="#3A2008" strokeWidth="0.8" opacity="0.9"/>
      {[[192,167],[203,167],[214,167]].map(([cx,_],i)=>(
        <g key={i}>
          <polygon points={`${cx},${_-14} ${cx+6},${_} ${cx-6},${_}`}
            fill={i===0?"#7A5020":"#6A4018"} stroke="#3A1808" strokeWidth="0.8"/>
          <circle cx={cx} cy={_-14} r="1.5" fill="#C9A050"/>
        </g>
      ))}

      {/* Right meta — three turning cones with stone base */}
      <rect x="616" y="167" width="36" height="6" rx="1"
        fill="#8A6030" stroke="#3A2008" strokeWidth="0.8" opacity="0.9"/>
      {[[625,167],[636,167],[647,167]].map(([cx,_],i)=>(
        <g key={i}>
          <polygon points={`${cx},${_-14} ${cx+6},${_} ${cx-6},${_}`}
            fill={i===0?"#7A5020":"#6A4018"} stroke="#3A1808" strokeWidth="0.8"/>
          <circle cx={cx} cy={_-14} r="1.5" fill="#C9A050"/>
        </g>
      ))}

      {/* Central obelisk */}
      <rect x="409" y="147" width="12" height="26" fill="#7A5220" stroke="#3A1808" strokeWidth="1" rx="1"/>
      <polygon points="415,139 421,149 409,149" fill="#6A4010" stroke="#3A1808" strokeWidth="0.6"/>
      <rect x="406" y="173" width="18" height="5" rx="0.5" fill="#5A3818" stroke="#3A1808" strokeWidth="0.6"/>
      {/* Obelisk hieroglyph hint */}
      <line x1="415" y1="151" x2="415" y2="171" stroke="#C9A050" strokeWidth="0.5" opacity="0.4"/>
      <line x1="411" y1="157" x2="419" y2="157" stroke="#C9A050" strokeWidth="0.5" opacity="0.4"/>
      <line x1="411" y1="163" x2="419" y2="163" stroke="#C9A050" strokeWidth="0.5" opacity="0.4"/>

      {/* Dolphin lap counters (7) */}
      {[0,1,2,3,4,5,6].map(i => (
        <g key={`d${i}`} transform={`translate(${246+i*23},151) rotate(-22)`}>
          <path d="M-9,0 Q-5,-4 0,-4 Q6,-4 9,0 Q6,4 0,4 Q-5,4 -9,0 Z"
            fill="#3D6858" stroke="#2A4A40" strokeWidth="0.7"/>
          <path d="M 9,0 Q 14,-5 16,0 Q 14,5 9,0"
            fill="#3D6858" stroke="#2A4A40" strokeWidth="0.5"/>
          <circle cx={-6} cy={-1} r="1" fill="#2A4A40" opacity="0.7"/>
        </g>
      ))}

      {/* Egg lap counters (7) */}
      {[0,1,2,3,4,5,6].map(i => (
        <g key={`e${i}`}>
          <ellipse cx={443+i*23} cy={169} rx="5.5" ry="7"
            fill="#E8D4A0" stroke="#7A5020" strokeWidth="0.9"/>
          <ellipse cx={443+i*23} cy={167} rx="2.5" ry="2"
            fill="none" stroke="#A08040" strokeWidth="0.4" opacity="0.5"/>
        </g>
      ))}

      {/* ══ CARCERES (STARTING GATES) ══ */}
      {/* Gate stall fill */}
      <rect x="32" y="65" width="47" height="190" fill="#C8A870" opacity="0.5"/>
      {/* Gate stall dividers */}
      {Array.from({length:13}).map((_,i) => {
        const y = 65 + i * (190/13)
        return <line key={i} x1="32" y1={y} x2="79" y2={y}
          stroke="#3A2008" strokeWidth={i===0||i===13?1.5:0.7} opacity="0.7"/>
      })}
      {/* Gate arch hints (small semicircles on inner face) */}
      {Array.from({length:12}).map((_,i) => {
        const cy = 65 + (i+0.5) * (190/13) + 1
        return <path key={i}
          d={`M 74 ${cy-6} A 5 5 0 0 1 74 ${cy+6}`}
          fill="none" stroke="#3A2008" strokeWidth="0.8" opacity="0.5"/>
      })}
      {/* Starting wall */}
      <line x1="79" y1="65" x2="79" y2="255" stroke="#3A2008" strokeWidth="2.2"/>
      {/* Slight curve of outermost carceres wall */}
      <path d="M 32 65 Q 58 70 79 72" fill="none" stroke="#3A2008" strokeWidth="1" opacity="0.5"/>
      <path d="M 32 255 Q 58 250 79 248" fill="none" stroke="#3A2008" strokeWidth="1" opacity="0.5"/>

      {/* ══ LATIN LABELS ══ */}
      {/* SPINA label on spina */}
      <text x="415" y="164" textAnchor="middle" fontSize="7.5" fill="#3A2008"
        fontFamily="Cinzel, serif" letterSpacing="0.22em" fontWeight="700" opacity="0.8">
        SPINA
      </text>
      {/* CARCERES rotated at left end */}
      <text x="55" y="160" textAnchor="middle" fontSize="6" fill="#3A2008"
        fontFamily="Cinzel, serif" letterSpacing="0.12em" opacity="0.75"
        transform="rotate(-90 55 160)">
        CARCERES
      </text>
      {/* North/south cavea labels */}
      <text x="415" y="46" textAnchor="middle" fontSize="6.5" fill="#3A2008"
        fontFamily="Cinzel, serif" letterSpacing="0.22em" opacity="0.6">
        CAVEA SEPTENTRIONALIS
      </text>
      <text x="415" y="291" textAnchor="middle" fontSize="6.5" fill="#3A2008"
        fontFamily="Cinzel, serif" letterSpacing="0.22em" opacity="0.6">
        CAVEA MERIDIONALIS
      </text>
      {/* SPHENDONE at curved east end */}
      <text x="828" y="163" textAnchor="middle" fontSize="6" fill="#3A2008"
        fontFamily="Cinzel, serif" letterSpacing="0.12em" opacity="0.6"
        transform="rotate(90 828 160)">
        SPHENDONE
      </text>
      {/* PORTA TRIUMPHALIS hint at west gate */}
      <text x="30" y="35" textAnchor="start" fontSize="5.5" fill="#3A2008"
        fontFamily="Cinzel, serif" letterSpacing="0.1em" opacity="0.5">
        PORTA TRIUMPHALIS
      </text>

      {/* ══ CARTOUCHE (top-right, credits hotspot) ══ */}
      {/* Drop shadow */}
      <rect x="749" y="19" width="132" height="44" rx="2" fill="#7A5020" opacity="0.2"/>
      {/* Main fill */}
      <rect x="747" y="17" width="132" height="44" fill="#CAAA74" stroke="#3A2008" strokeWidth="1.4" rx="2"/>
      <rect x="751" y="21" width="124" height="36" fill="none" stroke="#5A3418" strokeWidth="0.5" rx="1"
        strokeDasharray="3 3"/>
      {/* Decorative top cap */}
      <path d="M 804 17 Q 813 11 822 17" fill="none" stroke="#4A2A10" strokeWidth="1.1"/>
      <circle cx="813" cy="12" r="1.5" fill="#7A5020"/>
      {/* Text */}
      <text x="813" y="33" textAnchor="middle" fontSize="8.5" fill="#2A1408"
        fontFamily="Cinzel Decorative, serif" fontWeight="700" letterSpacing="0.14em">
        CIRCUS
      </text>
      <text x="813" y="49" textAnchor="middle" fontSize="8.5" fill="#2A1408"
        fontFamily="Cinzel Decorative, serif" fontWeight="700" letterSpacing="0.14em">
        MAXIMUS
      </text>

      {/* ══ SCALE BAR (bottom-right) ══ */}
      <g transform="translate(742,276)">
        {/* Alternating filled segments */}
        <rect x="0"  y="-4" width="16" height="8" fill="#5A3418"/>
        <rect x="16" y="-4" width="16" height="8" fill="#C8A870"/>
        <rect x="32" y="-4" width="16" height="8" fill="#5A3418"/>
        <rect x="0" y="-4" width="48" height="8" fill="none" stroke="#3A2008" strokeWidth="0.8"/>
        <line x1="0"  y1="-6" x2="0"  y2="-4" stroke="#3A2008" strokeWidth="0.8"/>
        <line x1="48" y1="-6" x2="48" y2="-4" stroke="#3A2008" strokeWidth="0.8"/>
        <text x="24" y="-9" textAnchor="middle" fontSize="6" fill="#3A2008"
          fontFamily="Cinzel, serif">621 m</text>
      </g>

      {/* ══ COMPASS ROSE (bottom-left) ══ */}
      <g transform="translate(46,268)">
        {/* Cardinal points */}
        <polygon points="0,-19 3,-7 -3,-7"    fill="#4A2A10"/>
        <polygon points="0,19 3,7 -3,7"       fill="#4A2A10" opacity="0.4"/>
        <polygon points="-19,0 -7,-3 -7,3"    fill="#4A2A10" opacity="0.4"/>
        <polygon points="19,0 7,-3 7,3"        fill="#4A2A10" opacity="0.4"/>
        {/* Intercardinal */}
        {[[-13,-13],[ 13,-13],[ 13,13],[-13,13]].map(([dx,dy],i)=>(
          <polygon key={i}
            points={`${dx},${dy} ${dx*0.38},${dy*0.62} ${dx*0.62},${dy*0.38}`}
            fill="#4A2A10" opacity="0.25"/>
        ))}
        <circle cx="0" cy="0" r="3.5" fill="#4A2A10"/>
        <circle cx="0" cy="0" r="1.8" fill="#D8BC88"/>
        <text x="0" y="-22" textAnchor="middle" fontSize="7.5" fill="#3A2008"
          fontFamily="Cinzel, serif" fontWeight="700" letterSpacing="0.05em">N</text>
      </g>

      {/* ══ RACERS ══ */}
      {/* Racer I — Factio Russata (Red) */}
      <g filter="url(#glow)" transform="translate(524,87)">
        <circle cx="0" cy="0" r="10.5" fill="url(#r1g)" stroke="#F0C880" strokeWidth="1.6"/>
        <circle cx="0" cy="0" r="10.5" fill="none" stroke="rgba(255,200,100,0.3)" strokeWidth="3"/>
        <text x="0" y="4" textAnchor="middle" fontSize="8" fill="#FFE8A0"
          fontFamily="Cinzel Decorative, serif" fontWeight="700" letterSpacing="0.05em">I</text>
      </g>
      {/* Trail I */}
      <path d="M 488 89 Q 506 88 524 87" stroke="#C43030" strokeWidth="1.8"
        fill="none" opacity="0.25" strokeDasharray="3 4"/>

      {/* Racer II — Factio Veneta (Blue) */}
      <g filter="url(#glow)" transform="translate(440,90)">
        <circle cx="0" cy="0" r="10.5" fill="url(#r2g)" stroke="#F0C880" strokeWidth="1.6"/>
        <circle cx="0" cy="0" r="10.5" fill="none" stroke="rgba(255,200,100,0.3)" strokeWidth="3"/>
        <text x="0" y="4" textAnchor="middle" fontSize="7.5" fill="#FFE8A0"
          fontFamily="Cinzel Decorative, serif" fontWeight="700" letterSpacing="0.05em">II</text>
      </g>
      {/* Trail II */}
      <path d="M 404 92 Q 422 91 440 90" stroke="#3050C8" strokeWidth="1.8"
        fill="none" opacity="0.25" strokeDasharray="3 4"/>

      {/* ══ FINAL PARCHMENT TINT ══ */}
      <rect width="900" height="320" fill="#D4A870" opacity="0.045" rx="4"/>
    </svg>
  )
}

// ─── SIMPLE VIEW ─────────────────────────────────────────────────────────────
function SimpleView() {
  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        background: 'radial-gradient(ellipse 90% 70% at 50% 60%, #1D1106 0%, #0B0804 100%)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 40% at 50% 70%, rgba(212,168,75,0.06), transparent)',
        }}/>

        <p style={{ fontSize: '9px', letterSpacing: '0.55em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginBottom: '20px' }}>
          621 BC · Rome, Italy
        </p>
        <h2 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(36px, 8vw, 96px)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          background: 'linear-gradient(180deg, #F8E8B8 0%, #E0B84A 38%, #C9943A 62%, #7A5010 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1.05, marginBottom: '24px',
        }}>
          Circus<br/>Maximus
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold-muted))' }}/>
          <span style={{ color: 'var(--gold-dim)', fontSize: '10px' }}>✦</span>
          <p style={{ fontSize: '11px', letterSpacing: '0.38em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>
            The Greatest Arena of the Ancient World
          </p>
          <span style={{ color: 'var(--gold-dim)', fontSize: '10px' }}>✦</span>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(to left, transparent, var(--gold-muted))' }}/>
        </div>
        <p style={{
          fontSize: 'clamp(13px, 1.5vw, 16px)', color: 'var(--parch-dim)',
          lineHeight: '1.85', maxWidth: '580px', letterSpacing: '0.02em',
        }}>
          The Circus Maximus was the heart of Roman public entertainment and a key political arena where emperors and ordinary citizens met to celebrate, gamble, and voice public opinion.
        </p>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        borderBottom: '1px solid var(--border)',
      }}>
        {[
          { num: '621m', label: 'Track Length' },
          { num: '250K', label: 'Capacity' },
          { num: '7',    label: 'Laps Per Race' },
          { num: '500+', label: 'Years of Racing' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '32px 24px', textAlign: 'center',
            borderRight: i < 3 ? '1px solid var(--border)' : 'none',
          }}>
            <p style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: 'var(--gold)', letterSpacing: '0.06em',
              marginBottom: '6px', lineHeight: 1,
            }}>{s.num}</p>
            <p style={{ fontSize: '8.5px', letterSpacing: '0.3em', color: 'var(--gold-muted)', textTransform: 'uppercase' }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ── INFO SECTIONS ── */}
      {HOTSPOTS.filter(h => h.id !== 'credits').map((hs, i) => (
        <section key={hs.id} style={{
          display: 'grid',
          gridTemplateColumns: i % 2 === 0 ? '1fr 2fr' : '2fr 1fr',
          borderBottom: '1px solid var(--border)',
          minHeight: '220px',
        }}>
          {/* Label side */}
          {i % 2 === 0 && (
            <div style={{
              padding: '48px 40px',
              borderRight: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              background: 'rgba(212,168,75,0.02)',
            }}>
              <p style={{ fontSize: '8px', letterSpacing: '0.38em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                {['I','II','III','IV','V'][i]} · {hs.subtitle}
              </p>
              <h3 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                color: 'var(--parch)', letterSpacing: '0.07em', lineHeight: 1.2,
              }}>{hs.title}</h3>
            </div>
          )}

          {/* Body side */}
          <div style={{
            padding: '48px 40px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            borderRight: i % 2 !== 0 ? '1px solid var(--border)' : 'none',
          }}>
            <p style={{
              fontSize: 'clamp(12px, 1.3vw, 14px)', color: 'var(--parch-dim)',
              lineHeight: '1.85', letterSpacing: '0.02em',
            }}>{hs.body}</p>
          </div>

          {/* Label side (right-aligned rows) */}
          {i % 2 !== 0 && (
            <div style={{
              padding: '48px 40px',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              background: 'rgba(212,168,75,0.02)',
            }}>
              <p style={{ fontSize: '8px', letterSpacing: '0.38em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                {['I','II','III','IV','V'][i]} · {hs.subtitle}
              </p>
              <h3 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                color: 'var(--parch)', letterSpacing: '0.07em', lineHeight: 1.2,
              }}>{hs.title}</h3>
            </div>
          )}
        </section>
      ))}

      <div style={{ textAlign: 'center', padding: '14px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '7.5px', letterSpacing: '0.35em', color: 'rgba(140,100,30,0.4)', textTransform: 'uppercase' }}>
          Scroll to meet the builders &nbsp;↓
        </p>
      </div>
    </div>
  )
}


// ─── INFO PANEL ───────────────────────────────────────────────────────────────
function InfoPanel({ hotspot, onClose }) {
  if (!hotspot) return null

  return (
    <div className="cm-panel-inner">
      <div className="cm-rule">
        <div className="cm-rule-line"/>
        <span style={{ color: 'var(--gold)', fontSize: '9px', flexShrink: 0, letterSpacing: '0.3em' }}>✦</span>
        <div className="cm-rule-line" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,75,0.45), transparent)' }}/>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '8px', letterSpacing: '0.38em', color: 'var(--gold-muted)',
            textTransform: 'uppercase', marginBottom: '5px', fontFamily: "'Cinzel', serif",
          }}>
            {hotspot.subtitle}
          </p>
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(15px, 2.8vw, 25px)',
            fontWeight: 700,
            color: 'var(--parch)',
            letterSpacing: '0.07em',
            marginBottom: '9px',
            lineHeight: 1.15,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            {hotspot.title}
          </h2>
          <p style={{
            fontSize: 'clamp(10.5px, 1.25vw, 13px)',
            color: 'var(--parch-dim)',
            lineHeight: '1.78',
            letterSpacing: '0.025em',
            maxWidth: '700px',
          }}>
            {hotspot.body}
          </p>
        </div>

        <button className="cm-close" onClick={onClose} aria-label="Close panel">
          ×
        </button>
      </div>
    </div>
  )
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
const BUILDERS = [
  {
    name: 'Rishabh Attri',
    role: 'Web-Development Lead · GT Project',
    bio: 'I am a passionate web developer and tech enthusiast with a deep love for building seamless, high-performance digital experiences. Specializing in front-end and back-end development, I am currently leading the technical architecture and end-to-end website build for Circus Maximus. Working alongside my partner, Dominic Recchia, I handle the entire technical execution of the project. It has been a long-time dream of ours to bring this vision to life, and I am incredibly proud to pour my coding expertise into this GT project.',
  },
  {
    name: 'Dominic Recchia',
    role: 'Lead Builder · GT Project',
    bio: "I am a passionate maker with a deep love for hands-on crafting and large-scale creative builds. Driven by a long-standing fascination with ancient engineering, I am thrilled to collaborate with my partner, Rishabh Attri, to bring our scaled model of the Circus Maximus to life. Together, we are excited to turn this ambitious vision into a reality for our GT project.",
  },
]

function AboutSection() {
  return (
    <section style={{
      padding: 'clamp(52px, 9vw, 112px) clamp(22px, 6vw, 92px)',
      maxWidth: '1048px',
      margin: '0 auto',
    }}>
      {/* Section heading */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{ fontSize: '8.5px', letterSpacing: '0.48em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
          The Creators
        </p>
        <h2 style={{
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: 'clamp(22px, 4vw, 40px)',
          color: 'var(--parch)',
          letterSpacing: '0.09em',
          marginBottom: '20px',
          textShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}>
          Aedificatores
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,168,75,0.4))' }}/>
          <span style={{ color: 'var(--gold-dim)', fontSize: '14px' }}>⚜</span>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,168,75,0.4))' }}/>
        </div>
      </div>

      {/* Builder cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '38px' }}>
        {BUILDERS.map((b, i) => (
          <div key={i} className="cm-about-card">
            <div className="cm-about-corner tl"/>
            <div className="cm-about-corner tr"/>
            <div className="cm-about-corner bl"/>
            <div className="cm-about-corner br"/>

            <p style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: '11px', color: 'var(--gold-muted)',
              letterSpacing: '0.35em', marginBottom: '7px',
            }}>
              {i === 0 ? 'I' : 'II'}
            </p>

            <h3 style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 'clamp(17px, 2.8vw, 25px)',
              color: 'var(--parch)', letterSpacing: '0.06em',
              marginBottom: '6px', lineHeight: 1.2,
            }}>
              {b.name}
            </h3>

            <p style={{ fontSize: '8.5px', letterSpacing: '0.28em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginBottom: '18px' }}>
              {b.role}
            </p>

            <div style={{ height: '1px', background: 'linear-gradient(to right, var(--border), var(--border-mid), var(--border))', marginBottom: '18px' }}/>

            <p style={{ fontSize: '12.5px', color: '#7A6040', lineHeight: '1.88', letterSpacing: '0.02em' }}>
              {b.bio}
            </p>
          </div>
        ))}
      </div>

      {/* Footer stamp */}
      <div style={{ textAlign: 'center', marginTop: '84px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--border)' }}/>
          <p style={{ fontSize: '8px', letterSpacing: '0.45em', color: 'rgba(140,100,30,0.35)', textTransform: 'uppercase' }}>
            Circus Maximus · MMXXV · In Gloriam Romae
          </p>
          <div style={{ width: '40px', height: '1px', background: 'var(--border)' }}/>
        </div>
      </div>
    </section>
  )
}