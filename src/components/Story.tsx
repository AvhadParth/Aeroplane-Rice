import { useRef } from 'react';
import { m, useScroll } from 'motion/react';

const stops = [
  ['1969', 'The first sacks leave the mill under the Aeroplane name.'],
  ['1980s', 'Traders abroad begin asking for it by name. Word travels kitchen to kitchen.'],
  ['1990s', 'We build our own ageing stores, so every lot can rest a full season.'],
  ['2010s', 'The same aged grain reaches home kitchens in packs of every size.'],
  ['Today', 'Thirty-eight countries, and still the same fields and the same patience.'],
];

export function Story() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.85', 'start 0.35'] });

  return (
    <section className="past light" id="story">
      <div className="wrap">
        <div className="head">
          <h2 className="display">Five decades, one grain.</h2>
          <p className="lede">The story of Aeroplane is short to tell, because very little has changed: the same fields, the same resting, the same care at the mill.</p>
        </div>

        <ol className="thread" ref={list}>
          <m.li className="thread__line" role="presentation" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
          {stops.map(([year, text]) => (
            <li key={year}>
              <h3>{year}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
