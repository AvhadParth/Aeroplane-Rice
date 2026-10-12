import { Img } from './ui';

const figures = [
  ['1969', 'The year we began'],
  ['8 months', 'Rested before milling'],
  ['38', 'Countries we reach'],
];

export function Heritage() {
  return (
    <section className="heritage dark" id="heritage">
      <div className="pattern" aria-hidden="true" />
      <div className="wrap heritage__grid">
        <div className="heritage__copy">
          <h2 className="display">Since 1969.</h2>
          <p className="lede">For more than five decades this name has meant one thing in Indian kitchens, and in kitchens far from India: basmati that cooks long, separate and fragrant.</p>
          <p>We still buy paddy the way we always have, from growers in the basmati belt at the foot of the Himalayas. We still let it rest through the seasons before it is milled. Good rice was never hurried, and ours is not.</p>
          <dl className="heritage__figures">
            {figures.map(([value, label]) => (
              <div key={label}><dd>{value}</dd><dt className="label">{label}</dt></div>
            ))}
          </dl>
          <p><a className="btn btn--yellow" href="#range">Shop the range</a></p>
        </div>

        <div className="heritage__arches">
          <figure className="arch"><Img name="ageing" alt="Jute sacks of basmati resting in a grain store" sizes="(min-width: 900px) 26vw, 46vw" /></figure>
          <figure className="arch"><Img name="harvest-dawn" alt="A farmer carrying cut paddy across a field at dawn" sizes="(min-width: 900px) 20vw, 46vw" /></figure>
        </div>
      </div>
    </section>
  );
}
