import { Icon } from './ui';

export function Promise() {
  return (
    <section className="promise" id="promise">
      <div className="pattern" aria-hidden="true" />
      <div className="promise__card">
        <Icon name="paddy" className="promise__mark" />
        <h2 className="display">Not a promise. A number you can check.</h2>
        <p>Turn any Aeroplane pack over. The grain length, the months of ageing and the lot it came from are printed on the back, the same way they are written in our mill book.</p>
        <a className="btn" href="#range">Shop the range</a>
      </div>
    </section>
  );
}

const questions = [
  ['Which Aeroplane rice is best for biryani?', 'Reserve. It is our longest grain and it is aged twelve months, so it stays firm and separate through dum cooking. Classic works well too if you like a softer bite.'],
  ['Why does aged basmati cook better?', 'Resting dries the grain slowly and hardens its surface. Aged rice absorbs water evenly, lengthens instead of splitting, and comes out fluffy instead of sticky.'],
  ['How much water should I use?', 'For soaked basmati, one cup of rice to one and a half cups of water is a reliable start. Rinse first, soak for thirty minutes, and let the pot rest ten minutes before you lift the lid.'],
  ['How long does delivery take?', 'Orders are packed at the mill and sent within two working days. Most pin codes in India receive them in three to six days, and delivery is free on orders over ₹999.'],
  ['Where do I find the lot number?', 'On the back of every pack, beside the grain length and the months of ageing. Quote it if you ever write to us and we can trace the lot.'],
];

export function Faq() {
  return (
    <section className="faq light" id="faq">
      <div className="wrap faq__grid">
        <div className="faq__head">
          <h2 className="display">Before you cook.</h2>
          <p className="lede">The questions we are asked most, answered plainly.</p>
          <p><a className="btn" href="#range">Shop the range</a></p>
        </div>
        <div className="faq__list">
          {questions.map(([question, answer], i) => (
            <details key={question} name="faq" open={i === 0}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer dark">
      <div className="site-footer__land" aria-hidden="true">
        <div className="site-footer__paddy" />
      </div>
      <div className="site-footer__body">
        <div className="site-footer__badge">
          <img src="/assets/brand/logo-primary.png" alt="La-Taste Aeroplane Basmati Rice" width={400} height={400} loading="lazy" />
        </div>
        <div className="pattern" aria-hidden="true" />
        <div className="wrap site-footer__grid">
          <p className="site-footer__line">Basmati, given time.</p>
          <nav className="site-footer__nav" aria-label="Footer">
            <div>
              <h2 className="label">Rice</h2>
              <a href="#range">Reserve</a>
              <a href="#range">Classic</a>
              <a href="#range">Golden Sella</a>
            </div>
            <div>
              <h2 className="label">Cook</h2>
              <a href="#kitchen">Recipes</a>
              <a href="#table">The Indian table</a>
              <a href="#faq">Cooking basmati</a>
            </div>
            <div>
              <h2 className="label">Company</h2>
              <a href="#story">Our story</a>
              <a href="#fields">Our fields</a>
              <a href="mailto:trade@aeroplanerice.com">Trade and export</a>
              <a href="mailto:hello@aeroplanerice.com">Contact</a>
            </div>
          </nav>
        </div>
        <div className="wrap site-footer__base">
          <p>© 2026 Aeroplane Basmati Rice. Long-grain basmati, since 1969.</p>
          <p><a href="#top">Back to top</a></p>
        </div>
      </div>
    </footer>
  );
}
