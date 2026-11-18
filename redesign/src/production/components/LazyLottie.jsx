import { useEffect, useRef, useState } from 'react';

/** Locally hosted Lottie; loads only when visible and never runs offscreen. */
export default function LazyLottie({ src = '/animations/heart-medical.json', label = 'A gentle heartbeat', className = '' }) {
  const container = useRef(null);
  const player = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = container.current;
    if (!host) return undefined;
    let disposed = false;
    let visible = false;
    let loading = false;
    const abort = new AbortController();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setFailed(false);

    const sync = () => {
      if (!player.current) return;
      if (reduced.matches) player.current.goToAndStop(30, true);
      else if (visible && !document.hidden) player.current.play();
      else player.current.pause();
    };
    const load = async () => {
      if (loading || player.current) return;
      loading = true;
      try {
        const [module, response] = await Promise.all([
          import('lottie-web/build/player/lottie_light'), fetch(src, { signal: abort.signal }),
        ]);
        if (!response.ok) throw new Error(`Lottie asset returned ${response.status}`);
        const data = await response.json();
        if (disposed) return;
        const instance = module.default.loadAnimation({
          container: host, renderer: 'svg', loop: true, autoplay: false,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true },
        });
        player.current = instance;
        instance.setSpeed(0.45);
        instance.addEventListener('DOMLoaded', sync);
        sync();
      } catch (error) {
        if (!disposed && error.name !== 'AbortError') setFailed(true);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) load();
      sync();
    }, { threshold: 0.12 });
    observer.observe(host);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      abort.abort();
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      player.current?.destroy();
      player.current = null;
    };
  }, [src]);

  return <div className={`lazy-lottie ${className}`} role="img" aria-label={label}
    style={{ aspectRatio: '600 / 436', position: 'relative' }}>
    <div ref={container} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
    {failed && <svg viewBox="0 0 600 436" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <path d="M300 347C267 325 140 244 140 168C140 96 237 83 300 155C363 83 460 96 460 168C460 244 333 325 300 347Z" fill="none" stroke="#16a34a" strokeWidth="9" />
      <path d="M105 225H226L251 177L282 280L315 198L338 225H495" fill="none" stroke="#123b7c" strokeWidth="7" />
    </svg>}
  </div>;
}
