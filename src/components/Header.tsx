import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { CartButton, useCart } from './Cart';

const links = [
  ['#range', 'Shop'],
  ['#heritage', 'Heritage'],
  ['#fields', 'Fields'],
  ['#kitchen', 'Recipes'],
  ['#story', 'Our story'],
];

export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const [solid, setSolid] = useState(false);

  // clear over the opening photograph, white once the page starts to move
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onMenuClick = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).closest('.menu__close, .menu__nav a')) menu.current?.close();
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <p className="announce">Free 1 kg sugar with 5, 10 and 20 kg packs of Raw La-Taste Basmati. <a href="#range">Shop now</a></p>
      <header className="site-header" data-solid={solid}>
        <div className="site-header__bar">
          <a className="site-header__logo" href="#top" aria-label="Aeroplane Basmati, home">
            <img src="/assets/brand/logo-shield.png" alt="La-Taste Aeroplane Basmati" width={400} height={188} />
          </a>
          <nav className="site-nav" aria-label="Main">
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="site-header__tools">
            <CartButton />
            <button className="menu-button" type="button" aria-haspopup="dialog" aria-label="Open menu" onClick={() => menu.current?.showModal()}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <dialog className="menu dark" ref={menu} aria-label="Menu" onClick={onMenuClick}>
        <div className="menu__inner">
          <div className="menu__top">
            <img src="/assets/brand/logo-shield-white.png" alt="La-Taste Aeroplane Basmati" width={1212} height={641} loading="lazy" />
            <button className="menu__close" type="button" aria-label="Close menu"><span /><span /></button>
          </div>
          <nav className="menu__nav" aria-label="Mobile">
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a href="#table">The Indian table</a>
          </nav>
          <p className="menu__note">Long-grain basmati, since 1969.</p>
        </div>
      </dialog>
    </>
  );
}

/** On phones, a buy bar that stays within reach once the first screen has scrolled away. */
export function ShopBar() {
  const { count, open } = useCart();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="shop-bar" data-shown={shown} inert={!shown}>
      <a className="btn" href="#range">Shop the range</a>
      <button type="button" className="btn btn--line" onClick={open}>Cart ({count})</button>
    </div>
  );
}
