import { useRef, useState } from 'react';
import { AnimatePresence, m, useScroll, useTransform } from 'motion/react';
import { QuickAdd } from './Cart';
import { Img, Notch, type IconName } from './ui';

const ease = [0.2, 0.7, 0.1, 1] as const;

const dishes: { name: string; region: string; photo: string; alt: string; icon: IconName; rice: string; text: string }[] = [
  { name: 'Biryani', region: 'Hyderabad', photo: 'biryani', rice: '1121-extra-long-grain-rice', alt: 'Hyderabadi chicken biryani in a brass handi', icon: 'handi', text: "Sealed and cooked on dum, so the grain steams in the meat's own fragrance. It needs a rice that stays long and separate under the lid." },
  { name: 'Dal chawal', region: 'Everywhere', photo: 'dal-chawal', rice: 'rozana-premium-basmati-rice', alt: 'Dal chawal on a steel thali with ghee and lemon', icon: 'bowl', text: 'The meal India comes home to. Yellow dal, plain rice, a spoon of ghee, and nothing to prove.' },
  { name: 'Pulao', region: 'North India', photo: 'pulao', rice: 'raw-la-taste-basmati-rice', alt: 'Vegetable pulao on a brass plate', icon: 'scoop', text: 'Whole spices bloomed in ghee, vegetables, and rice cooked in the same pot until each grain has taken on the flavour.' },
  { name: 'Chitranna', region: 'Karnataka', photo: 'lemon-rice', rice: 'premium-sona-masoori-rice-5kg', alt: 'Lemon rice with peanuts and curry leaves on a banana leaf', icon: 'scatter', text: "Yesterday's rice, today's lunch: lemon, mustard seed, curry leaf and peanuts, eaten off a banana leaf." },
];

export function Table() {
  const [active, setActive] = useState(0);
  const wide = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: wide, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const dish = dishes[active];

  return (
    <section className="table light" id="table">
      <div className="wrap">
        <div className="head">
          <h2 className="display">The Indian table.</h2>
          <p className="lede">Rice is not a side dish here. It is the plate everything else is built on, and every region builds differently.</p>
        </div>

        <div className="table__grid">
          <div className="menu-list">
            {dishes.map((d, i) => (
              <div key={d.name} className="dish" data-on={i === active} onMouseEnter={() => setActive(i)}>
                <button type="button" className="dish__name" aria-expanded={i === active} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                  <b>{d.name}</b><span className="label">{d.region}</span>
                </button>
                <div className="frame"><Img name={d.photo} alt={d.alt} sizes="100vw" /></div>
                <div className="dish__body">
                  <div>
                    <p>{d.text}</p>
                    <QuickAdd productId={d.rice} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="table__stage frame" aria-hidden="true">
            <AnimatePresence initial={false}>
              <m.div
                key={dish.photo} className="shot"
                initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.12 }} animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }} exit={{ opacity: 0.99 }}
                transition={{ duration: 0.8, ease }}
              >
                <Img name={dish.photo} alt="" sizes="40vw" />
              </m.div>
            </AnimatePresence>
            <Notch icon={dish.icon} />
          </div>
        </div>
      </div>

      <figure className="wrap table__wide" ref={wide}>
        <div className="frame">
          <m.div style={{ y }}>
            <Img name="family-table" alt="A family sharing a meal around a large dish of basmati rice" sizes="100vw" />
          </m.div>
          <figcaption className="display">Pass the rice.</figcaption>
        </div>
      </figure>
    </section>
  );
}
