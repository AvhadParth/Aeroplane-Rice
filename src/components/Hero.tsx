import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import { Img, Sketch } from './ui';

const ease = [0.2, 0.7, 0.1, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '7%']);
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);

  return (
    <section className="hero light" id="top" ref={ref}>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="label hero__since">Aged basmati, since 1969</p>
          <h1 className="hero__title">
            {['The long grain', 'of India.'].map((line, i) => (
              <span className="line" key={line}>
                <m.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: i * 0.1, ease }}>{line}</m.span>
              </span>
            ))}
          </h1>
          <p className="lede hero__lede">Basmati grown at the foot of the Himalayas, cut by hand, and rested for eight months before it is milled. Slender, fragrant, and never in a hurry.</p>
          <div className="hero__actions">
            <a className="btn" href="#range">Shop the range</a>
            <a className="btn btn--line" href="#kitchen">Cook with it</a>
          </div>
          <p className="hero__assure">From ₹199. Free delivery over ₹999. Cash on delivery available.</p>
        </div>

        <div className="hero__art">
          <m.img
            className="hero__stalks" src="/assets/art/ill-paddy.webp" srcSet="/assets/art/ill-paddy-s.webp 661w, /assets/art/ill-paddy.webp 952w" sizes="(min-width: 900px) 24vw, 46vw"
            alt="" width={952} height={1475}
            initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 1.6, delay: 0.5, ease }}
          />
          <m.div className="hero__arch hero__arch--main" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.4, delay: 0.15, ease }}>
            <m.div style={{ y }}>
              <Img name="paddy-gold" alt="Golden basmati paddy, heavy with grain, at sunset" sizes="(min-width: 900px) 30vw, 62vw" eager />
            </m.div>
          </m.div>
          <m.div className="hero__arch hero__arch--side" style={{ y: lift }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.7, ease }}>
            <Img name="steamed" alt="A bowl of steamed basmati rice" sizes="(min-width: 900px) 15vw, 34vw" />
          </m.div>
        </div>
      </div>

      <Sketch name="harvest" alt="Farmers cutting and carrying paddy, with a bullock cart and a village under a banyan tree" className="hero__sketch" />
    </section>
  );
}
