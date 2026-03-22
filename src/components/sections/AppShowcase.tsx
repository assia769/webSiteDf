'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const FEATURES = [
  { screen:'0',  label:'Pomodoro',      sub:'Minuteur 25 min · mode clair',          tag:'Focus',        color:'#a855f7', glow:'rgba(168,85,247,.5)',   wide:false },
  { screen:'1',  label:'Pause · Dark',  sub:'Break 5 min · mode sombre',             tag:'Focus',        color:'#60a5fa', glow:'rgba(96,165,250,.45)',  wide:false },
  { screen:'2',  label:'Sons',          sub:'Catégories · recherche · lecture',      tag:'Ambiance',     color:'#34d399', glow:'rgba(52,211,153,.4)',   wide:false },
  { screen:'3',  label:'Tâches',        sub:'Liste avec priorité et catégorie',      tag:'Productivité', color:'#fbbf24', glow:'rgba(251,191,36,.4)',   wide:false },
  { screen:'4',  label:'Ajouter tâche', sub:'Formulaire · priorité · catégorie',    tag:'Productivité', color:'#f472b6', glow:'rgba(244,114,182,.4)',  wide:false },
  { screen:'5',  label:'Blocage URLs',  sub:'Bloquer URLs · son · accès total',      tag:'Blocage',      color:'#ec4899', glow:'rgba(236,72,153,.45)',  wide:false },
  { screen:'6',  label:'Page bloquée',  sub:'Démo Chrome · accès refusé',            tag:'Blocage',      color:'#f87171', glow:'rgba(248,113,113,.4)',  wide:true  },
  { screen:'7',  label:'Progression',   sub:'Stats tâches · pomodoro · historique',  tag:'Analyse',      color:'#22d3ee', glow:'rgba(34,211,238,.4)',   wide:true  },
  { screen:'8',  label:'Paramètres',    sub:'Langue · réinitialisation',             tag:'Config',       color:'#a78bfa', glow:'rgba(167,139,250,.4)',  wide:false },
  { screen:'9',  label:'Apparence',     sub:'Thème clair / sombre',                  tag:'Config',       color:'#f9a8d4', glow:'rgba(249,168,212,.4)',  wide:false },
  { screen:'10', label:'Avancé',        sub:'Export JSON · clear storage',           tag:'Config',       color:'#6ee7b7', glow:'rgba(110,231,183,.38)', wide:false },
];

const N = FEATURES.length;

/* card dimensions */
const NARROW_W = 230;   // portrait card width  (desktop)
const NARROW_H = 400;   // portrait card height (desktop)
const WIDE_W   = 560;   // landscape card width (desktop)  — 16:9 ratio approx
const WIDE_H   = 340;   // landscape card height (desktop)

const NARROW_W_M = 160;
const NARROW_H_M = 284;
const WIDE_W_M   = 310;
const WIDE_H_M   = 200;

const SP_D   = 190;   // horizontal spread between portrait cards (desktop)
const SP_M   = 130;
const DEPTH  = 110;

