import { useState } from 'react';
import { price, products, type Product } from '../products';
import { Stepper, useCart } from './Cart';
import { Img } from './ui';

const promises = [
  ['sack', 'Free delivery', 'On orders over ₹999, across India.'],
  ['hands', 'Packed to order', 'Sealed at the mill, sent within two working days.'],
  ['bowl', 'Cooks right or we replace it', 'Tell us within 30 days and we will send a fresh pack.'],
  ['scoop', 'Secure payment', 'UPI, cards, net banking and cash on delivery.'],
] as const;

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.variants[0].size);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.size === size)!;

  return (
    <article className="product">
      <div className={`product__niche product__niche--${product.tone}`}>
        <Img name="pouch" alt={`Aeroplane ${product.name} basmati rice pouch`} sizes="(min-width: 900px) 30vw, 100vw" />
        <img className="product__logo" src="/assets/brand/logo-primary.png" alt="" width={400} height={400} loading="lazy" />
        <p className="product__tag">{product.name}</p>
      </div>

      <div className="product__title">
        <h3>{product.name}</h3>
        <p className="product__price">{price(variant.price)}</p>
      </div>
      <p className="product__line">{product.line}</p>

      <fieldset className="sizes">
        <legend className="label">Pack size</legend>
        {product.variants.map((v) => (
          <label key={v.size}>
            <input type="radio" name={`size-${product.id}`} value={v.size} checked={v.size === size} onChange={() => setSize(v.size)} />
            <span>{v.size}</span>
          </label>
        ))}
      </fieldset>

      <div className="product__buy">
        <Stepper value={quantity} onChange={(q) => setQuantity(Math.max(1, q))} label={`Quantity of ${product.name}`} />
        <button type="button" className="btn" onClick={() => { add(product.id, size, quantity); setQuantity(1); }}>Add to cart</button>
      </div>

      <dl className="spec">
        {product.facts.map(([label, value]) => (
          <div key={label}><dt className="label">{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </article>
  );
}

export function Range() {
  return (
    <section className="range light" id="range">
      <div className="wrap">
        <div className="head">
          <h2 className="display">Shop the range.</h2>
          <p className="lede">Three rices from the same fields and the same patient way of working. Choose by what you are cooking.</p>
        </div>

        <div className="products">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <ul className="promises">
          {promises.map(([icon, title, text]) => (
            <li key={title}>
              <span className={`ico ico--${icon}`} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
