import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min.js';

export function mount(element) {
  let effect;
  let visible = false;
  const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
  const stop = () => {
    effect?.destroy();
    effect = undefined;
    element.style.opacity = '0';
  };
  const update = () => {
    if (!visible || document.hidden || !media.matches) return stop();
    if (effect) return;
    try {
      effect = FOG({el:element, THREE, mouseControls:false, touchControls:false,
        gyroControls:false, highlightColor:0xf1c782, midtoneColor:0x826342,
        lowlightColor:0x11130f, baseColor:0x171914, blurFactor:.65,
        speed:.7, zoom:1.1, scale:2, scaleMobile:4});
      if (!element.querySelector('canvas')) { stop(); return; }
      element.style.opacity = '.58';
    } catch { stop(); }
  };
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    update();
  });
  observer.observe(element);
  media.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
  return () => {
    observer.disconnect();
    media.removeEventListener('change',update);
    document.removeEventListener('visibilitychange',update);
    stop();
  };
}
