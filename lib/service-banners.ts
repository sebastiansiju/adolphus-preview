import {gsap} from 'gsap';

export function initServiceBanners() {
  const list = document.querySelector<HTMLElement>('#expertise .service-banners');
  if (!list) return;

  const banners = Array.from(list.querySelectorAll<HTMLElement>('.service-banner'));
  const pending = new Set<HTMLElement>();
  const slides = new Map<HTMLElement, gsap.core.Tween>();
  let active: HTMLElement | undefined;

  function playNext() {
    if (active) return;
    const next = pending.values().next().value;
    if (!next) return;
    pending.delete(next);
    active = next;
    slides.get(next)?.play();
  }

  // Observe the stationary article while its link moves inside the clipped frame.
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      const banner = target as HTMLElement;
      if (isIntersecting) pending.add(banner);
      else pending.delete(banner);
    }
    playNext();
  }, {rootMargin: '0px 0px -12% 0px'});

  banners.forEach((banner, index) => {
    const link = banner.querySelector('a');
    if (!link) return;
    const slide = gsap.fromTo(link, {xPercent: index % 2 === 0 ? -100 : 100}, {
      xPercent: 0,
      duration: .85,
      ease: 'power2.inOut',
      paused: true,
      onComplete: () => {
        observer.unobserve(banner);
        pending.delete(banner);
        if (active === banner) active = undefined;
        playNext();
      }
    });
    slides.set(banner, slide);
    observer.observe(banner);
  });

  const showFocusedBanner = (event: FocusEvent) => {
    const banner = event.target instanceof Element && event.target.closest<HTMLElement>('.service-banner');
    if (banner) slides.get(banner)?.progress(1);
  };
  list.addEventListener('focusin', showFocusedBanner);
  return () => {
    observer.disconnect();
    pending.clear();
    list.removeEventListener('focusin', showFocusedBanner);
  };
}
