import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SHOP_URL, firstInStock, price, products } from '../products';

type Line = { id: string; productId: string; size: string; quantity: number };
type CartValue = {
  lines: Line[];
  count: number;
  add: (productId: string, size: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  open: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const STORE = 'aeroplane-cart';

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used inside CartProvider');
  return cart;
}

function load(): Line[] {
  try { return JSON.parse(localStorage.getItem(STORE) ?? '[]'); } catch { return []; }
}

export function Stepper({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label="Decrease quantity">−</button>
      <output>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity">+</button>
    </div>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(load);
  const drawer = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try { localStorage.setItem(STORE, JSON.stringify(lines)); } catch { /* storage unavailable: the cart lasts for this visit */ }
  }, [lines]);

  const open = useCallback(() => drawer.current?.showModal(), []);

  const add = useCallback((productId: string, size: string, quantity = 1) => {
    const id = `${productId}:${size}`;
    setLines((current) => current.some((line) => line.id === id)
      ? current.map((line) => (line.id === id ? { ...line, quantity: line.quantity + quantity } : line))
      : [...current, { id, productId, size, quantity }]);
    open();
  }, [open]);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) => current.flatMap((line) => (line.id !== id ? [line] : quantity > 0 ? [{ ...line, quantity }] : [])));
  }, []);

  const rows = lines.flatMap((line) => {
    const product = products.find((p) => p.id === line.productId);
    const variant = product?.variants.find((v) => v.size === line.size);
    return product && variant ? [{ ...line, product, each: variant.price, was: variant.was }] : [];
  });
  const count = rows.reduce((sum, row) => sum + row.quantity, 0);
  const subtotal = rows.reduce((sum, row) => sum + row.each * row.quantity, 0);
  const saved = rows.reduce((sum, row) => sum + (row.was - row.each) * row.quantity, 0);

  const value = useMemo(() => ({ lines, count, add, setQuantity, open }), [lines, count, add, setQuantity, open]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <dialog className="cart" ref={drawer} aria-label="Your cart" onClick={(event) => { if (event.target === drawer.current) drawer.current?.close(); }}>
        <div className="cart__panel">
          <header className="cart__head">
            <h2>Your cart <span>({count})</span></h2>
            <button type="button" className="cart__close" aria-label="Close cart" onClick={() => drawer.current?.close()}><span /><span /></button>
          </header>

          {rows.length === 0 ? (
            <div className="cart__empty">
              <span className="ico ico--bowl" aria-hidden="true" />
              <p>Your cart is empty.</p>
              <a className="btn" href="/#range" onClick={() => drawer.current?.close()}>Shop the range</a>
            </div>
          ) : (
            <>
              <ul className="cart__lines">
                {rows.map((row) => (
                  <li key={row.id}>
                    <img src={row.product.image} alt="" width={row.product.width} height={row.product.height} loading="lazy" />
                    <div>
                      <h3>{row.product.name}</h3>
                      <p>{row.size}, {price(row.each)}</p>
                      <div className="cart__controls">
                        <Stepper value={row.quantity} onChange={(q) => setQuantity(row.id, q)} label={`Quantity of ${row.product.name} ${row.size}`} />
                        <button type="button" className="cart__remove" onClick={() => setQuantity(row.id, 0)}>Remove</button>
                      </div>
                    </div>
                    <p className="cart__price">{price(row.each * row.quantity)}</p>
                  </li>
                ))}
              </ul>
              <footer className="cart__foot">
                <p className="cart__total"><span>Subtotal</span><b>{price(subtotal)}</b></p>
                {saved > 0 && <p className="cart__saved">You save {price(saved)} on shop prices.</p>}
                <p className="cart__note">Payment and delivery are completed on the Aeroplane online shop, where you can pick these packs again at the same prices.</p>
                <a className="btn cart__checkout" href={`${SHOP_URL}/shop/`} target="_blank" rel="noopener">Continue to the shop</a>
              </footer>
            </>
          )}
        </div>
      </dialog>
    </CartContext.Provider>
  );
}

/** Adds the smallest pack of a product in one tap. Used beside dishes and recipes. */
export function QuickAdd({ productId, className = '' }: { productId: string; className?: string }) {
  const { add } = useCart();
  const product = products.find((p) => p.id === productId)!;
  const variant = firstInStock(product);
  return (
    <button type="button" className={`btn btn--small ${className}`} disabled={!variant.inStock} onClick={() => add(product.id, variant.size)}>
      Add {product.name} {variant.size}, {price(variant.price)}
    </button>
  );
}

/** Cart button for the header. */
export function CartButton() {
  const { count, open } = useCart();
  return (
    <button type="button" className="cart-button" onClick={open} aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      {count > 0 && <b>{count}</b>}
    </button>
  );
}
