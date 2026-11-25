from pathlib import Path
p=Path('app/hospitality-roles.tsx');s=p.read_text(encoding='utf8')
roles={
'reception-teams':dict(title='Reception teams',intro='A considered welcome and organised front-desk support for your hotel.',summary='Reception staff support arrivals, departures and guest enquiries. Their responsibilities are matched to the hotel’s systems, procedures and level of service.',duties=['Welcome guests and direct enquiries to the appropriate colleague.','Support check-in and check-out where trained and authorised.','Keep booking information and shift handovers organised.','Communicate requests clearly with housekeeping and service teams.'],skills=['Attentive guest communication','Organisation and accurate record keeping','Experience with the systems required by the role'],brief='Tell us about your property, shift pattern, booking systems and required reception experience.'),
'baristas':dict(title='Baristas',intro='Coffee service for hotel lounges, cafés and busy hospitality settings.',summary='Baristas prepare drinks and organise the coffee service area. We discuss the equipment, menu and pace of service to understand the experience your venue requires.',duties=['Prepare coffees and other drinks to the venue’s recipes.','Set up and maintain an organised coffee station.','Communicate orders and guest requests clearly.','Follow cleaning, stock and equipment procedures.'],skills=['Coffee preparation experience relevant to your equipment','Order accuracy and service organisation','Care with presentation and customer communication'],brief='Share your coffee menu, equipment, expected service volume and shift times.'),
'back-of-house':dict(title='Back-of-house teams',intro='Practical support that keeps kitchens and service areas ready for the next shift.',summary='Back-of-house staff support the working areas behind guest service. Responsibilities are agreed for the position and can include washing up, cleaning, stock movement and service preparation.',duties=['Keep washing-up and support areas organised.','Clean equipment and work areas following venue instructions.','Help move and store supplies as directed.','Support kitchen and service colleagues during preparation and clear-down.'],skills=['Reliable teamwork and clear communication','Organisation during busy service periods','Care in following cleaning and handling procedures'],brief='Tell us which support duties are required, your shift times and any site-specific procedures.')}
import json
entries=[]
for key,d in roles.items():
 d['image']='';entries.append(json.dumps(key)+':'+json.dumps(d))
s=s.replace('export const hospitalityRoles = {','export const hospitalityRoles = {\n'+',\n'.join(entries)+',')
s=s.replace('<div className="sector-detail-hero">','<div className={info.image ? "sector-detail-hero" : "sector-detail-hero role-text-hero"}>')
s=s.replace('<img src={info.image} alt={info.title+" preparing for hospitality service"} width="1200" height="900"/>','{info.image && <img src={info.image} alt={info.title+" preparing for hospitality service"} width="1200" height="900"/>}')
s=s.replace("href={'mailto:info@adolphusgroup.com?subject='+encodeURIComponent(info.title+' staffing enquiry')}", 'href="/contact#staffing-enquiry"')
s=s.replace("title:'Front of house'","title:'Waiting & front-of-house teams'")
p.write_text(s,encoding='utf8')
for key,d in roles.items():
 folder=Path('app/expertise/hospitality')/key;folder.mkdir(exist_ok=True)
 (folder/'page.tsx').write_text("import SitePage from '../../../site-page';\nexport const metadata={title:"+json.dumps(d['title']+' | Adolphus Group')+"};\nexport default function Page(){return <SitePage view="+json.dumps(key)+"/>;}\n",encoding='utf8')
p=Path('render-preview.cjs');s=p.read_text();s=s.replace("{'kitchen-teams':", "{'reception-teams':'Reception teams','baristas':'Baristas','back-of-house':'Back-of-house teams','kitchen-teams':")
s=s.replace('kitchen-teams|front-of-house|event-staffing','kitchen-teams|front-of-house|event-staffing|reception-teams|baristas|back-of-house').replace('Rendered thirteen linked preview pages.','Rendered sixteen linked preview pages.')
p.write_text(s)
p=Path('lib/interactions.ts');s=p.read_text(encoding='utf8');needle="    const form = document.querySelector<HTMLFormElement>('#role-enquiry');"
block='''    const staffingForm = document.querySelector<HTMLFormElement>('#staffing-enquiry');
    staffingForm?.addEventListener('submit', event => {
      event.preventDefault();
      if (!staffingForm.reportValidity()) return;
      const data = new FormData(staffingForm);
      const fields = [['Name','name'],['Email','email'],['Company or venue','venue'],['Location','location'],['Roles','roles'],['Staff required','headcount'],['Dates and times','dates'],['Support','arrangement'],['Requirements','requirements']];
      const body = 'Hello Adolphus Group,\\n\\nPlease contact me about the following staffing brief.\\n\\n' + fields.map(([label,key]) => label + ': ' + String(data.get(key) ?? '')).join('\\n');
      const link = document.querySelector<HTMLAnchorElement>('#staffing-email');
      if (link) link.href = 'mailto:info@adolphusgroup.com?subject=' + encodeURIComponent('Staffing enquiry — ' + String(data.get('venue'))) + '&body=' + encodeURIComponent(body);
      const result = document.querySelector<HTMLElement>('#staffing-result');
      const status = document.querySelector<HTMLElement>('#staffing-status');
      if (result) result.hidden = false;
      if (status) status.textContent = 'Your draft is ready. Open your email app to review and send it. Nothing has been submitted yet.';
      link?.focus();
    }, options);
'''
assert needle in s;s=s.replace(needle,block+needle);p.write_text(s,encoding='utf8')
