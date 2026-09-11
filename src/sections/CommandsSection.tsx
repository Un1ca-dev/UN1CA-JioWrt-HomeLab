import React, { useState } from 'react';
import { commandsLibrary } from '../data/commandsData';
import { CodeBlock } from '../components/common/CodeBlock';
import { Terminal, Search, AlertTriangle } from 'lucide-react';

export const CommandsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOs, setSelectedOs] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredCategories = commandsLibrary
    .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
    .filter((cat) => selectedOs === 'all' || cat.targetOs.includes(selectedOs))
    .map((cat) => ({
      ...cat,
      commands: cat.commands.filter(
        (cmd) =>
          !filterQuery ||
          cmd.cmd.toLowerCase().includes(filterQuery.toLowerCase()) ||
          (cmd.explanation && cmd.explanation.toLowerCase().includes(filterQuery.toLowerCase())) ||
          (cmd.why && cmd.why.toLowerCase().includes(filterQuery.toLowerCase()))
      ),
    }))
    .filter((cat) => cat.commands.length > 0);

  return (
    <section id="commands" className="py-20 sm:py-28 border-t border-lab-borderSubtle bg-lab-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>Command Reference Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            Production Shell Commands & Rationale
          </h2>
          <p className="text-sm sm:text-base text-lab-textMuted leading-relaxed">
            Every command executed during deployment is documented below. Target environments are strictly delineated between <strong className="text-sky-300">JioWrt OpenWrt</strong> and <strong className="text-emerald-300">Oracle Ubuntu 20.04 VPS</strong> to prevent running router commands on the cloud server or vice versa.
          </p>
        </div>

        {/* Operational Safety Notice */}
        <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 flex items-start gap-3 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-300 uppercase tracking-wider">
              Environment Disambiguation Notice:
            </span>
            <p className="text-amber-200/90 leading-relaxed font-sans">
              Notice the target OS badges on each group. Never run <code className="text-amber-300">iptables -t nat ...</code> VPS forwarding rules on OpenWrt (which uses UCI and fw4), and never run <code className="text-amber-300">uci</code> or <code className="text-amber-300">logread</code> commands on Ubuntu.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-lab-border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-lab-textDim absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter commands by flag, path, tool, or rationale..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-lab-surfaceElevated rounded-xl border border-lab-border text-xs sm:text-sm text-white placeholder-lab-textDim focus:outline-none focus:border-sky-400 font-mono transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs font-mono">
            {/* OS Filter */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-lab-borderSubtle">
              <button
                onClick={() => setSelectedOs('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedOs === 'all'
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                    : 'text-lab-textMuted hover:text-white'
                }`}
              >
                All OS
              </button>
              <button
                onClick={() => setSelectedOs('OpenWrt')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedOs === 'OpenWrt'
                    ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                    : 'text-lab-textMuted hover:text-white'
                }`}
              >
                JioWrt
              </button>
              <button
                onClick={() => setSelectedOs('Ubuntu')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedOs === 'Ubuntu'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-lab-textMuted hover:text-white'
                }`}
              >
                Ubuntu VPS
              </button>
            </div>
          </div>
        </div>

        {/* Categories & Commands */}
        <div className="space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl text-center border border-lab-border text-lab-textMuted font-mono text-xs">
              No shell commands match the query "{filterQuery}".
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="border-b border-lab-borderSubtle pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                        {category.name}
                      </h3>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${
                          category.targetOs.includes('Ubuntu')
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                        }`}
                      >
                        Target: {category.targetOs}
                      </span>
                    </div>
                    <p className="text-xs text-lab-textMuted font-mono">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-lab-textDim self-start sm:self-auto">
                    {category.commands.length} snippets
                  </span>
                </div>

                <div className="space-y-4">
                  {category.commands.map((cmd, idx) => (
                    <CodeBlock
                      key={idx}
                      command={cmd.cmd}
                      lang={cmd.lang || 'bash'}
                      shellTitle={`${cmd.shellTitle || category.name} (${category.targetOs})`}
                      explanation={cmd.explanation}
                      why={cmd.why}
                      output={cmd.output}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
