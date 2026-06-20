import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Layers, Monitor, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

function ProjectCard({ title, description, icon, color, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 100, rotateX: -20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  const colorMap: Record<string, { border: string; glow: string; text: string }> = {
    blue: { border: 'border-electric-blue/20', glow: 'hover:shadow-[0_0_40px_rgba(0,212,255,0.2)]', text: 'text-electric-blue' },
    purple: { border: 'border-purple-glow/20', glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]', text: 'text-purple-glow' },
    cyan: { border: 'border-cyan-glow/20', glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]', text: 'text-cyan-glow' },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 opacity-0`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative glass rounded-2xl overflow-hidden transition-all duration-500 preserve-3d ${colors.border} ${colors.glow} ${
          isHovered ? 'scale-[1.02] translate-z-8' : ''
        }`}
        style={{
          transform: isHovered ? 'perspective(1000px) rotateX(2deg) rotateY(2deg)' : 'none',
        }}
      >
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${color === 'blue' ? '#00d4ff' : color === 'purple' ? '#a855f7' : '#06b6d4'}, transparent 50%)`,
          }}
        />

        {/* Screen frame effect */}
        <div className="relative p-1">
          <div className="bg-void/80 rounded-xl p-6 md:p-8 min-h-[280px] flex flex-col">
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 h-4 bg-white/5 rounded-md mx-2" />
              <ExternalLink className={`w-4 h-4 ${colors.text} opacity-50`} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className={`mb-4 ${colors.text}`}>{icon}</div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3">
                  {title}
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Holographic overlay */}
              <div
                className={`mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-sm ${colors.text} transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Interactive Preview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')}`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const projects = [
  {
    title: 'Modern Business Website',
    description: 'Responsive business website with modern UI and animations.',
    icon: <Monitor className="w-10 h-10" />,
    color: 'blue',
  },
  {
    title: 'Personal Portfolio',
    description: 'Interactive portfolio with 3D effects and smooth animations.',
    icon: <Layers className="w-10 h-10" />,
    color: 'purple',
  },
  {
    title: 'Creative Web Application',
    description: 'Modern web application built with clean design and engaging user experience.',
    icon: <Sparkles className="w-10 h-10" />,
    color: 'cyan',
  },
];

export default function ProjectsSection() {
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
      id="projects"
      className="relative min-h-screen py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-display font-bold text-center mb-16 gradient-text opacity-0"
        >
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
