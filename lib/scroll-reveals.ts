import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

/** Independent homepage section entrances, disposed when the route unmounts. */
export function initScrollReveals(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const page = document.querySelector<HTMLElement>('.home-page #page-content');
    if (!page) return;
    // Each section owns its trigger; the hero is deliberately outside this list.
    const sections = Array.from(page.querySelectorAll<HTMLElement>(
      ':scope > .home-overview, :scope > .sector-gallery, :scope > .home-hiring, :scope > .home-careers, :scope > .home-faq, :scope > .home-closing'
    ));
    const animations = new Map<HTMLElement, gsap.core.Tween>();
    const reveal = (element: HTMLElement) => {
      const animation = animations.get(element);
      if (animation) animation.progress(1);
    };
    sections.forEach(element => {
      // Keep the initial viewport and restored scroll positions immediately readable.
      if (element.getBoundingClientRect().top < window.innerHeight * .6) return;
      const animation = gsap.fromTo(element,
        {opacity:0, y:90, scale:.94, transformOrigin:'50% 0%'},
        {opacity:1, y:0, scale:1, duration:1.05, ease:'power2.out',
          scrollTrigger:{trigger:element,start:'top 72%',toggleActions:'play reverse play reverse'}}
      );
      animations.set(element, animation);
    });
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      sections.filter(section => section.contains(event.target as Node)).forEach(reveal);
    };
    const onHash = () => {
      const target = document.getElementById(location.hash.slice(1));
      if (target) sections.filter(section => section.contains(target)).forEach(reveal);
    };
    page.addEventListener('focusin', onFocus);
    window.addEventListener('hashchange', onHash);
    onHash();
    return () => {
      page.removeEventListener('focusin', onFocus);
      window.removeEventListener('hashchange', onHash);
    };
  });
  return () => media.revert();
}
