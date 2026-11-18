import { useEffect, useRef, useState } from 'react';
import { Cursor } from './components/Motion';
import services from './data/services.json';
import Home, { HomeLink } from './Home';

const path = window.location.pathname.replace(/\/$/, '') || '/';
const policies = [
  ['Terms & conditions', '/term-of-use'],
  ['Privacy policy', '/privacy-policy'],
  ['Cancellation policy', '/cancellation-policy'],
  ['Shipping & delivery', '/shipping-delivery-policy'],
];
const navigation = [['Home', '/'], ['Services', '/services'], ['Plans', '/plans'], ['Contact', '/contact']];
const carePortalUrl = import.meta.env.VITE_CARE_PORTAL_URL || 'https://portal.mdoc.samvargsolutions.com/login';
const salesPortalUrl = import.meta.env.VITE_SALES_PORTAL_URL || 'https://broker.mdoc.samvargsolutions.com/login';
const localCarePortal = 'http://localhost:4173/app/';
const localSalesPortal = 'http://localhost:4174/';
const phone = '+91 9425005087';
const phoneUrl = 'tel:+919425005087';
const email = 'support@sehatfirstpro.com';
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
function Arrow({ direction = 'right' }) {
  const line = direction === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6';
  return <svg aria-hidden="true" className="arrow" viewBox="0 0 24 24" width="18" height="18" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={line} /></svg>;
}

function Wordmark() {
  return <a className="wordmark" href="/" aria-label="SehatFirstPro home">
    <img src="/assets/images/sehatlogo.png" width="500" height="173" alt="" />
  </a>;
}

function Header() {
  const [menu, setMenu] = useState(false);
  const [popup, setPopup] = useState('');
  const ref = useRef(null);
  const menuButton = useRef(null);
  const policyButton = useRef(null);
  const loginButton = useRef(null);

  useEffect(() => {
    const outside = event => {
      if (ref.current.contains(event.target)) return;
      setPopup('');
      setMenu(false);
    };
    const escape = event => {
      if (event.key !== 'Escape') return;
      if (popup) {
        setPopup('');
        (popup === 'login' ? loginButton : policyButton).current.focus();
      } else if (menu) {
        setMenu(false);
        menuButton.current.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [menu, popup]);

  function togglePopup(key) {
    setPopup(popup === key ? '' : key);
    if (key === 'login') setMenu(false);
  }

  function toggleMenu(event) {
    setMenu(!menu);
    setPopup('');
    if (!menu && event.detail === 0) {
      requestAnimationFrame(() => ref.current.querySelector('.main-nav > a')?.focus());
    }
  }

  return <header className="site-header" ref={ref}>
    <div className="frame nav-row">
      <Wordmark />
      <nav className={menu ? 'main-nav is-open' : 'main-nav'} id="main-nav" aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <a key={href} href={href} aria-current={path === href ? 'page' : undefined}
            data-section-active={path.startsWith(href + '/') || undefined}>{label}</a>
        ))}
        <div className="nav-disclosure">
          <button type="button" ref={policyButton} onClick={() => togglePopup('policies')} aria-expanded={popup === 'policies'} aria-controls="policy-menu">
            Policies <span aria-hidden="true" className="chevron" />
          </button>
          <div className="nav-popover" id="policy-menu" inert={popup !== 'policies'} data-open={popup === 'policies'}>
            {policies.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </div>
        </div>
      </nav>
      <div className="nav-end">
        <div className="nav-disclosure login">
          <button type="button" ref={loginButton} aria-expanded={popup === 'login'} aria-controls="portal-login-menu" onClick={() => togglePopup('login')}>
            Login <span aria-hidden="true" className="chevron" />
          </button>
          <div className="nav-popover" id="portal-login-menu" inert={popup !== 'login'} data-open={popup === 'login'}>
            <a href={carePortalUrl}>Customer login <Arrow /></a>
            <a href={salesPortalUrl}>Agent login <Arrow /></a>
          </div>
        </div>
        <button type="button" className="mobile-toggle" ref={menuButton} aria-expanded={menu} aria-controls="main-nav"
          aria-label={menu ? 'Close navigation' : 'Open navigation'}
          onClick={toggleMenu}>
          <span aria-hidden="true" /><span aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>;
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
    <Header />
    <main id="main" tabIndex={-1}><Home services={servicePages} /></main>
    <Footer home />
  </div>;
}
