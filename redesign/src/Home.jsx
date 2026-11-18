import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heading } from './components/EditorialMotion';
import ClinicalArt from './components/ClinicalArt';
import testimonials from './data/testimonials.json';
import plans from './data/plans.json';
import { benefitText } from './data/benefitText';
import './home.css';

gsap.registerPlugin(ScrollTrigger);

const hospitals = [
  {
    name: 'Medicare Hospital',
    address: 'M.G. Tower, Kolar Road, Bhopal',
    logo: 'medicare',
    size: [360, 420],
  },
  {
    name: 'Care and Cure Hospital',
    address: 'Mandideep',
    logo: 'care-and-cure',
    size: [820, 167],
  },
];

const membershipSteps = [
  ['Choose your plan', 'Compare benefits, annual prices and who each plan covers.', 'choose'],
  ['Sign in to the portal', 'Use the mobile number you registered with.', 'activate'],
  ['Book your care', 'Check your available benefits and arrange a consultation or other covered service.', 'book'],
];
const entryPlan = plans.find(plan => plan.planCode === 'wellnessfirst');

const providers = ['1.svg', '2.svg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg', '9.png', '10.png', '11.png', '12.png', '13.svg', '14.png'];

function PartnerMarquee() {
  const root = useRef(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const animations = useRef([]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const tracks = root.current.querySelectorAll('.clinic-marquee-track');
      animations.current = [...tracks].map((track, index) => gsap.fromTo(track,
        { xPercent: index ? -50 : 0 },
        { xPercent: index ? 0 : -50, duration: 42, repeat: -1, ease: 'none', paused: true }
      ));
      const observer = new IntersectionObserver(([entry]) => {
        animations.current.forEach(animation => entry.isIntersecting && !pausedRef.current ? animation.play() : animation.pause());
      });
      observer.observe(root.current);
      return () => {
        observer.disconnect();
        animations.current.forEach(animation => animation.kill());
        animations.current = [];
      };
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    animations.current.forEach(animation => paused ? animation.pause() : animation.play());
  }, [paused]);

  return <div className="clinic-network" ref={root}>
    <div className="clinic-network-heading">
      <h3>Healthcare network</h3>
      <button type="button" className="clinic-marquee-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? 'Play logos' : 'Pause logos'}
      </button>
    </div>
    <div className="clinic-marquee-groups">
      {[providers.slice(0, 7), providers.slice(7)].map((group, index) => (
        <div className="clinic-marquee-row" key={index}>
          <div className="clinic-marquee-track">
            {[0, 1].map(copy => <div className="clinic-marquee-group" key={copy} aria-hidden="true" data-copy={copy}>
              {group.map(file => <img key={file} src={'/assets/images/partner_logo/' + file} alt="" width="108" height="42" loading="lazy" />)}
            </div>)}
          </div>
        </div>
      ))}
    </div>
  </div>;
}

