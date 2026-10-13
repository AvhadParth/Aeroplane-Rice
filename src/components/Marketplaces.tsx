// Where else Aeroplane is sold. The logos are each company's own artwork (from Wikimedia Commons), shown unaltered.
// Where else Aeroplane is sold. Each link opens that marketplace's own search for the product,
// so it keeps working when listings change. Swap in exact store or listing addresses when they are supplied.
const marketplaces = [
  { name: 'Amazon', logo: 'amazon', search: (q: string) => `https://www.amazon.in/s?k=${q}` },
  { name: 'Flipkart', logo: 'flipkart', search: (q: string) => `https://www.flipkart.com/search?q=${q}` },
  { name: 'Blinkit', logo: 'blinkit', search: (q: string) => `https://blinkit.com/s/?q=${q}` },
  { name: 'Zepto', logo: 'zepto', search: (q: string) => `https://www.zeptonow.com/search?query=${q}` },
];

const Out = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 16 17 7M9 7h8v8" />
  </svg>
);

/** A row of links to the marketplaces. `compact` is the small version used beside a product. */
export function Marketplaces({ query, compact = false }: { query: string; compact?: boolean }) {
  const q = encodeURIComponent(query);
  const links = marketplaces.map((shop) => (
    <li key={shop.name}>
      <a href={shop.search(q)} target="_blank" rel="noopener" aria-label={`Find ${query} on ${shop.name} (opens in a new tab)`}>
        {!compact && <span className="label">Shop on</span>}
        <img className={`markets__logo markets__logo--${shop.logo}`} src={`/assets/marketplaces/${shop.logo}.svg`} alt={shop.name} loading="lazy" />
        <Out />
      </a>
    </li>
  ));

  if (compact) {
    return (
      <div className="markets markets--compact">
        <p className="label">Also find it on</p>
        <ul>{links}</ul>
      </div>
    );
  }
  return (
    <section className="markets light" aria-labelledby="markets-title">
      <div className="wrap">
        <h2 className="label" id="markets-title">Also on the apps you already use</h2>
        <ul>{links}</ul>
      </div>
    </section>
  );
}
