import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  stagger?: number;
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  stagger = 0.03,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll('.split-char, .split-word, .split-line');

    // Set initial state
    gsap.set(elements, from);

    // Animate in
    gsap.to(elements, {
      ...to,
      duration,
      ease,
      stagger,
      delay: delay / 1000,
    });
  }, [text, delay, duration, ease, from, to, stagger]);

  const renderSplitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="split-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="split-word inline-block mr-2">
          {word}
        </span>
      ));
    } else {
      return text.split('\n').map((line, i) => (
        <div key={i} className="split-line">
          {line}
        </div>
      ));
    }
  };

  return (
    <div ref={containerRef} className={className}>
      {renderSplitText()}
    </div>
  );
}
