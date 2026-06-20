import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (textRef.current) {
        const lines = textRef.current.querySelectorAll('.reveal-line');
        gsap.fromTo(
          lines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bioLines = [
    'I am Divyam Jain, a passionate Web Developer who loves creating',
    'modern and interactive digital experiences. I enjoy transforming',
    'ideas into beautiful websites while constantly learning new',
    'technologies and pushing creativity through code.',
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 px-4"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div
          ref={panelRef}
          className="relative glass-strong rounded-2xl p-8 md:p-12 overflow-hidden opacity-0"
        >
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-electric-blue/50" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-electric-blue/50" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-electric-blue/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-electric-blue/50" />

          {/* Scan line */}
          <div
            ref={scanLineRef}
            className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-blue/60 to-transparent animate-scan-line pointer-events-none"
          />

          {/* Holographic border glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-blue/5 via-transparent to-purple-glow/5 pointer-events-none" />

          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-display font-bold mb-8 gradient-text opacity-0"
          >
            About Me
          </h2>

          <div ref={textRef} className="space-y-3">
            {bioLines.map((line, i) => (
              <p
                key={i}
                className="reveal-line text-lg md:text-xl text-white/70 leading-relaxed opacity-0"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Terminal prompt */}
          <div className="mt-8 flex items-center gap-2 text-electric-blue/60 font-mono text-sm">
            <span className="text-electric-blue">{'>'}</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </section>
  );
}
