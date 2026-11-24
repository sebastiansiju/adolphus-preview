import { createRoot } from 'react-dom/client';
import { Button } from '@animate-ui/react/primitives/buttons/button';
import { AnimatedCheckmarkCircle } from './components/vendor/forgeui/animated-form';
import Infinite from './src/components/ui/Infinite';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

export function mountEnhancements() {
  const about = document.querySelector('#approach');
  if (about && !about.nextElementSibling?.matches('.about-photo-strip') && !reduced.matches) {
    const strip = document.createElement('div');
    strip.className = 'about-photo-strip';
    strip.setAttribute('aria-hidden', 'true');
    about.after(strip);
    const source = location.protocol === 'file:' ? 'public/' : '/';
    createRoot(strip).render(<Infinite images={[
      source + 'banquet-hero.png',
      source + 'tower-bridge-night.png',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=750&q=80',
    ]} imageWidth="17rem" imageGap=".5rem" imageHeight="9rem" imageOpacity={1}
      maxWidth="none" animationDuration={35}
      maskGradient="linear-gradient(to right, transparent, black 8%, black 92%, transparent)"/>);
  }

  const form = document.querySelector('#role-enquiry');
  if (form && !form.querySelector('.forge-draft-mark')) {
    const submit = form.querySelector('button[type="submit"]');
    const control = document.createElement('span');
    submit.after(control);
    createRoot(control).render(<Button className="button" type="submit"
      hoverScale={reduced.matches ? 1 : 1.025} tapScale={reduced.matches ? 1 : .97}>Prepare email</Button>);
    new MutationObserver((_, observer) => {
      if (!control.firstElementChild) return;
      submit.hidden = true;
      observer.disconnect();
    }).observe(control, {childList:true});

    const result = document.querySelector('#enquiry-result');
    const badge = document.createElement('span');
    badge.className = 'forge-draft-mark';
    badge.setAttribute('aria-hidden', 'true');
    result.prepend(badge);
    const root = createRoot(badge);
    function showConfirmation() {
      if (result.hidden || reduced.matches) return;
      root.render(<AnimatedCheckmarkCircle circleLength={44} strokeDuration={.35}
        strokeDelay={0} fillDelay={.28} checkmarkDelay={.32}/>);
    }
    new MutationObserver(showConfirmation).observe(result, {attributes:true, attributeFilter:['hidden']});
    showConfirmation();
  }
}


