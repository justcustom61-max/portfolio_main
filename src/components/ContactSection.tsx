import { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-4 flex items-center justify-center"
    >
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-center mb-4 gradient-text">
          Let's Build Something Amazing
        </h2>

        <p className="text-white/30 text-center mb-12 text-sm tracking-widest uppercase">
          Open Transmission Channel
        </p>

        <form
          action="https://formsubmit.co/djain4642@gmail.com"
          method="POST"
          className="relative glass-strong rounded-2xl p-8 md:p-12"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Portfolio Contact Form Submission"
          />
          <input
            type="hidden"
            name="_captcha"
            value="false"
          />
          <input
            type="hidden"
            name="_template"
            value="table"
          />

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-electric-blue/60 mb-2 font-mono">
                <User className="w-4 h-4" />
                <span>IDENTITY</span>
              </label>

              <input
                type="text"
                name="name"
                required
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 ${
                  focusedField === 'name'
                    ? 'border-electric-blue/50'
                    : 'border-white/10'
                }`}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-electric-blue/60 mb-2 font-mono">
                <Mail className="w-4 h-4" />
                <span>TRANSMISSION_ADDRESS</span>
              </label>

              <input
                type="email"
                name="email"
                required
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 ${
                  focusedField === 'email'
                    ? 'border-electric-blue/50'
                    : 'border-white/10'
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-electric-blue/60 mb-2 font-mono">
                <MessageSquare className="w-4 h-4" />
                <span>DATA_PACKET</span>
              </label>

              <textarea
                name="message"
                required
                rows={5}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 resize-none ${
                  focusedField === 'message'
                    ? 'border-electric-blue/50'
                    : 'border-white/10'
                }`}
                placeholder="Enter your message"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-display font-medium tracking-wide flex items-center justify-center gap-2 bg-electric-blue/10 border border-electric-blue/30 text-electric-blue hover:bg-electric-blue/20 hover:border-electric-blue/50"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
