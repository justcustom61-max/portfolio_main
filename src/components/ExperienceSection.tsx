import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (timelineRef.current) {
        const beam = timelineRef.current.querySelector('.timeline-beam');
        if (beam) {
          gsap.fromTo(
            beam,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }

      if (nodeRef.current) {
        gsap.fromTo(
          nodeRef.current,
          { opacity: 0, x: -60, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: nodeRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-24 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-display font-bold text-center mb-20 gradient-text opacity-0"
        >
          Experience
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline beam */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div className="timeline-beam absolute inset-0 bg-gradient-to-b from-electric-blue via-purple-glow to-cyan-glow origin-top" />
            {/* Energy pulse */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-electric-blue rounded-full animate-pulse-glow" />
          </div>

          {/* Timeline node */}
          <div ref={nodeRef} className="relative pl-20 md:pl-0 md:flex md:items-center opacity-0">
            {/* Node marker */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-5 h-5">
              <div className="absolute inset-0 bg-electric-blue rounded-full animate-ping opacity-30" />
              <div className="relative w-full h-full bg-electric-blue rounded-full border-2 border-void glow-blue" />
            </div>

            {/* Content card */}
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <div className="glass rounded-xl p-6 md:p-8 inline-block text-left md:text-right">
                <div className="flex items-center gap-3 mb-3 md:justify-end">
                  <Briefcase className="w-5 h-5 text-electric-blue" />
                  <span className="text-electric-blue text-sm font-mono">2024 — Present</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                  Freelance Web Developer
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md">
                  Built responsive websites, landing pages, and modern digital experiences
                  while continuously improving development skills and design understanding.
                </p>
              </div>
            </div>

            {/* Empty space for other side */}
            <div className="hidden md:block md:w-1/2 md:pl-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
