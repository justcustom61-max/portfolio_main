import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Code2, Clock, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatWidgetProps {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

function StatWidget({ label, value, suffix = '', icon, color, index }: StatWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const colorClasses: Record<string, { border: string; text: string; bg: string; ring: string }> = {
    blue: {
      border: 'border-electric-blue/20',
      text: 'text-electric-blue',
      bg: 'bg-electric-blue/10',
      ring: 'border-electric-blue/30',
    },
    purple: {
      border: 'border-purple-glow/20',
      text: 'text-purple-glow',
      bg: 'bg-purple-glow/10',
      ring: 'border-purple-glow/30',
    },
    cyan: {
      border: 'border-cyan-glow/20',
      text: 'text-cyan-glow',
      bg: 'bg-cyan-glow/10',
      ring: 'border-cyan-glow/30',
    },
    pink: {
      border: 'border-neon-pink/20',
      text: 'text-neon-pink',
      bg: 'bg-neon-pink/10',
      ring: 'border-neon-pink/30',
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;

  useEffect(() => {
    if (!widgetRef.current) return;

    gsap.fromTo(
      widgetRef.current,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: widgetRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            if (!hasAnimated) {
              setHasAnimated(true);
              let start = 0;
              const duration = 2000;
              const startTime = performance.now();

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                start = Math.floor(eased * value);
                setDisplayValue(start);
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              requestAnimationFrame(animate);
            }
          },
        },
      }
    );
  }, [index, value, hasAnimated]);

  return (
    <div ref={widgetRef} className="relative opacity-0">
      <div
        className={`glass rounded-2xl p-6 md:p-8 ${colors.border} relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
      >
        {/* Rotating outer ring */}
        <div
          className={`absolute inset-2 rounded-xl border ${colors.ring} opacity-30 animate-spin-slow`}
          style={{ animationDuration: `${15 + index * 5}s` }}
        />

        {/* Inner glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${colors.bg} blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 ${colors.text}`}>
            {icon}
          </div>

          {/* Value */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className={`text-4xl md:text-5xl font-display font-bold ${colors.text}`}>
              {displayValue}
            </span>
            {suffix && (
              <span className={`text-lg font-display font-medium ${colors.text} opacity-60`}>
                {suffix}
              </span>
            )}
          </div>

          {/* Label */}
          <p className="text-white/50 text-sm font-medium tracking-wide uppercase">
            {label}
          </p>

          {/* Mini bar */}
          <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${colors.bg.replace('/10', '/40')}`}
              style={{ width: `${Math.min((displayValue / value) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { label: 'Creative Ideas', value: 150, suffix: '+', icon: <Lightbulb className="w-6 h-6" />, color: 'blue' },
  { label: 'Projects Built', value: 3, suffix: '', icon: <Code2 className="w-6 h-6" />, color: 'purple' },
  { label: 'Hours Learning', value: 500, suffix: '+', icon: <Clock className="w-6 h-6" />, color: 'cyan' },
  { label: 'Coffee Consumed', value: 500, suffix: '+', icon: <Coffee className="w-6 h-6" />, color: 'pink' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative min-h-screen py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 gradient-text opacity-0"
        >
          Inside My Digital World
        </h2>
        <p className="text-white/30 text-center mb-16 text-sm tracking-widest uppercase">
          Real-time Diagnostics
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatWidget key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* HUD decorative elements */}
        <div className="mt-16 flex justify-center gap-8 opacity-20">
          <div className="flex items-center gap-2 text-xs font-mono text-electric-blue">
            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
            <span>SYS.ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-glow">
            <div className="w-2 h-2 bg-purple-glow rounded-full animate-pulse" />
            <span>CREATIVE_MODE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-glow">
            <div className="w-2 h-2 bg-cyan-glow rounded-full animate-pulse" />
            <span>VIBE_CODING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
