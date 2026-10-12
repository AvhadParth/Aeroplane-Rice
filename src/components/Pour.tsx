import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Img } from './ui';

/** The line is set twice, in indigo on the page and in white inside the photograph, so the letters change colour where they cross it. */
function Words({ left, right, hidden }: { left: MotionValue<string>; right: MotionValue<string>; hidden?: boolean }) {
  const Tag = hidden ? 'p' : 'h2';
  return (
    <Tag className="pour__words" aria-hidden={hidden || undefined}>
      <m.span className="pour__word pour__word--a" style={{ x: left }}>Basmati,</m.span>
      {!hidden && ' '}
      <m.span className="pour__word pour__word--b" style={{ x: right }}>given time.</m.span>
    </Tag>
  );
}

export function Pour() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const left = useTransform(scrollYProgress, [0, 1], ['7%', '-7%']);
  const right = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section className="pour light" ref={ref}>
      <div className="pour__stage">
        <Words left={left} right={right} />
        <div className="pour__photo">
          <m.div className="pour__image" style={{ y }}>
            <Img name="hero-pour" alt="Hands pouring long-grain basmati rice into a wooden bowl" sizes="(min-width: 900px) 26vw, 62vw" />
          </m.div>
          <div className="pour__over"><Words left={left} right={right} hidden /></div>
        </div>
      </div>
      <div className="wrap pour__note">
        <p className="lede">Eight months in jute, through a winter and a summer. That is all the secret there is.</p>
        <a className="btn" href="#range">Buy aged basmati</a>
      </div>
    </section>
  );
}
