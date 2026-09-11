import React from 'react';
import { Terminal, Award, Sparkles } from 'lucide-react';

export const DedicationSection: React.FC = () => {
  const loopSteps = [
    'Learn',
    'Build',
    'Break',
    'Debug',
    'Understand',
    'Improve',
  ];

  return (
    <section id="dedication" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-sky-950/20 to-[#040609]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-sky-500/30 text-xs font-mono text-sky-300">
          <Award className="w-3.5 h-3.5 text-sky-400" />
          <span>Architectural Dedication</span>
        </div>

        {/* Creator Avatar & Attribution */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 opacity-40 blur group-hover:opacity-75 transition duration-300" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-sky-400 shadow-xl bg-black/60">
              <img
                src="/profile.png"
                alt="Suman Sheikh - Creator of UN1CA JioWrt Home Lab"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              Built, configured and documented by <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Suman Sheikh</span>
            </h2>
            <p className="text-xs sm:text-sm text-sky-400 font-mono mt-1 font-medium">
              Home Lab Builder / Linux & Networking Enthusiast
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-base sm:text-lg text-sky-200/90 font-mono font-medium max-w-2xl mx-auto leading-relaxed">
            "From a CGNAT-limited Jio connection to a fully functional Private DNS infrastructure."
          </p>
          <p className="text-xs sm:text-sm text-lab-textMuted max-w-2xl mx-auto leading-relaxed font-sans">
            This Home Lab is a personal learning project focused on networking, Linux, OpenWrt, VPNs, DNS, security, self-hosting and infrastructure. This website documents the complete setup, experiments, commands and configurations behind my JioWrt Home Lab.
          </p>
        </div>

        {/* The Continuous Feedback Loop */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-lab-border max-w-3xl mx-auto shadow-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold mb-4 flex items-center justify-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Continuous Engineering Cycle</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-bold">
            {loopSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="px-3.5 py-1.5 rounded-xl bg-lab-surfaceElevated border border-lab-border text-white shadow-sm hover:border-sky-400 hover:text-sky-300 transition-colors">
                  {step}
                </span>
                {idx < loopSteps.length - 1 && (
                  <span className="text-sky-400 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="pt-4 text-xs font-mono text-lab-textDim">
          © {new Date().getFullYear()} UN1CA JioWrt Home Lab • Designed & Engineered by Suman Sheikh
        </div>
      </div>
    </section>
  );
};
