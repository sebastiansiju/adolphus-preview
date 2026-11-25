export function EmployerEnquiry() {
  return <section className="employer-enquiry content-section" aria-labelledby="staffing-brief-title">
    <div><h2 id="staffing-brief-title">Tell us about your service</h2><p>One appointment or a larger team: share the roles, location and timing so we can discuss your requirements.</p><p>Looking for work? <a className="inline-link" href="/candidates#role-enquiry">Send a candidate enquiry</a></p></div>
    <form id="staffing-enquiry"><div className="form-grid">
      <label>Your name<input name="name" autoComplete="name" maxLength={100} required/></label>
      <label>Work email<input name="email" type="email" autoComplete="email" maxLength={150} required/></label>
      <label>Company or venue<input name="venue" autoComplete="organization" maxLength={150} required/></label>
      <label>Venue location<input name="location" maxLength={150} required/></label>
      <label>Roles required<input name="roles" placeholder="For example, chefs and waiting staff" maxLength={200} required/></label>
      <label>Number of staff<input name="headcount" type="number" min="1" max="10000" inputMode="numeric" required/></label>
      <label>Dates and service times<input name="dates" placeholder="Include setup and finish times" maxLength={200} required/></label>
      <label>Type of support<select name="arrangement" defaultValue="Temporary or event team"><option>Temporary or event team</option><option>Permanent appointment</option><option>Interim cover</option><option>Help me decide</option></select></label>
    </div><label>Service requirements<textarea name="requirements" rows={4} maxLength={1500} placeholder="Guest numbers, service style, experience and induction requirements"/></label>
    <p className="form-help">This prepares an email for you to review and send. No details are submitted or stored by this website.</p>
    <button className="button" type="submit">Prepare staffing enquiry</button><p id="staffing-status" role="status" aria-live="polite"/><div id="staffing-result" hidden><a id="staffing-email" className="button" href="mailto:info@adolphusgroup.com">Open email draft</a></div></form>
  </section>;
}
