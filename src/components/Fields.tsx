import { useState } from 'react';
import { Img } from './ui';

const stages = [
  { name: 'Paddy', photo: 'paddy-close', alt: 'Young rice plants standing in water', text: 'Sown with the monsoon, in fields fed by Himalayan rivers.' },
  { name: 'Harvest', photo: 'harvest', alt: "A farmer's hands cutting ripe paddy with a sickle", text: 'Cut in autumn, once the heads turn gold and bend.' },
  { name: 'Age', photo: 'ageing', alt: 'Jute sacks of rice stacked in a grain store', text: 'Rested in jute for eight months or more. Nothing hurries it.' },
  { name: 'Grain', photo: 'scoop', alt: 'Milled basmati rice with a wooden scoop and paddy stalks', text: 'Milled, sorted and packed, clean and whole.' },
  { name: 'Table', photo: 'steamed', alt: 'A bowl of steamed basmati rice', text: 'Rinsed, soaked, cooked, and passed around.' },
];

/** The journey as five tall photographs side by side. One stands open; the rest wait as slim strips. */
export function Fields() {
  const [open, setOpen] = useState(0);

  return (
    <section className="fields light" id="fields">
      <div className="wrap">
        <div className="head">
          <h2 className="display">From the fields of India.</h2>
          <p className="lede">Basmati grows properly in one stretch of the world. Ours comes from there, and takes the long way to your kitchen.</p>
        </div>

        <ol className="stages">
          {stages.map((stage, i) => (
            <li className="stage" key={stage.name} data-open={i === open}>
              <button type="button" aria-expanded={i === open} onClick={() => setOpen(i)} onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)}>
                <Img name={stage.photo} alt={stage.alt} sizes="(min-width: 900px) 55vw, 100vw" />
                <span className="stage__label"><i>{i + 1}</i>{stage.name}</span>
                <span className="stage__caption">
                  <i>{i + 1} of {stages.length}</i>
                  <b>{stage.name}</b>
                  <span>{stage.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="fields__foot">
          <p className="label">Paddy to table, in five steps</p>
          <a className="btn" href="/#range">Bring it to your table</a>
        </div>
      </div>
    </section>
  );
}
