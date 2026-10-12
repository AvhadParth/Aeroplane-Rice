import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { Icon, Img, type IconName } from './ui';

const steps: { icon: IconName; name: string; photo: string; alt: string; text: string }[] = [
  { icon: 'paddy', name: 'Paddy', photo: 'paddy-close', alt: 'Young rice plants standing in water', text: 'Sown with the monsoon in fields fed by Himalayan rivers.' },
  { icon: 'hands', name: 'Harvest', photo: 'harvest', alt: "A farmer's hands cutting ripe paddy with a sickle", text: 'Cut in autumn, once the heads turn gold and bend.' },
  { icon: 'sack', name: 'Age', photo: 'ageing', alt: 'Jute sacks of rice stacked in a warehouse', text: 'Rested in jute for eight months or more. Nothing hurries it.' },
  { icon: 'grain', name: 'Grain', photo: 'scoop', alt: 'Milled basmati rice with a wooden scoop and paddy stalks', text: 'Milled, sorted, measured, and packed with its lot number.' },
  { icon: 'bowl', name: 'Table', photo: 'steamed', alt: 'A bowl of steamed basmati rice', text: 'Rinsed, soaked, cooked, and passed around.' },
];

export function Fields() {
  const hero = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section className="fields dark" id="fields">
      <div className="fields__hero" ref={hero}>
        <m.div style={{ y }}>
          <Img name="cover" alt="Ripe paddy, jute and a bowl of milled basmati rice" sizes="100vw" />
        </m.div>
        <div className="wrap fields__title">
          <h2 className="display">From the fields of India.</h2>
          <p className="lede">Basmati grows properly in one stretch of the world. Ours comes from there, and takes the long way to your kitchen.</p>
        </div>
      </div>

      <div className="wrap">
        <ol className="journey" tabIndex={0} aria-label="The journey from paddy to table">
          {steps.map((step) => (
            <li className="journey__step" key={step.name}>
              <Icon name={step.icon} />
              <h3>{step.name}</h3>
              <figure className="frame">
                <Img name={step.photo} alt={step.alt} sizes="(min-width: 900px) 18vw, 70vw" />
              </figure>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="fields__cta"><a className="btn btn--yellow" href="#range">Bring it to your table</a></p>
      </div>
    </section>
  );
}
