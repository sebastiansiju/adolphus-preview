import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

/** Shared by the React lifecycle and the standalone HTML preview. */
export function initInteractions(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const opening = document.querySelector<HTMLElement>('.opening-reveal');
  // One entrance treatment on every route; no loading screen or scroll lock.
  const intro = gsap.matchMedia();
  if (opening) opening.style.display = 'none';
  intro.add('(prefers-reduced-motion: no-preference)', () => {
    // Preserve deep links and restored reading positions.
    if (location.hash || window.scrollY > 40) return;
    gsap.fromTo('#page-content',
      {opacity:0, y:24, scale:.975, transformOrigin:'50% 0%'},
      {opacity:1, y:0, scale:1, duration:.65, ease:'power3.out',
        clearProps:'opacity,transform,transformOrigin',
        onComplete:() => ScrollTrigger.refresh()}
    );
  });
  const abort = new AbortController();
  const options = {signal: abort.signal};
  const fog = document.querySelector<HTMLElement>('.vanta-atmosphere');
  let disposeFog: (() => void) | undefined;
  let fogScript: HTMLScriptElement | undefined;
  if (fog && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const fogWindow = window as typeof window & {AdolphusFog?: {mount: (element: HTMLElement) => () => void}};
    const startFog = () => {
      if (!abort.signal.aborted && fogWindow.AdolphusFog) disposeFog = fogWindow.AdolphusFog.mount(fog);
    };
    if (fogWindow.AdolphusFog) startFog();
    else {
      fogScript = document.createElement('script');
      fogScript.src = fog.dataset.script!;
      fogScript.onload = startFog;
      document.head.appendChild(fogScript);
    }
  }
  const menu = document.querySelector<HTMLButtonElement>('.menu');
  const nav = document.querySelector<HTMLElement>('#primary-navigation');
  const close = (focus = false) => {
    const open = menu?.getAttribute('aria-expanded') === 'true';
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = 'Menu';
    if (open && focus) menu?.focus();
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    nav?.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? 'Close' : 'Menu';
  }, options);
  nav?.addEventListener('click', event => { if ((event.target as Element).closest('a')) close(); }, options);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(true); }, options);
  document.addEventListener('click', event => { if (!(event.target as Element).closest('header')) close(); }, options);
  const revealHash = () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target instanceof HTMLDetailsElement) target.open = true;
  };
  revealHash();
  window.addEventListener('hashchange', revealHash, options);
  const form = document.querySelector<HTMLFormElement>('#role-enquiry');
  const sector = form?.elements.namedItem('sector');
  if (sector instanceof HTMLSelectElement) {
    const value = new URLSearchParams(location.search).get('sector');
    if (value && Array.from(sector.options).some(option => option.value === value)) sector.value = value;
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = 'Candidate enquiry — ' + data.get('sector');
    const body = `Hello Adolphus Group,\n\nI am interested in ${data.get('sector')} roles.\nPreferred work: ${data.get('placement')}\n\nExperience and availability:\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}`;
    const link = document.querySelector<HTMLAnchorElement>('#prepared-email');
    if (link) link.href = 'mailto:info@adolphusgroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const result = document.querySelector<HTMLElement>('#enquiry-result');
    const status = document.querySelector<HTMLElement>('#enquiry-status');
    if (result) result.hidden = false;
    if (status) status.textContent = 'Your email is ready. Open your email app below, attach your CV if you wish, and send it. Nothing has been submitted on this website.';
    link?.focus();
  }, options);
  document.querySelectorAll<HTMLElement>('[data-sector]').forEach(link => link.addEventListener('click', () => {
    if (sector instanceof HTMLSelectElement) sector.value = link.dataset.sector ?? '';
    (form?.elements.namedItem('message') as HTMLElement | null)?.focus();
  }, options));
  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    // Layered photographic depth is confined to the homepage hero.
    const hero = document.querySelector<HTMLElement>('.home-page .hero-banner');
    if (hero) {
      gsap.fromTo(hero.querySelector('.banquet-shot'), {scale:1.06,yPercent:0}, {
        scale:1.08,yPercent:6,ease:'none',
        scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.45}
      });
      gsap.fromTo(hero.querySelector('.hero-mist-bank'), {yPercent:0,scale:1}, {
        yPercent:-18,scale:1.12,ease:'none',
        scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.55}
      });
      gsap.fromTo(hero.querySelector('.hero-upper-mist'), {opacity:0,yPercent:0}, {
        opacity:.1,yPercent:-12,ease:'none',
        scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:.45}
      });
    }
    gsap.utils.toArray<HTMLElement>('.overview-images img, .about-photo img').forEach(image => {
      gsap.fromTo(image, {clipPath:'inset(8% 0 0 0)'}, {
        clipPath:'inset(0% 0 0 0)',duration:1,ease:'power2.out',
        scrollTrigger:{trigger:image,start:'top 90%',once:true}
      });
    });

  });
  return () => { abort.abort(); disposeFog?.(); fogScript?.remove(); intro.revert(); motion.revert(); close(); };
}
