import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';

const ease = [0.2, 0.7, 0.1, 1] as const;

const views = [
  { id: 'length', label: 'Length', value: '8.35', unit: 'mm, raw', title: 'Longer than a promise', body: 'We lay grains from each lot against a rule and take the average. The current figure is 8.35 mm. It is printed on the pack, next to the lot number it belongs to.' },
  { id: 'ageing', label: 'Ageing', value: '8', unit: 'months', title: 'Eight months of doing nothing', body: 'New-crop basmati is soft and damp. Rested in jute for at least eight months it dries slowly, turns from chalk white to ivory, and learns to drink water without breaking.' },
  { id: 'aroma', label: 'Aroma', value: '1', unit: 'pot per lot', title: 'The smell that fills the house', body: 'Basmati means fragrant. Ageing deepens that nutty, popcorn-warm scent, and we cook a pot from every lot to make sure it is there before the sacks are sealed.' },
  { id: 'elongation', label: 'Elongation', value: '2×', unit: 'when cooked', title: 'It grows in the pot', body: 'Good basmati lengthens rather than fattens. Cooked properly, an Aeroplane grain reaches about twice its raw length and stays slender.' },
  { id: 'texture', label: 'Texture', value: '0', unit: 'clumps', title: 'Every grain on its own', body: 'Aged grain holds its shape. It falls apart on the plate instead of sticking, so a biryani layers cleanly and a spoon of dal has somewhere to go.' },
] as const;

type ViewId = (typeof views)[number]['id'];

// one slender grain, 560 units long, drawn for a 1000 x 480 sheet
const GRAIN = 'M220 240C300 197 650 203 780 240C650 281 300 285 220 240Z';
const scatter = [
  { x: 170, y: -95, rotate: 24 },
  { x: -70, y: 85, rotate: 9 },
  { x: 215, y: 70, rotate: -31 },
  { x: 40, y: -5, rotate: -54 },
];
const box = { transformBox: 'fill-box' as const, transformOrigin: 'center' };

function Overlay({ view }: { view: ViewId }) {
  if (view === 'length') {
    return (
      <>
        <path d="M220 262V356M780 262V356" stroke="#FBF6E9" strokeOpacity=".45" strokeDasharray="5 7" />
        <m.path d="M220 340H780" stroke="#FFED00" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease }} />
        <path d="M220 340l16-8v16zM780 340l-16-8v16z" fill="#FFED00" />
        <text x="500" y="392" textAnchor="middle">8.35 mm</text>
      </>
    );
  }
  if (view === 'ageing') {
    return (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <m.rect
            key={i} x={220 + i * 47.3} y={332} width={36} height={14} rx={7}
            fill={i < 8 ? '#FFED00' : 'none'} stroke={i < 8 ? '#FFED00' : '#FBF6E9'} strokeOpacity={i < 8 ? 1 : 0.4} strokeWidth="2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
        <text x="220" y="394">8 of 12 months, resting in jute</text>
      </>
    );
  }
  if (view === 'aroma') {
    return (
      <>
        {[400, 500, 600].map((x, i) => (
          <m.path
            key={x} d={`M${x} 188c-24-30 24-46 0-80s22-46 4-72`} fill="none" stroke="#009846" strokeWidth="7" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: i * 0.18, ease }}
          />
        ))}
      </>
    );
  }
  if (view === 'elongation') {
    return (
      <>
        <path d="M500 170V330" stroke="#FBF6E9" strokeOpacity=".5" strokeDasharray="5 7" />
        <path d="M780 170V330" stroke="#E31E24" strokeWidth="3" />
        <text x="500" y="368" textAnchor="middle">raw</text>
        <text x="780" y="368" textAnchor="end">cooked</text>
      </>
    );
  }
  return null;
}

export function Grain() {
  const [view, setView] = useState<ViewId>('length');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = views.find((v) => v.id === view)!;
  const apart = view === 'texture';

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? views.length - 1 : step === undefined ? null : (index + step + views.length) % views.length;
    if (next === null) return;
    event.preventDefault();
    setView(views[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section className="grain dark" id="grain">
      <div className="wrap">
        <div className="head">
          <h2 className="display">The grain.</h2>
          <p className="lede">Five things decide how basmati cooks. We check each of them on every lot, and you can check us.</p>
        </div>

        <div className="lab">
          <div className="lab__tabs" role="tablist" aria-label="What we measure">
            {views.map((v, i) => (
              <button
                key={v.id} className="lab__tab" role="tab" type="button" id={`tab-${v.id}`} aria-controls="grain-panel"
                aria-selected={v.id === view} tabIndex={v.id === view ? 0 : -1}
                ref={(el) => { tabs.current[i] = el; }} onClick={() => setView(v.id)} onKeyDown={(e) => onKeyDown(e, i)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="lab__stage" aria-hidden="true">
            <p className="label lab__corner">Lot R 2611</p>
            <svg className="lab__svg" viewBox="0 0 1000 480">
              <defs>
                <linearGradient id="grain-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFFDF6" />
                  <m.stop offset="1" animate={{ stopColor: view === 'ageing' ? '#E9CF8E' : '#DCD5C2' }} transition={{ duration: 1.6 }} />
                </linearGradient>
              </defs>

              {scatter.map((to, i) => (
                <m.path
                  key={i} d={GRAIN} fill="url(#grain-fill)" style={box} initial={false}
                  animate={apart ? { ...to, scale: 0.42, opacity: 1 } : { x: 0, y: 0, rotate: 0, scale: 0.42, opacity: 0 }}
                  transition={{ duration: 0.9, delay: apart ? 0.08 * i : 0, ease }}
                />
              ))}

              <m.g
                style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} initial={false}
                animate={{ scaleX: view === 'elongation' ? [0.5, 0.5, 1] : 1, y: view === 'aroma' ? 40 : 0 }}
                transition={{ duration: view === 'elongation' ? 2.4 : 0.8, times: view === 'elongation' ? [0, 0.25, 1] : undefined, ease }}
              >
                <m.g style={box} initial={false} animate={apart ? { x: -130, y: -60, rotate: -18, scale: 0.42 } : { x: 0, y: 0, rotate: 0, scale: 1 }} transition={{ duration: 0.9, ease }}>
                  <path d={GRAIN} fill="url(#grain-fill)" />
                  <path d="M300 232C420 214 600 216 700 232" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
                </m.g>
              </m.g>

              <AnimatePresence mode="wait">
                <m.g key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Overlay view={view} />
                </m.g>
              </AnimatePresence>
            </svg>
          </div>

          <div className="lab__info" role="tabpanel" id="grain-panel" aria-labelledby={`tab-${view}`}>
            <p className="lab__readout"><b>{current.value}</b><span>{current.unit}</span></p>
            <h3>{current.title}</h3>
            <p>{current.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
