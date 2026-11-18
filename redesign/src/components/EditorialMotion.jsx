import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const motion = { reveal: 0.34, stagger: 0.036, easing: 'power3.out', travel: 12, drift: 14 };
const animated = '(prefers-reduced-motion: no-preference)';

export function Heading({ children, ...props }) {
  const heading = useRef(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 850px) and ' + animated, () => {
      const node = heading.current;
      if (node.getBoundingClientRect().top < window.innerHeight) return undefined;
      const split = SplitText.create(node, {
        type: 'words',
        onSplit(self) {
          return gsap.from(self.words, {
            y: motion.travel, opacity: 0, duration: motion.reveal, stagger: motion.stagger, ease: motion.easing,
            scrollTrigger: { trigger: node, start: 'top 92%', once: true },
          });
        },
      });
      return () => split.revert();
    });
    return () => media.revert();
  }, []);

  return <h2 ref={heading} {...props}>{children}</h2>;
}

export function ScrollArt({ children, className }) {
  const frame = useRef(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 760px) and ' + animated, () => {
      gsap.fromTo(frame.current.firstElementChild, { y: -motion.drift }, {
        y: motion.drift, ease: 'none',
        scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => media.revert();
  }, []);

  return <div className={className} ref={frame}>{children}</div>;
}
