import ClinicalArt from '../components/ClinicalArt';

export default function PolicyDocument({ id, title, sections, children }) {
  return <article id={id} aria-labelledby={id + '-title'}>
    <div className="policy-header">
      <h1 id={id + '-title'}>{title}</h1>
      <ClinicalArt className="policy-art" name="booklet" eager />
    </div>
    {sections.map((section, index) => <section key={index + '-' + section.title} className="policy-section">
      <h2>{section.title}</h2>
      {section.tag && <div className="policy-tag">{section.tag}</div>}
      {section.desc && <p>{section.desc}</p>}
      {section.intro && <p>{section.intro}</p>}
      {section.items && <ul>{section.items.map((item, index) => <li key={index}>{item}</li>)}</ul>}
    </section>)}
    {children && <aside className="policy-note">{children}</aside>}
  </article>;
}
