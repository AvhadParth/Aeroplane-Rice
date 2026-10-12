import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { CartProvider } from './components/Cart';
import { Header, ShopBar } from './components/Header';
import { Hero } from './components/Hero';
import { Heritage } from './components/Heritage';
import { Pour } from './components/Pour';
import { Range } from './components/Range';
import { Fields } from './components/Fields';
import { Table } from './components/Table';
import { Kitchen } from './components/Kitchen';
import { Story } from './components/Story';
import { Faq, Footer, Promise } from './components/Closing';

export function App() {
  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <CartProvider>
      <Header />
      <main id="main">
        <Hero />
        <Heritage />
        <Pour />
        <Range />
        <Fields />
        <Table />
        <Kitchen />
        <Promise />
        <Story />
        <Faq />
      </main>
      <Footer />
      <ShopBar />
      </CartProvider>
    </MotionConfig>
    </LazyMotion>
  );
}
