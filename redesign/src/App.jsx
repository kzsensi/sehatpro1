import { useEffect } from 'react';
import SiteHeader from './components/SiteHeader';
import { Cursor } from './components/Motion';
import services from './data/services.json';
import Home, { HomeLink } from './Home';

const policies = [
  ['Terms & conditions', '/term-of-use'],
  ['Privacy policy', '/privacy-policy'],
  ['Cancellation policy', '/cancellation-policy'],
  ['Shipping & delivery', '/shipping-delivery-policy'],
];
const localCarePortal = 'http://localhost:4173/app/';
const localSalesPortal = 'http://localhost:4174/';
const phone = '+91 9425005087';
const phoneUrl = 'tel:+919425005087';
const email = 'support@sehatfirst.in';
const address = 'E-3/112, S-05, Sharda Complex, R.S. Nagar, Arera Colony, Bhopal, Madhya Pradesh 462039';

const serviceScenes = [
  ['tele', 'Teleconsultation', 'Speak with a doctor by phone.', 'Look for general physician or specialist teleconsultations in your plan.'],
  ['diagnostics', 'Diagnostics', 'Arrange a health checkup or lab test.', 'See your plan for included checkups and discounts on diagnostic tests.'],
  ['clinic', 'In-clinic consultation', 'See a doctor or specialist in person.', 'Check your plan for in-person consultations and available providers.'],
  ['mental', 'Mental wellness', 'Speak with a mental health professional.', 'See how many emotional wellness consultations your plan includes.'],
  ['vitals', 'Vitals via face scan', 'Check available vitals with a face scan.', 'Sign in to see whether your membership includes this feature.'],
  ['video', 'Video consultation', 'See a doctor over a video call.', 'Check the number of general physician video consultations included in your plan.'],
  ['chat', 'Chat with experts', 'Ask a healthcare professional a question.', 'Sign in to see the chat options available to you.'],
  ['naturopathy', 'Naturopathy', 'Explore naturopathy and wellness support.', 'Contact us to check availability and whether your plan covers this service.'],
];
const servicePages = services.map((service, index) => {
  const [art, title, description, availability] = serviceScenes[index];
  return {
    art, title, description, availability,
    url: '/services/' + service.title.toLowerCase().replaceAll(' ', '-'),
  };
});
function Wordmark() {
  return <a className="wordmark" href="/" aria-label="SehatFirstPro home">
    <img src="/assets/images/sehatlogo.png" width="500" height="173" alt="" />
  </a>;
}

function Footer({ home = false }) {
  return <footer className="site-footer">
    <div className="frame">
      {home && <div className="footer-signpost">
        <h2>Find a plan that fits.</h2>
        <HomeLink href="/plans">Compare plans</HomeLink>
      </div>}
      <div className="footer-main">
        <div className="footer-brand">
          <Wordmark />
          <p>Outpatient care and wellness memberships.</p>
          <a href={phoneUrl}>{phone}</a>
          <a href={'mailto:' + email}>{email}</a>
          <address className="footer-address">{address}</address>
        </div>
        <div>
          <h2>Explore</h2>
          <a href="/services">Our services</a><a href="/plans">Membership plans</a><a href="/contact">Contact us</a>
        </div>
        <div className="footer-member">
          <h2>Member access</h2>
          <a href={localCarePortal}>Customer login</a><a href={localSalesPortal}>Leader / agent login</a>
        </div>
        <div className="footer-policies">
          <h2>Policies</h2>
          {policies.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© SehatFirstPro 2026</span>
        <span>In association with Arogya Pulse (OPC) Private Limited</span>
      </div>
    </div>
  </footer>;
}

export default function App() {
  useEffect(() => { document.title = 'OPD & wellness memberships | SehatFirstPro'; }, []);

  return <div className="site-shell site-shell--home">
    <Cursor />
    <a href="#main" className="skip">Skip to content</a>
    <SiteHeader />
    <main id="main" tabIndex={-1}><Home services={servicePages} /></main>
    <Footer home />
  </div>;
}
