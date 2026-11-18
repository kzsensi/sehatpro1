import { useState } from 'react';
import ClinicalArt from './components/ClinicalArt';
import { Heading } from './components/EditorialMotion';
import { HomeLink } from './Home';
import plans from './data/plans.json';
import { benefitText } from './data/benefitText';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermofUse from './pages/TermofUse';
import Cancellation from './pages/Cancellation';
import ShippingDelivery from './pages/ShippingDelivery';

const customerPortal = 'http://localhost:4173/app/';
const purchaseUrl = 'http://localhost:4173/plans';
const legalPages = [
  ['Terms & conditions', '/term-of-use', TermofUse],
  ['Privacy policy', '/privacy-policy', PrivacyPolicy],
  ['Cancellation policy', '/cancellation-policy', Cancellation],
  ['Shipping & delivery', '/shipping-delivery-policy', ShippingDelivery],
];
const money = plan => '₹' + Number(plan.price.replace(/[^\d]/g, '')).toLocaleString('en-IN');
const group = plan => plan.planCode === 'wellnessgoldencare' ? 'Senior' : plan.coverage.startsWith('Family') ? 'Family' : 'Individual';

function Arrow() {
  return <svg className="arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}
function TextLink({ href, children }) {
  return <a className="text-link" href={href}>{children}<Arrow /></a>;
}
function PageHead({ title, description, art, back, tone = 'blue' }) {
  return <section className={'frame page-head with-art page-tone-' + tone}>
    <div className="page-copy">
      {back && <a className="back-link" href={back[1]}>← {back[0]}</a>}
      <h1>{title}</h1><p>{description}</p>
    </div>
    <ClinicalArt className="page-art" name={art} eager />
  </section>;
}
function MembershipFeature() {
  return <section className="frame section membership">
    <div className="membership-copy"><Heading>Care for one.<br />Or the whole family.</Heading>
      <p>Compare annual plans for individuals, families and people over 60.</p>
      <HomeLink href="/plans">Compare plans</HomeLink>
    </div><div className="membership-art"><ClinicalArt name="family" /></div>
  </section>;
}
function SupportPanel({ title = 'Questions about your plan?' }) {
  return <aside className="support-panel"><ClinicalArt name="support" className="support-art" />
    <div><h2>{title}</h2><p>We can help you compare benefits and eligibility.</p><TextLink href="/contact">Contact support</TextLink></div>
  </aside>;
}
function Services({ services }) {
  return <>
    <PageHead title="Everyday healthcare services." description="Consult a doctor, book tests or find wellness support. Availability depends on your plan." art="clinic" />
    <section className="frame section service-grid" aria-label="Healthcare services">
      {services.map(service => <a className="service-card" href={service.url} key={service.url}>
        <div className="service-art"><ClinicalArt name={service.art} /></div>
        <div className="service-copy"><h2>{service.title}</h2><span className="service-arrow"><Arrow /></span><p>{service.description}</p></div>
      </a>)}
    </section>
    <section className="frame section journey"><Heading>Using your membership.</Heading><ol>
      {[['choose', 'Choose a plan', 'Compare benefits, prices and who each plan covers.'], ['activate', 'Sign in', 'Use your registered mobile number in the customer portal.'], ['book', 'Arrange your care', 'See what you can book with your membership.']].map(([art, title, text], i) =>
        <li key={art}><ClinicalArt className="journey-thumbnail" name={art} /><div><h3>{i + 1}. {title}</h3><p>{text}</p></div></li>)}
    </ol></section><MembershipFeature />
  </>;
}
function ServiceDetail({ service }) {
  return <><PageHead title={service.title} description={service.description} art={service.art} back={['All services', '/services']} />
    <section className="frame section detail-steps"><div><Heading>Find this service in your plan.</Heading>
      <p>{service.availability}</p><p>Existing members can sign in to view their benefits and available booking options.</p>
      <div className="hero-actions"><HomeLink href="/plans">Compare plans</HomeLink><TextLink href={customerPortal}>Customer login</TextLink></div>
    </div><SupportPanel title="Need help with a booking?" /></section><MembershipFeature />
  </>;
}
function PlanPrice({ plan }) {
  return <p className="plan-price"><strong>{money(plan)}</strong><span>+ GST / year</span></p>;
}
function PlanCard({ plan }) {
  return <article className={'plan-card plan-category-' + group(plan).toLowerCase()}>
    <div className="plan-identity"><p className="plan-coverage">{plan.coverage}</p><h2>{plan.name}</h2><PlanPrice plan={plan} /><p>{plan.eligibility}</p></div>
    <ul className="checks">{plan.benefits.slice(0, 4).map(benefit => <li key={benefit}>{benefitText(benefit)}</li>)}</ul>
    <div className="plan-card-links"><HomeLink href={'/plans/' + plan.planCode}>View full plan<span className="sr-only"> — {plan.name}</span></HomeLink>
      <span className="more-benefits">+ {plan.benefits.length - 4} more benefits</span></div>
  </article>;
}
function FAQ() {
  const questions = [
    ['What is an OPD plan?', 'An OPD plan covers specified outpatient services, such as consultations and health checks. Each plan lists its own benefits and limits.'],
    ['Can I include my family?', 'Wellness Elite and Wellness Platinum cover two adults and two children. Check each plan’s eligibility before you choose.'],
    ['How do I book a service?', 'Sign in to the customer portal with your registered phone number to see your benefits and available services.'],
    ['Where can I read the cancellation policy?', <>Read our <a href="/cancellation-policy">cancellation policy</a> for the free-look period, eligibility and refund process.</>],
  ];
  return <div className="faq"><Heading>Questions about memberships.</Heading><div className="faq-rows">{questions.map(([question, answer]) =>
    <details key={question}><summary>{question}<span className="faq-symbol" aria-hidden="true" /></summary><p>{answer}</p></details>)}
  </div></div>;
}
function Plans() {
  const [filter, setFilter] = useState('All plans');
  const visible = plans.filter(plan => filter === 'All plans' || group(plan) === filter);
  return <><PageHead title="Find your plan." description="Compare one-year memberships for individuals, families and people over 60. Prices exclude GST." art="family" tone="mint" />
    <section className="frame section plans-section"><div className="plans-toolbar">
      <div className="filters" role="group" aria-label="Filter membership plans">{['All plans', 'Individual', 'Family', 'Senior'].map(item =>
        <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}>{item === 'Senior' ? 'Above 60' : item}</button>)}
      </div><span className="plan-count" role="status">{visible.length} {visible.length === 1 ? 'plan' : 'plans'}</span>
    </div><div className="plan-grid">{visible.map(plan => <PlanCard key={plan.id} plan={plan} />)}</div>
      <div className="plan-extras"><SupportPanel /><FAQ /></div>
    </section></>;
}
function BenefitList({ title, items }) {
  return <section className="benefits-section"><h2>{title}</h2><ul className="checks">{items.map(item => <li key={item}>{benefitText(item)}</li>)}</ul></section>;
}
function PlanDetail({ plan }) {
  const type = group(plan);
  return <><PageHead title={plan.name} description={plan.coverage + ' · ' + plan.eligibility} art={type === 'Family' ? 'family' : type === 'Senior' ? 'senior' : 'individual'} tone={type === 'Family' ? 'mint' : 'blue'} back={['All plans', '/plans']} />
    <section className="frame section detail-plan">
      <aside className="plan-summary"><h2>Annual membership</h2><PlanPrice plan={plan} /><p>{plan.coverage}<br />{plan.eligibility}</p>
        <HomeLink href={purchaseUrl}>Continue to purchase</HomeLink><TextLink href="/contact">Ask about this plan</TextLink><a href="/term-of-use">Terms & conditions</a>
      </aside>
      <div className="benefit-groups"><BenefitList title="What’s included" items={plan.benefits} />
        <BenefitList title="Additional benefits" items={plan.value_added_features} /><BenefitList title="Platform benefits" items={plan.platform_benefits} />
      </div>
    </section></>;
}
function Contact() {
  const [message, setMessage] = useState('');
  return <><PageHead title="How can we help?" description="Talk to us about your plan, membership or booking." art="support" tone="peach" />
    <section className="frame section contact-grid"><div className="contact-info"><Heading>Speak to our team.</Heading>
      <div className="contact-item"><a href="tel:+919425005087">+91 9425005087</a><p>Monday–Saturday, 9 AM–6 PM IST</p></div>
      <div className="contact-item"><a href="mailto:support@sehatfirstpro.com">support@sehatfirstpro.com</a><p>Response within 72 business hours</p></div>
      <address>E-3/112, S-05, Sharda Complex, R.S. Nagar, Arera Colony, Bhopal, Madhya Pradesh 462039</address>
    </div>
    <form onSubmit={event => { event.preventDefault(); setMessage('Your enquiry is ready to review. This local preview does not send messages. Please call or email our team.'); }}>
      <h2>Preview an enquiry</h2><p>Use email or phone to reach our team.</p><div className="form-grid">
        {[['name', 'Full name', 'text', 'name'], ['email', 'Email address', 'email', 'email'], ['phone', 'Phone number', 'tel', 'tel'], ['subject', 'Subject', 'text', 'off']].map(([name, label, type, autoComplete]) =>
          <label key={name}>{label}<input name={name} type={type} autoComplete={autoComplete} required /></label>)}
      </div><label>Message<textarea name="message" rows="5" required /></label><button className="button" type="submit">Review enquiry<Arrow /></button>
      {message && <p className="form-status" role="status">{message}</p>}
    </form></section></>;
}
function PolicyPage({ path, Component }) {
  return <div className="frame legal-layout"><aside className="legal-sidebar"><nav aria-label="Policies">{legalPages.map(([title, href]) =>
    <a href={href} key={href} aria-current={path === href ? 'page' : undefined}>{title}</a>)}
  </nav></aside><div className="legal-page"><Component /></div></div>;
}
export function resolvePage(path, services) {
  if (path === '/services') return { page: <Services services={services} />, title: 'Healthcare services' };
  if (path === '/plans') return { page: <Plans />, title: 'Membership plans' };
  if (path === '/contact') return { page: <Contact />, title: 'Contact us' };
  const service = services.find(item => item.url === path);
  if (service) return { page: <ServiceDetail service={service} />, title: service.title };
  const plan = plans.find(item => '/plans/' + item.planCode === path);
  if (plan) return { page: <PlanDetail plan={plan} />, title: plan.name };
  const legal = legalPages.find(item => item[1] === path);
  if (legal) return { page: <PolicyPage path={path} Component={legal[2]} />, title: legal[0] };
  return { title: 'Page not found', page: <><PageHead title="Let’s get you back to care." description="Explore our plans and services, or contact our team." art="booklet" /><div className="frame error-actions"><HomeLink href="/">Back to home</HomeLink><TextLink href="/contact">Contact us</TextLink></div></> };
}
