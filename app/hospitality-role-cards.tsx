import {hospitalityRoles, type HospitalityRole} from './hospitality-roles';

// Original implementation informed by Vengeance UI's Staggered Grid composition.
const cards: {role: HospitalityRole; photo: string; alt: string}[] = [
  {role:'kitchen-teams',photo:'kitchen',alt:'Chef tossing fresh vegetables in a frying pan'},
  {role:'front-of-house',photo:'waiting',alt:'Wine glasses and cutlery set for restaurant service'},
  {role:'reception-teams',photo:'reception',alt:'An empty hotel reception desk with warm pendant lighting'},
  {role:'baristas',photo:'baristas',alt:'Espresso equipment and freshly prepared coffee'},
  {role:'back-of-house',photo:'back-house',alt:'White china plates stacked on kitchen shelves'},
  {role:'event-staffing',photo:'events',alt:'An empty event venue prepared with dining tables'},
];

export function HospitalityRoleCards() {
  return <div className="role-photo-grid">{cards.map(({role,photo,alt}) => {
    const info = hospitalityRoles[role];
    return <a key={role} className="role-photo-card" href={'/expertise/hospitality/'+role}>
      <div className="role-photo-frame"><img src={'/images/editorial/role-stock-'+photo+'.webp'} alt={alt} width="1536" height="1024" loading="lazy" decoding="async"/></div>
      <div className="role-photo-copy"><h3>{info.title}</h3><p>{info.intro}</p><span className="role-photo-link">Explore role <span aria-hidden="true">↗</span></span></div>
    </a>;
  })}</div>;
}
