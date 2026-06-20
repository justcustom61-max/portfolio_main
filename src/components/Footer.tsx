export default function Footer() {
  return (
    <footer className="relative py-12 px-4">
      {/* Animated separator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm font-display">
            &copy; 2026 Divyam Jain
          </span>
        </div>

        <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-display">
          Designed for the future
        </p>

        {/* Floating particles */}
        <div className="flex gap-1 opacity-30">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-electric-blue/40 animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