function Icon({ type }) {
  const paths = {
    phone: 'M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z',
    test: 'm9 3 6 0m-5 0v7l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3M8 15h8',
    support: 'M4 14v-3a8 8 0 0 1 16 0v3M4 11H3v6h4v-6H4Zm16 0h1v6h-4v-6h3Zm0 6a4 4 0 0 1-4 4h-3',
    arrow: 'M4 12h15m-6-6 6 6-6 6',
    left: 'M20 12H5m6-6-6 6 6 6',
    upRight: 'M6 18 18 6M7 6h11v11',
    pin: 'M19 10c0 4.2-7 10-7 10s-7-5.8-7-10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z',
    check: 'm5 12 4 4L19 6',
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d={paths[type]} /></svg>;
}

export function HomeLink({ href, children }) {
  return <a href={href} className="clinic-link">
    <span>{children}</span><Icon type="arrow" />
  </a>;
}

function Hero() {
  return <section className="clinic-intro frame" aria-labelledby="clinic-home-title">
    <div className="clinic-hero">
      <div className="clinic-masthead">
        <h1 id="clinic-home-title">A year of outpatient care</h1>
        <p>Doctor consultations, health checkups and wellness support for you and your family.</p>
        <p className="clinic-hero-price">From <strong>{entryPlan.price}</strong> + GST / year</p>
        <div className="clinic-hero-actions"><HomeLink href="/plans">View plans</HomeLink><a className="clinic-hero-secondary" href="/services">See services</a></div>
      </div>
      <picture className="clinic-hero-art">
        <source media="(max-width: 680px)" srcSet="/clinic/consult-photo-760.webp" />
        <img src="/clinic/consult-photo.webp" width="1440" height="960" fetchPriority="high" decoding="async"
          alt="A doctor and patient during an outpatient appointment." />
      </picture>
    </div>
  </section>;
}

function HospitalPartners() {
  return <section className="clinic-frame clinic-section clinic-partners" aria-labelledby="clinic-partner-title">
    <div className="clinic-directory">
      <h2 id="clinic-partner-title">Our hospital partners</h2>
      <div className="clinic-hospital-grid">
      {hospitals.map(hospital => {
        const search = encodeURIComponent(hospital.name + ' ' + hospital.address);
        return <a className="clinic-hospital" key={hospital.logo}
          href={'https://www.google.com/maps/search/?api=1&query=' + search}>
          <span className={'clinic-hospital-logo ' + hospital.logo}><img src={'/nearby/' + hospital.logo + '.webp'} alt=""
            width={hospital.size[0]} height={hospital.size[1]} loading="lazy" decoding="async" /></span>
          <span className="clinic-hospital-info">
            <strong>{hospital.name}</strong>
            <span><Icon type="pin" />{hospital.address}</span>
          </span>
          <span className="clinic-forward"><Icon type="upRight" /></span>
        </a>;
      })}
      </div>
    </div>
    <PartnerMarquee />
  </section>;
}

function About() {
  return <section className="clinic-frame clinic-section clinic-about" id="about" aria-labelledby="clinic-about-title">
    <div className="clinic-about-copy">
      <h2 id="clinic-about-title">A simpler way to look after your health.</h2>
      <p>SehatFirstPro brings consultations, diagnostics and wellness support together in annual memberships for individuals and families.</p>
      <HomeLink href="/plans">See membership options</HomeLink>
    </div>
    <div className="clinic-about-picture">
      <img src="/clinic/visit.webp" alt="A doctor checking an older patient’s blood pressure." width="1440" height="600" loading="eager" decoding="async" />
      <ClinicalArt className="clinic-about-inset" name="family" />
    </div>
  </section>;
}

function CareIndex({ services }) {
  return <section className="clinic-frame clinic-section home-care" id="care" aria-labelledby="clinic-care-title">
      <div className="home-section-heading">
        <div><Heading id="clinic-care-title">Healthcare services</Heading><p>Care for your everyday health.</p></div>
        <HomeLink href="/services">See all services</HomeLink>
      </div>
        <ul className="home-care-grid">
          {services.map((service, index) => <li key={service.url}>
            <a href={service.url} className="home-care-card">
              <picture>
                <img src={'/medical/' + service.art + '.webp'}
                  srcSet={'/medical/' + service.art + '-phone.webp 520w, /medical/' + service.art + '.webp 900w'}
                  sizes={'(max-width: 680px) calc(100vw - 36px), (max-width: 1000px) 44vw, ' + ([0, 5, 6, 7].includes(index) ? '44vw' : '22vw')}
                  alt="" width="900" height="600" loading="lazy" decoding="async" />
              </picture>
              <div className="home-care-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
              <span className="home-care-arrow"><Icon type="upRight" /></span>
            </a>
          </li>)}
        </ul>
  </section>;
}

function WhyChoose() {
  const plan = entryPlan;
  return <section className="clinic-section home-reasons" aria-labelledby="clinic-why-title">
    <div className="clinic-frame home-reasons-inner">
      <div className="membership-note">
        <h2 id="clinic-why-title">Know what <span>{plan.price}</span> includes</h2>
        <p>{plan.name} is a one-year membership. {plan.eligibility} Price excludes GST.</p>
        <p>Family memberships and plans with health checkups are also available.</p>
        <HomeLink href={'/plans/' + plan.planCode}>View {plan.name}</HomeLink>
      </div>
      <table className="membership-allowances">
        <caption>{plan.name} annual benefits</caption>
        <thead><tr><th scope="col">Benefit</th><th scope="col">Included</th></tr></thead>
        <tbody>{plan.benefits.map(benefit => {
          const [, quantity, label] = benefitText(benefit).match(/^(\d+)\s+(.+)$/);
          const serviceLabel = quantity === '1' ? label.replace(/\bcheckups\b/, 'checkup') : label;
          return <tr key={benefit}><th scope="row">{serviceLabel.charAt(0).toUpperCase() + serviceLabel.slice(1)}</th><td>{quantity}</td></tr>;
        })}</tbody>
      </table>
      <p className="membership-help">Need help comparing plans? <a href="tel:+919425005087">Call +91 9425005087<Icon type="arrow" /></a></p>
    </div>
  </section>;
}

function Journey() {
  return <section className="clinic-frame clinic-section clinic-journey" aria-labelledby="clinic-journey-title">
    <div className="clinic-section-header">
      <h2 id="clinic-journey-title">From plan to appointment</h2>
      <HomeLink href="/plans">Compare plans</HomeLink>
    </div>
    <ol className="clinic-step-list" aria-label="Membership steps">
      {membershipSteps.map(([title, copy, art], index) =>
        <li key={art} className="clinic-step">
          <div className="clinic-step-image"><ClinicalArt name={art} /></div>
          <div className="clinic-step-copy">
            <span className="clinic-step-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </div>
        </li>)}
    </ol>
  </section>;
}

function MemberStories() {
  const [quote, setQuote] = useState(0);
  const testimonial = testimonials[quote];

  function changeQuote(direction) {
    setQuote(current => (current + direction + testimonials.length) % testimonials.length);
  }

  return <section className="clinic-frame clinic-section clinic-stories" aria-labelledby="clinic-quote-title">
    <div className="clinic-stories-copy">
      <h2 id="clinic-quote-title">What our members say</h2>
      <div className="clinic-quote-controls" role="group" aria-label="Browse member stories">
        <button type="button" aria-label="Previous testimonial" onClick={() => changeQuote(-1)}><Icon type="left" /></button>
        <button type="button" aria-label="Next testimonial" onClick={() => changeQuote(1)}><Icon type="arrow" /></button>
      </div>
    </div>
    <div className="clinic-quote-body" aria-live="polite" aria-atomic="true">
      <figure key={testimonial.id}>
        <blockquote>“{testimonial.review.trim()}”</blockquote>
        <figcaption>{testimonial.name}</figcaption>
      </figure>
    </div>
  </section>;
}

export default function Home({ services }) {
  return <div className="clinic-home">
    <Hero />
    <HospitalPartners />
    <CareIndex services={services} />
    <About />
    <WhyChoose />
    <Journey />
    <MemberStories />
  </div>;
}