export function AppShowcase() {
  const [active,    setActive]    = useState(0);
  const [pos,       setPos]       = useState(0);
  const [isDrag,    setIsDrag]    = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, pos: 0 });
  const [autoPlay,  setAutoPlay]  = useState(true);
  const [isMobile,  setIsMobile]  = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const posRef   = useRef(0);

  useEffect(() => { posRef.current = pos; }, [pos]);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn(); window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    if (!autoPlay) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setPos(p => Math.round(p) + 1);
    }, 1800);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay]);

  useEffect(() => {
    const idx = ((Math.round(pos) % N) + N) % N;
    setActive(idx);
  }, [pos]);

  const onPDown = useCallback((e: React.PointerEvent) => {
    setIsDrag(false);
    setAutoPlay(false);
    setDragStart({ x: e.clientX, pos: posRef.current });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPMove = useCallback((e: React.PointerEvent) => {
    const dx = e.clientX - dragStart.x;
    if (Math.abs(dx) > 4) setIsDrag(true);
    setPos(dragStart.pos - dx / (isMobile ? 75 : 115));
  }, [dragStart, isMobile]);

  const onPUp = useCallback(() => {
    setPos(p => Math.round(p));
    setTimeout(() => setIsDrag(false), 50);
  }, []);

  const goTo = useCallback((i: number) => {
    setAutoPlay(false);
    const cur = ((Math.round(posRef.current) % N) + N) % N;
    let diff = i - cur;
    if (diff >  N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setPos(p => Math.round(p) + diff);
  }, []);

  const feat = FEATURES[active];

  /* Compute card dimensions for a given feature index */
  const cardDims = (i: number) => {
    const f = FEATURES[((i % N) + N) % N];
    if (f.wide) {
      return { cw: isMobile ? WIDE_W_M : WIDE_W, ch: isMobile ? WIDE_H_M : WIDE_H };
    }
    return { cw: isMobile ? NARROW_W_M : NARROW_W, ch: isMobile ? NARROW_H_M : NARROW_H };
  };

  /* Stage height adapts to widest active area */
  const stageH = isMobile ? 315 : 530;

  return (
    <section style={{ position:'relative', zIndex:5, padding: isMobile ? '3rem 0 2.5rem' : '5rem 0 4.5rem', overflow:'hidden' }}>
      <style>{`
        @keyframes scScan {
          0%   { top:-2px;opacity:0 }
          6%   { opacity:1 }
          93%  { opacity:.6 }
          100% { top:100%;opacity:0 }
        }
        @keyframes scLabelIn {
          from { opacity:0; transform:translateY(11px) }
          to   { opacity:1; transform:translateY(0) }
        }
        @keyframes scTagIn {
          from { opacity:0; transform:scale(.75) }
          to   { opacity:1; transform:scale(1) }
        }
        @keyframes scGlow {
          0%,100% { opacity:.55 } 50% { opacity:1 }
        }
        .sccard {
          position:absolute;
          border-radius:16px;
          overflow:hidden;
          will-change:transform,opacity,filter;
          transition: transform .44s cubic-bezier(.25,.46,.45,.94),
                      opacity   .44s ease,
                      filter    .44s ease,
                      box-shadow .44s ease,
                      border-color .44s ease,
                      width .44s cubic-bezier(.25,.46,.45,.94),
                      height .44s cubic-bezier(.25,.46,.45,.94);
        }
        .sc-arr {
          background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1);
          border-radius:50%; width:40px; height:40px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; color:rgba(255,255,255,.5); font-size:1.1rem;
          transition:all .2s; flex-shrink:0; line-height:1; outline:none;
        }
        .sc-arr:hover { background:rgba(168,85,247,.22); border-color:rgba(168,85,247,.5); color:#fff; }
        .sc-playbtn {
          background:rgba(168,85,247,.09); border:1px solid rgba(168,85,247,.25);
          border-radius:20px; padding:5px 16px;
          font-family:var(--font-display); font-size:.6rem; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
          color:rgba(168,85,247,.8); cursor:pointer; outline:none;
          transition:background .2s,border-color .2s;
        }
        .sc-playbtn:hover { background:rgba(168,85,247,.18); border-color:rgba(168,85,247,.45); }
        .sc-dot { border:none; padding:0; cursor:pointer; transition:all .28s ease; outline:none; }
        .sc-dot:hover { transform:scale(1.4); }
        .sc-stage { cursor:grab; user-select:none; touch-action:none; }
        .sc-stage:active { cursor:grabbing; }

        /* Wide card label sits at bottom-left, not centered */
        .wide-label { left:16px !important; transform:none !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign:'center', marginBottom: isMobile ? '1.6rem' : '2.6rem', padding:'0 5%' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:'.6rem' }}>
          <div style={{ width:26, height:1.5, background:'linear-gradient(90deg,var(--purple),transparent)' }} />
          <span style={{ fontFamily:'var(--font-display)', fontSize:'.67rem', fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--purple-l)' }}>
            Toutes les fonctionnalités
          </span>
          <div style={{ width:26, height:1.5, background:'linear-gradient(270deg,var(--purple),transparent)' }} />
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.75rem,3.5vw,2.7rem)', fontWeight:800, letterSpacing:'-.03em', lineHeight:1.08, color:'#fff', marginBottom:'.7rem' }}>
          Explorez DFCraft<br />
          <span style={{ background:'linear-gradient(135deg,var(--purple-l),#e879f9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>en action.</span>
        </h2>
        <p style={{ fontSize:'.88rem', color:'var(--text-muted)', maxWidth:400, margin:'0 auto', lineHeight:1.78, fontWeight:300 }}>
          {N} écrans · glissez ou naviguez
        </p>
      </div>

      {/* ── Stage ── */}
      <div
        className="sc-stage"
        style={{ position:'relative', width:'100%', height: stageH, overflow:'hidden' }}
        onPointerDown={onPDown}
        onPointerMove={onPMove}
        onPointerUp={onPUp}
        onPointerCancel={onPUp}
      >
        {/* floor glow */}
        <div style={{
          position:'absolute', bottom:'4%', left:'50%', transform:'translateX(-50%)',
          width: isMobile ? 200 : 500, height: isMobile ? 26 : 52,
          background:`radial-gradient(ellipse, ${feat.glow} 0%, transparent 70%)`,
          borderRadius:'50%', filter:'blur(20px)',
          pointerEvents:'none', transition:'background .5s ease',
          animation:'scGlow 2.8s ease-in-out infinite',
        }} />

        {FEATURES.map((f, i) => {
          /* relative position from current fractional pos */
          let rel = i - ((pos % N) + N) % N;
          if (rel >  N / 2) rel -= N;
          if (rel < -N / 2) rel += N;

          const absRel  = Math.abs(rel);
          if (absRel > 3.8) return null;

          const { cw, ch } = cardDims(i);

          /* for wide cards, reduce the spread impact so they don't fly too far */
          const spreadMult = f.wide ? 0.58 : 1;
          const tx   = rel * SP_D * (isMobile ? SP_M / SP_D : 1) * spreadMult;
          const tz   = -Math.min(absRel, 3) * DEPTH;
          /* wide cards get less Y-rotation so text stays readable */
          const ryMax = f.wide ? 18 : 55;
          const ry   = Math.max(-ryMax, Math.min(ryMax, rel * (f.wide ? -12 : -26)));
          const sc   = Math.max(0.5, 1 - absRel * 0.17);
          const op   = absRel < 0.08 ? 1 : Math.max(0.1, 1 - absRel * 0.36);
          const bl   = absRel < 0.08 ? 0 : Math.min(3.5, absRel * 1.1);
          const isFront = absRel < 0.12;

          /* vertical centering — wide cards sit slightly higher so they feel balanced */
          const topOffset = f.wide
            ? `calc(50% - ${ch / 2}px - ${isMobile ? 10 : 20}px)`
            : `calc(50% - ${ch / 2}px)`;

          return (
            <div
              key={f.screen}
              className="sccard"
              onClick={() => { if (!isDrag && !isFront) goTo(i); }}
              style={{
                width: cw,
                height: ch,
                left: `calc(50% - ${cw / 2}px)`,
                top: topOffset,
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`,
                opacity: op,
                filter: bl > 0 ? `blur(${bl}px)` : 'none',
                border: `1px solid ${isFront ? f.color : 'rgba(168,85,247,.12)'}`,
                boxShadow: isFront
                  ? `0 0 0 1.5px ${f.color}, 0 30px 80px rgba(0,0,0,.88), 0 0 60px ${f.glow}`
                  : '0 6px 24px rgba(0,0,0,.5)',
                background: '#05010f',
                cursor: isFront ? 'default' : 'pointer',
                zIndex: Math.round(100 - absRel * 10),
              }}
            >
              {/* scan line */}
              {isFront && (
                <div style={{
                  position:'absolute', left:0, right:0, height:1.5, zIndex:12,
                  background:`linear-gradient(90deg,transparent 5%,${f.color} 50%,transparent 95%)`,
                  animation:'scScan 3.2s linear infinite', pointerEvents:'none',
                }} />
              )}

              {/* chrome bar — only portrait cards & front wide cards */}
              {(!f.wide || isFront) && (
                <div style={{
                  padding: f.wide ? '6px 12px 5px' : '7px 10px 6px',
                  borderBottom:'1px solid rgba(255,255,255,.07)',
                  display:'flex', alignItems:'center', gap:4,
                  background:'rgba(255,255,255,.025)', flexShrink:0,
                }}>
                  {['#ff5f57','#febc2e','#28c840'].map((c,ci)=>(
                    <div key={ci} style={{ width:6,height:6,borderRadius:'50%',background:c,opacity:.76 }} />
                  ))}
                  <div style={{ flex:1,height:4,borderRadius:2,background:'rgba(255,255,255,.07)',margin:'0 5px' }} />
                  <span style={{ fontFamily:'var(--font-display)',fontSize:'.48rem',fontWeight:700,color:isFront?f.color:'rgba(168,85,247,.38)',letterSpacing:'.07em' }}>dfcraft</span>
                </div>
              )}

              {/* screenshot */}
              <div style={{
                position:'relative',
                width:'100%',
                height: (!f.wide || isFront) ? ch - 27 : ch,
                overflow:'hidden',
                background: f.wide ? '#0a0a1a' : '#05010f',
              }}>
                <img
                  src={`/assets/app/${f.screen}.png`}
                  alt={f.label}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    /* wide pages: contain so nothing is cropped */
                    objectFit: f.wide ? 'contain' : 'cover',
                    objectPosition: f.wide ? 'center center' : 'top center',
                    display: 'block',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                />

                {/* bottom gradient — lighter on wide so image stays visible */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  height: f.wide ? 50 : 68,
                  background:`linear-gradient(to top,rgba(5,1,15,${f.wide ? '.75' : '.97'}),transparent)`,
                  pointerEvents:'none',
                }} />

                {/* tag */}
                {isFront && (
                  <div style={{
                    position:'absolute', top:9, right:9,
                    background:`${f.glow.replace(/[\d.]+\)$/,'0.16)')}`,
                    border:`1px solid ${f.color}44`,
                    borderRadius:20, padding:'3px 9px',
                    fontFamily:'var(--font-display)', fontSize:'.46rem', fontWeight:700,
                    letterSpacing:'.09em', textTransform:'uppercase', color:f.color,
                    backdropFilter:'blur(8px)',
                    animation:'scTagIn .32s ease both',
                  }}>{f.tag}</div>
                )}

                {/* label badge */}
                <div
                  className={f.wide ? 'wide-label' : ''}
                  style={{
                    position:'absolute', bottom:10,
                    ...(f.wide ? { left:16 } : { left:'50%', transform:'translateX(-50%)' }),
                    display:'flex', alignItems:'center',
                    background:'rgba(5,1,15,.9)',
                    border:`1px solid ${isFront ? f.color+'66' : 'rgba(168,85,247,.18)'}`,
                    borderRadius:20, padding:'4px 13px',
                    backdropFilter:'blur(12px)', whiteSpace:'nowrap',
                    boxShadow: isFront ? `0 0 18px ${f.glow}` : 'none',
                    transition:'box-shadow .4s, border-color .4s',
                  }}
                >
                  <span style={{
                    fontFamily:'var(--font-display)', fontSize:'.58rem', fontWeight:700,
                    color: isFront ? '#fff' : 'rgba(255,255,255,.55)',
                    letterSpacing:'.04em',
                  }}>{f.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Info + nav ── */}
      <div style={{ marginTop: isMobile ? '.75rem' : '1.4rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'.8rem', padding:'0 5%' }}>

        <div key={active} style={{ textAlign:'center', animation:'scLabelIn .3s ease both' }}>
          <div style={{
            fontFamily:'var(--font-display)',
            fontSize:'clamp(1rem,2.3vw,1.4rem)',
            fontWeight:800, letterSpacing:'-.02em',
            background:`linear-gradient(135deg,${feat.color},rgba(255,255,255,.88))`,
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            marginBottom:'.16rem',
          }}>{feat.label}</div>
          <p style={{ fontFamily:'var(--font-display)',fontSize:'.65rem',fontWeight:500,color:'rgba(255,255,255,.3)',letterSpacing:'.05em',margin:0 }}>
            {feat.sub}
          </p>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'.85rem' }}>
          <button className="sc-arr" onClick={() => goTo((active-1+N)%N)}>‹</button>
          <div style={{ display:'flex',gap:5,alignItems:'center',flexWrap:'wrap',justifyContent:'center',maxWidth: isMobile?200:310 }}>
            {FEATURES.map((_,i) => (
              <button key={i} className="sc-dot" onClick={() => goTo(i)} style={{
                width: active===i ? 20 : 6, height:6,
                borderRadius: active===i ? 3 : '50%',
                background: active===i ? feat.color : 'rgba(255,255,255,.14)',
                boxShadow: active===i ? `0 0 8px ${feat.glow}` : 'none',
              }} />
            ))}
          </div>
          <button className="sc-arr" onClick={() => goTo((active+1)%N)}>›</button>
        </div>

        <div style={{ display:'flex',gap:'.65rem',alignItems:'center' }}>
          <button className="sc-playbtn" onClick={() => setAutoPlay(v => !v)}>
            {autoPlay ? '⏸ Pause' : '▶ Auto'}
          </button>
          <span style={{ fontFamily:'var(--font-display)',fontSize:'.58rem',fontWeight:600,color:'rgba(255,255,255,.18)',letterSpacing:'.08em' }}>
            {active+1} / {N}
          </span>
        </div>
      </div>
    </section>
  );
}