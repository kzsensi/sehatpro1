const naturalHeights = {
  choose: 375, activate: 375, book: 375, support: 375,
  vitals: 503, video: 503, chat: 503, naturopathy: 503,
};

export default function ClinicalArt({ name, className, alt = '', eager = false }) {
  return <img className={['clinical-art', className].filter(Boolean).join(' ')} src={'/clinic/' + name + '.webp'} alt={alt}
    width={758} height={naturalHeights[name] ?? 566} loading="eager" decoding="async" />;
}
