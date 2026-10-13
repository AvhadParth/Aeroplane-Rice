import { useEffect } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { settle, usePath } from './router';
import { CartProvider } from './components/Cart';
import { Header, ShopBar } from './components/Header';
import { Band } from './components/ui';
import { Hero } from './components/Hero';
import { Heritage } from './components/Heritage';
import { Pour } from './components/Pour';
import { Range } from './components/Range';
import { Fields } from './components/Fields';
import { Table } from './components/Table';
import { Kitchen } from './components/Kitchen';
import { Story } from './components/Story';
import { Faq, Footer, Promise } from './components/Closing';
import { ProductPage } from './components/ProductPage';

function Home() {
  return (
    <main id="main">
      <Hero />
      <Band art="harvest" />
      <Heritage />
      <Pour />
      <Range />
      <Fields />
      <Table />
      <Band art="kitchen" tone="rice" />
      <Kitchen />
      <Band art="dance" />
      <Promise />
      <Story />
      <Faq />
    </main>
  );
}

export function App() {
  const path = usePath();
  const productId = path.match(/^\/products\/([^/]+)\/?$/)?.[1];

  // a link such as /#range opened directly: the section does not exist until the page has rendered
  useEffect(() => { if (location.hash) settle(location.hash); }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <CartProvider>
          <Header plain={Boolean(productId)} />
          {productId ? <ProductPage key={productId} id={productId} /> : <Home />}
          <Footer />
          {!productId && <ShopBar />}
        </CartProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
