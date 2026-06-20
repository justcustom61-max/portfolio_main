import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Palette,
  Braces,
  Smartphone,
  GitBranch,
  Atom,
  Lightbulb,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardProps {
  skill: string;
  icon: React.ReactNode;
  description?: string;
  isSpecial?: boolean;
  index: number;
}

function SkillCard({ skill, icon, description, isSpecial, index }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 80, rotateX: -30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 opacity-0 ${isSpecial ? 'col-span-2 row-span-2' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative glass rounded-xl p-6 md:p-8 transition-all duration-300 preserve-3d ${
          isSpecial ? 'min-h-[280px] md:min-h-[320px]' : 'min-h-[160px]'
        } ${isHovered ? 'glow-blue' : ''}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateZ(30px)' : 'translateZ(0)'}`,
          borderColor: isSpecial
            ? 'rgba(168, 85, 247, 0.4)'
            : isHovered
            ? 'rgba(0, 212, 255, 0.4)'
            : 'rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Inner glow */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
            isHovered || isSpecial ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: isSpecial
              ? 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)'
              : 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.08), transparent 70%)',
          }}
        />

        <div className="relative z-10">
          <div
            className={`mb-4 ${isSpecial ? 'text-purple-glow' : 'text-electric-blue'}`}
          >
            {icon}
          </div>

          <h3
            className={`font-display font-bold mb-2 ${
              isSpecial ? 'text-3xl md:text-4xl text-purple-glow' : 'text-xl text-white'
            }`}
          >
            {skill}
          </h3>

          {description && (
            <p className="text-white/50 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          )}

          {isSpecial && (
            <div className="mt-6 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-6 bg-purple-glow/40 rounded-full animate-wave"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Energy arcs for special card */}
        {isSpecial && (
          <>
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-purple-glow/60 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-purple-glow/60 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-glow/60 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple-glow/60 rounded-br-lg" />
          </>
        )}
      </div>
    </div>
  );
}

const skills = [
  { skill: 'HTML', icon: <Code2 className="w-8 h-8" />, description: 'Semantic markup & structure' },
  { skill: 'CSS', icon: <Palette className="w-8 h-8" />, description: 'Styling & animations' },
  { skill: 'JavaScript', icon: <Braces className="w-8 h-8" />, description: 'Interactive logic & DOM' },
  { skill: 'Responsive Design', icon: <Smartphone className="w-8 h-8" />, description: 'Mobile-first layouts' },
  { skill: 'Git & GitHub', icon: <GitBranch className="w-8 h-8" />, description: 'Version control & collaboration' },
  { skill: 'Basic React', icon: <Atom className="w-8 h-8" />, description: 'Component-based UI' },
  { skill: 'Problem Solving', icon: <Lightbulb className="w-8 h-8" />, description: 'Debugging & optimization' },
];

export default function SkillsSection() {
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
      id="skills"
      className="relative min-h-screen py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-display font-bold text-center mb-16 gradient-text opacity-0"
        >
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skills.map((s, i) => (
            <SkillCard key={s.skill} {...s} index={i} />
          ))}
          <SkillCard
            skill="VIBE CODER"
            icon={<Zap className="w-12 h-12" />}
            description="Turning ideas into reality using creativity, experimentation, and modern development tools."
            isSpecial
            index={skills.length}
          />
        </div>
      </div>
    </section>
  );
}
