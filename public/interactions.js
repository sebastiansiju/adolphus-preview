// Shared interactions for the Next.js page and standalone preview.
(function () {
  function init() {
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('#primary-navigation');
    if (!menu || menu.dataset.ready) return;
    menu.dataset.ready = 'true';
    function closeMenu(returnFocus) {
      const wasOpen = menu.getAttribute('aria-expanded') === 'true';
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = 'Menu';
      if (wasOpen && returnFocus) menu.focus();
    }
    menu.addEventListener('click', function () {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('open', open);
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
    document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(false); });
    function revealSector() {
      const target = document.getElementById(location.hash.slice(1));
      if (target && target.matches('details')) target.open = true;
    }
    window.addEventListener('hashchange', revealSector);
    document.querySelectorAll('a[href^="#sector-"]').forEach(link => link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target) target.open = true;
    }));
    revealSector();
    const form = document.getElementById('role-enquiry');
    if (form && location.search) {
      const sector = new URLSearchParams(location.search).get('sector');
      if (sector && Array.from(form.elements.sector.options).some(option => option.value === sector)) form.elements.sector.value = sector;
    }
    form?.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = 'Candidate enquiry — ' + data.get('sector');
      const body = 'Hello Adolphus Group,\n\nI am interested in ' + data.get('sector') + ' roles.\nPreferred work: ' + data.get('placement') + '\n\nExperience and availability:\n' + data.get('message') + '\n\nName: ' + data.get('name') + '\nEmail: ' + data.get('email');
      const link = document.getElementById('prepared-email');
      link.href = 'mailto:info@adolphusgroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      document.getElementById('enquiry-result').hidden = false;
      document.getElementById('enquiry-status').textContent = 'Your email is ready. Open your email app below, attach your CV if you wish, and send it. Nothing has been submitted on this website.';
      link.focus();
    });
    document.querySelectorAll('[data-sector]').forEach(link => link.addEventListener('click', () => {
      form.elements.sector.value = link.dataset.sector;
      form.elements.message.focus({ preventScroll: true });
    }));
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({target, isIntersecting}) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          if (!target.contains(document.activeElement)) target.classList.add('motion-enter');
        });
      }, {threshold: 0.08});
      document.querySelectorAll('.intro:not(.home-overview) > *, .expertise-heading, .expertise-feature, .expertise-card, .section-heading, .sector-details details, .values article, .careers-copy, .candidate-enquiry form, .process article, .contact > *, footer > *').forEach(target => observer.observe(target));
    }
    const sections = Array.from(document.querySelectorAll('.home-page #page-content > section:not(:first-child)'));
    if (sections.length && 'IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      function updateSections() {
        const linked = document.getElementById(location.hash.slice(1));
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          const visible = (window.scrollY > 0 && rect.top < window.innerHeight && rect.bottom > 0)
            || (linked && section.contains(linked) && rect.top < window.innerHeight && rect.bottom > 0)
            || section.contains(document.activeElement);
          section.classList.toggle('scroll-section-hidden', !visible);
        }
      }
      const observer = new IntersectionObserver(updateSections);
      sections.forEach(section => observer.observe(section));
      let frame = 0;
      window.addEventListener('scroll', () => {
        if (!frame) frame = window.requestAnimationFrame(() => { frame = 0; updateSections(); });
      }, {passive:true});
      window.addEventListener('hashchange', updateSections);
      document.addEventListener('focusin', updateSections);
      window.addEventListener('pageshow', updateSections);
      updateSections();
    }
    const motion = document.querySelector('#motion-toggle');
    motion?.addEventListener('click', () => {
      const paused = document.querySelector('.perspective-room').classList.toggle('paused');
      motion.setAttribute('aria-pressed', String(paused));
      motion.textContent = paused ? 'Resume background movement' : 'Pause background movement';
    });
  }
  window.initAdolphus = init;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
