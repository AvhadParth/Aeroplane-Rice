import { QuickAdd } from './Cart';
import { Icon, Img, Notch, Sketch } from './ui';

export function Kitchen() {
  return (
    <section className="kitchen light" id="kitchen">
      <Sketch name="kitchen" alt="A brass handi, a clay pot, a bowl of rice, a spice box, a sack of rice and a wooden scoop" className="kitchen__sketch" />
      <div className="wrap">
        <div className="head">
          <h2 className="display">From our kitchen.</h2>
          <p className="lede">Recipes and small lessons from people who have cooked this grain all their lives.</p>
        </div>

        <div className="kitchen__grid">
          <article className="story story--feature">
            <a href="#kitchen" className="story__media frame" tabIndex={-1} aria-hidden="true">
              <Img name="kitchen" alt="" sizes="(min-width: 900px) 60vw, 100vw" />
              <Notch icon="scoop" />
            </a>
            <div className="story__body">
              <p className="label story__kind"><Icon name="scoop" />Method</p>
              <h3><a href="#kitchen">How to cook basmati so every grain stands apart</a></h3>
              <ol className="steps">
                <li><span><b>Rinse</b> three times, until the water runs almost clear.</span></li>
                <li><span><b>Soak</b> for thirty minutes. The grain drinks before it cooks.</span></li>
                <li><span><b>Rest</b> ten minutes off the heat, lid on. Then fluff with a fork.</span></li>
              </ol>
              <QuickAdd productId="reserve" className="story__buy story__buy--feature" />
            </div>
          </article>

          <article className="story">
            <a href="#kitchen" className="story__media frame" tabIndex={-1} aria-hidden="true">
              <Img name="pulao-plate" alt="" sizes="(min-width: 900px) 28vw, 100vw" />
            </a>
            <div className="story__body">
              <p className="label story__kind"><Icon name="bowl" />Recipe, 30 min</p>
              <h3><a href="#kitchen">Weeknight vegetable pulao, one pot</a></h3>
              <p>Whole spices, whatever vegetables are in the house, and rice that has soaked while you chopped.</p>
              <QuickAdd productId="classic" className="story__buy" />
            </div>
          </article>

          <article className="story story--empty dark">
            <div className="pattern" aria-hidden="true" />
            <div className="story__body">
              <Icon name="handi" />
              <h3>More is on the stove</h3>
              <p>New recipes land here every month. Tell us what your family cooks with Aeroplane.</p>
              <a className="btn btn--line btn--small" href="mailto:kitchen@aeroplanerice.com">Send us a recipe</a>
            </div>
          </article>
        </div>
      </div>
      <Sketch name="family" alt="Three generations of a family sharing rice from a brass platter" className="kitchen__family" />
    </section>
  );
}
