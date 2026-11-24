export const hospitalityRoles = {
  'kitchen-teams': {
    title:'Kitchen teams', intro:'Kitchen support shaped around your menu, your service and your standards.',
    summary:'Chefs and kitchen staff support food preparation, cooking and the organisation of a busy kitchen. Responsibilities depend on the position, the menu and the level of experience required.',
    duties:['Prepare ingredients and organise workstations before service.','Cook and present dishes to the kitchen’s specifications, where the role requires it.','Coordinate with colleagues to keep preparation and service running smoothly.','Maintain clean, organised working areas and follow the venue’s procedures.'],
    skills:['Preparation and service experience relevant to the role','Organisation and communication under pressure','Care with consistency, presentation and instructions'],
    brief:'Share your menu style, expected covers, shift pattern and the level of kitchen experience you need.', image:'/banquet-hero.png'
  },
  'front-of-house': {
    title:'Front of house', intro:'Guest-facing teams who help make every service feel considered.',
    summary:'Front-of-house staff support the guest experience from arrival to departure. Depending on the role, they welcome guests, prepare dining areas, take orders and coordinate food and beverage service.',
    duties:['Prepare tables and guest areas for service.','Welcome guests and communicate their requests to the appropriate team.','Support food and beverage service in line with the venue’s service style.','Clear and reset tables while keeping guest areas organised.'],
    skills:['Clear communication and attentive guest service','Teamwork with kitchen and floor colleagues','Awareness of service timing and presentation'],
    brief:'Tell us about your venue, service style, shift times and the guest-facing experience you need.', image:'/royal-banquet-hero.png'
  },
  'event-staffing': {
    title:'Event staffing', intro:'Service teams prepared for the pace and detail of your occasion.',
    summary:'Event staff support banquets, receptions and private functions. Their duties follow the event brief, from preparing the space and welcoming guests to service and clearing down.',
    duties:['Help prepare service areas and table settings before guests arrive.','Support guest arrivals and direct requests to the event lead.','Deliver food and beverage service according to the event schedule.','Work with the venue team on clearing and resetting after service.'],
    skills:['Adaptability across venues and event formats','Clear teamwork and attention to the event brief','Professional presentation and organised service'],
    brief:'Share your event date, location, guest numbers, service format and the number of staff required.', image:'/banquet-hero.png'
  }
};
export type HospitalityRole = keyof typeof hospitalityRoles;
export function HospitalityRoleContent({role}:{role:HospitalityRole}) {
  const info= hospitalityRoles[role];
  return <section className="service-detail role-detail content-section">
    <a className="inline-link" href="/expertise/hospitality">Back to Hospitality &amp; Events</a>
    <div className="sector-detail-hero"><div><h1>{info.title}</h1><p>{info.intro}</p><a className="button" href={'mailto:info@adolphusgroup.com?subject='+encodeURIComponent(info.title+' staffing enquiry')}>Discuss your staffing needs</a></div><img src={info.image} alt="A hospitality venue prepared for service" width="1200" height="900"/></div>
    <div className="role-responsibilities"><div><h2>What the team does</h2><p>{info.summary}</p></div><ul>{info.duties.map(item=><li key={item}>{item}</li>)}</ul></div>
    <div className="role-preparation"><div><h2>Capabilities for your service</h2><p>We discuss the experience and responsibilities your role calls for. Individual capabilities and suitability are considered against your brief.</p><ul>{info.skills.map(item=><li key={item}>{item}</li>)}</ul></div><div><h2>Training and induction</h2><p>Adolphus Group provides training and additional induction before candidates are put forward for recruitment, helping them prepare for the expectations of hospitality work.</p><p>Tell us about your venue’s procedures and service requirements so these can be discussed as part of the preparation. Ask our team about the training and induction relevant to the role you need to fill.</p></div></div>
    <div className="role-next"><div><h2>Build your team</h2><p>{info.brief}</p><a className="button" href="/contact">Talk to our team</a></div><div><h2>Looking for this kind of work?</h2><p>Tell us about your experience and availability. Our consultants can explain the opportunities, training and induction process.</p><a className="inline-link" href="/candidates?sector=Hospitality%20%26%20Events#role-enquiry">Enquire about hospitality roles</a></div></div>
    <nav className="related-roles" aria-label="Other hospitality roles">{Object.entries(hospitalityRoles).filter(([key])=>key!==role).map(([key,value])=><a className="inline-link" key={key} href={'/expertise/hospitality/'+key}>{value.title} →</a>)}</nav>
  </section>;
}
