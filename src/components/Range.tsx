import { useState } from 'react';
import { categories, firstInStock, price, products, type Product } from '../products';
import { useCart } from './Cart';

// the brand's own six reasons, from its pack inserts
const reasons = [
  ['bowl', 'Made for daily cooking'],
  ['handi', 'Holds well after cooking'],
  ['paddy', 'Original rich aroma'],
  ['scatter', 'Non-sticky texture'],
  ['hands', 'Soft and tasty'],
  ['sack', 'Hygienically packed'],
] as const;

const FIRST = 8;

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(firstInStock(product).size);
  const variant = product.variants.find((v) => v.size === size)!;
  const saving = Math.round((1 - variant.price / variant.was) * 100);

  return (
    <article className="product">
      <a className="product__shot" href={product.url} target="_blank" rel="noopener" aria-label={`${product.name}, full details on the Aeroplane shop (opens in a new tab)`}>
        <img src={product.image} alt="" width={product.width} height={product.height} loading="lazy" decoding="async" />
        {!variant.inStock ? <span className="product__flag product__flag--out">Sold out</span>
          : saving > 0 && <span className="product__flag">Save {saving}%</span>}
      </a>

      <h3>{product.name}</h3>
      <p className="product__price">
        <b>{price(variant.price)}</b>
        {variant.was > variant.price && <s>{price(variant.was)}</s>}
      </p>

      {product.variants.length > 1 ? (
        <fieldset className="sizes">
          <legend className="sr">Pack size</legend>
          {product.variants.map((v) => (
            <label key={v.size}>
              <input type="radio" name={`size-${product.id}`} value={v.size} checked={v.size === size} onChange={() => setSize(v.size)} />
              <span data-out={!v.inStock || undefined}>{v.size}</span>
            </label>
          ))}
        </fieldset>
      ) : <p className="product__one">{variant.size}</p>}

      <button type="button" className="btn btn--small product__add" disabled={!variant.inStock} onClick={() => add(product.id, size)}>
        {variant.inStock ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  );
}

export function Range() {
  const [category, setCategory] = useState('Basmati');
  const [all, setAll] = useState(false);
  const matching = category === 'All' ? products : products.filter((p) => p.category === category);
  const shown = all ? matching : matching.slice(0, FIRST);

  return (
    <section className="range light" id="range">
      <div className="wrap">
        <div className="head">
          <h2 className="display">Shop the range.</h2>
          <p className="lede">Every Aeroplane pack, at today's shop prices. Choose a size and add it to your cart.</p>
        </div>

        <div className="filters" role="group" aria-label="Filter products">
          {[...categories, 'All'].map((name) => (
            <button key={name} type="button" className="filters__pill" aria-pressed={name === category} onClick={() => { setCategory(name); setAll(false); }}>
              {name}
              <span>{name === 'All' ? products.length : products.filter((p) => p.category === name).length}</span>
            </button>
          ))}
        </div>

        <div className="products" aria-live="polite">
          {shown.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        {matching.length > FIRST && !all && (
          <p className="products__more"><button type="button" className="btn btn--line" onClick={() => setAll(true)}>Show all {matching.length}</button></p>
        )}

        <div className="reasons">
          <h3>Why aged Aeroplane rice</h3>
          <ul>
            {reasons.map(([icon, text]) => (
              <li key={text}><span className={`ico ico--${icon}`} aria-hidden="true" />{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
