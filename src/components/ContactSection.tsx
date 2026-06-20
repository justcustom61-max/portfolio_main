import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-24 px-4 flex items-center justify-center"
    >
      <div className="max-w-3xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-display font-bold text-center mb-4 gradient-text opacity-0"
        >
          Let's Build Something Amazing
        </h2>
        <p className="text-white/30 text-center mb-12 text-sm tracking-widest uppercase">
          Open Transmission Channel
        </p>

      <form
  ref={formRef}
  action="https://formsubmit.co/djain4642@gmail.com"
  method="POST"
  className="relative glass-strong rounded-2xl p-8 md:p-12 opacity-0"
>
        <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
<input type="hidden" name="_captcha" value="false" />
<input type="hidden" name="_template" value="table" />
          {/* Hexagonal border corners */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-electric-blue/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-electric-blue/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-electric-blue/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-electric-blue/40 rounded-br-2xl" />

          {/* Connection status */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1 bg-void rounded-full border border-electric-blue/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-electric-blue/60">CONNECTED</span>
          </div>

          <div className="space-y-6">
            {/* Name field */}
            <div className="relative">
              <label className="flex items-center gap-2 text-sm text-electric-blue/60 mb-2 font-mono">
                <User className="w-4 h-4" />
                <span>IDENTITY</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all duration-300 ${
                  focusedField === 'name'
                    ? 'border-electric-blue/50 shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                    : 'border-white/10'
                }`}
                placeholder="Enter your name"
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <label className="flex items-center gap-2 text-sm text-electric-blue/60 mb-2 font-mono">
                <Mail className="w-4 h-4" />
                <span>TRANSMISSION_ADDRESS</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all duration-300 ${
                  focusedField === 'email'
                    ? 'border-electric-blue/50 shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                    : 'border-white/10'
                }`}
                placeholder="Enter your email"
              />
            </div>

            {/* Message field */}
            <div className="relative">
              <label className="flex items-center gap-2 text-sm text-electric-blue/60 mb-2 font-mono">
                <MessageSquare className="w-4 h-4" />
                <span>DATA_PACKET</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none transition-all duration-300 resize-none ${
                  focusedField === 'message'
                    ? 'border-electric-blue/50 shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                    : 'border-white/10'
                }`}
                placeholder="Enter your message"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 rounded-xl font-display font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
                status === 'success'
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : status === 'error'
                  ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                  : 'bg-electric-blue/10 border border-electric-blue/30 text-electric-blue hover:bg-electric-blue/20 hover:border-electric-blue/50 glow-blue'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-electric-blue/30 border-t-electric-blue rounded-full animate-spin" />
                  <span>Encrypting Transmission...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Transmission Sent Successfully</span>
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Transmission Failed. Retry?</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>

          {/* Floating satellite icons */}
          <div className="absolute -right-4 top-1/4 opacity-20">
            <div className="w-8 h-8 border border-electric-blue/40 rounded-full animate-orbit" />
          </div>
          <div className="absolute -left-4 bottom-1/4 opacity-20">
            <div className="w-6 h-6 border border-purple-glow/40 rounded-full animate-orbit" style={{ animationDelay: '-5s' }} />
          </div>
        </form>
      </div>
    </section>
  );
}
