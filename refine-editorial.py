from pathlib import Path
p=Path('app/site-page.tsx')
s=p.read_text(encoding='utf-8')
s=s.replace('>Let’s talk </a>','>Hire staff</a>')
s=s.replace('<div className="banner-copy"><h1','<div className="banner-copy"><span className="hero-eyebrow">London · Specialist recruitment</span><h1')
s=s.replace('>Find your next hire </a>','>Hire staff</a>').replace('>Find your next role </a>','>Find work</a>')
s=s.replace('<img src="/banquet-hero.png" alt="An elegant banquet setting" loading="lazy"/>','<img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" alt="Restaurant service, from kitchen to table" loading="lazy"/>')
s=s.replace('<div className="home-hiring-lead"><h2','<div className="home-hiring-lead"><span className="section-caption">For employers</span><h2')
s=s.replace('<div className="careers-copy"><h2>Looking for work?','<div className="careers-copy"><span className="section-caption">For candidates</span><h2>Your experience.<br/>Your next chapter.')
s=s.replace('Explore opportunities </a>','Tell us about yourself</a>')
s=s.replace('<h3>Hospitality &amp; Events</h3>','<h2>Hospitality &amp; Events</h2>')
s=s.replace('<div className="card-content"><h3>{title}</h3>','<div className="card-content"><h2>{title}</h2>')
s=s.replace('<section className="approach">','<figure className="about-photo"><img src="/tower-bridge-night.png" alt="Tower Bridge and the London skyline at dusk" loading="lazy"/><figcaption>Based in London. Built around people.</figcaption></figure><section className="approach">')
s=s.replace('<section className="candidate-enquiry content-section"','<section className="candidate-steps content-section" aria-label="How to enquire"><article><h2>Introduce yourself</h2><p>Share your experience, preferred work and availability.</p></article><article><h2>Start a conversation</h2><p>Our consultants can discuss current opportunities and the requirements of the role.</p></article><article><h2>Agree your next step</h2><p>Find out what information or checks are needed before moving forward.</p></article></section><section className="candidate-enquiry content-section"')
s=s.replace('<a className="button" href="mailto:info@adolphusgroup.com">Email our team</a>','<div className="contact-choices"><a className="button" href="mailto:info@adolphusgroup.com?subject=Staffing%20enquiry">I’m hiring</a><a className="inline-link" href="/candidates#role-enquiry">I’m looking for work</a></div><div className="brief-checklist"><h3>What to include in your brief</h3><p>The role and location, the experience you need, your preferred start date and whether the position is temporary, interim or permanent.</p><span>Send these details by email and our team can discuss the next steps with you.</span></div>')
s=s.replace("  const service = services.find", "  const roleExamples: Record<string,string[]> = {finance:['Accounting','Finance operations','Financial reporting'],technology:['Software development','IT support','Media roles'],'care-education':['Care staff','Teachers','Classroom support'],administration:['Office administration','Reception','Business support']};\n  const service = services.find")
s=s.replace('<div className="sector-brief"><div>', '<div className="sector-role-list"><span className="section-caption">Areas we support</span><ul>{roleExamples[view]?.map(role=><li key={role}>{role}</li>)}</ul></div><div className="sector-brief"><div>')
p.write_text(s,encoding='utf-8')
p=Path('lib/interactions.ts'); s=p.read_text(encoding='utf-8')
start=s.index('    // Snap into the next section')
end=s.index('    // Layered photographic depth',start)
s=s[:start]+s[end:]
# Only reveal photographs; never hide interactive sections or copy.
start=s.index('    gsap.utils.toArray<HTMLElement>')
end=s.index('\n\n  });',start)
s=s[:start]+'''    gsap.utils.toArray<HTMLElement>('.overview-images img, .about-photo img').forEach(image => {
      gsap.fromTo(image, {clipPath:'inset(8% 0 0 0)'}, {
        clipPath:'inset(0% 0 0 0)',duration:1,ease:'power2.out',
        scrollTrigger:{trigger:image,start:'top 90%',once:true}
      });
    });'''+s[end:]
p.write_text(s,encoding='utf-8')
