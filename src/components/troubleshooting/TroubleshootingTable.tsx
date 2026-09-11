import React, { useState, useMemo } from 'react';
import { TroubleshootingItem } from '../../types';
import { CodeBlock } from '../common/CodeBlock';
import {
  Search,
  AlertCircle,
  Wrench,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface TroubleshootingTableProps {
  items: TroubleshootingItem[];
}

export const TroubleshootingTable: React.FC<TroubleshootingTableProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const categories = ['ALL', 'TLS', 'CGNAT', 'WireGuard', 'AdGuard', 'DNS', 'Firewall', 'Cloudflare'];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.problem.toLowerCase().includes(q) ||
        item.diagnosis.toLowerCase().includes(q) ||
        item.fix.toLowerCase().includes(q) ||
        item.result.toLowerCase().includes(q) ||
        (item.commands && item.commands.some((c) => c.cmd.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search & Category Pills */}
      <div className="glass-panel p-4 rounded-2xl border border-lab-border flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-lab-textDim absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems, diagnosis, fixes, error codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-lab-surfaceElevated rounded-xl border border-lab-border text-xs sm:text-sm text-white placeholder-lab-textDim focus:outline-none focus:border-sky-400 font-mono transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-lab-textDim hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-lab-surfaceElevated text-lab-textMuted hover:text-white border border-lab-borderSubtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Flow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-lab-textDim px-1">
        <span>Showing {filteredItems.length} documented incidents</span>
        <div className="flex items-center gap-2 text-amber-300">
          <span className="font-bold">Structure:</span>
          <span>Problem</span>
          <ArrowRight className="w-3 h-3" />
          <span>Investigation</span>
          <ArrowRight className="w-3 h-3" />
          <span>Command/Test</span>
          <ArrowRight className="w-3 h-3" />
          <span>Fix</span>
          <ArrowRight className="w-3 h-3" />
          <span>Result</span>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center border border-lab-border text-lab-textMuted font-mono text-xs">
            No troubleshooting records match your search criteria.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-amber-500/50 shadow-xl shadow-black/40' : 'border-lab-border hover:border-lab-borderSubtle'
                }`}
              >
                {/* Header Row */}
                <div
                  className="p-5 cursor-pointer select-none flex items-start justify-between gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-lab-surfaceElevated border border-lab-border flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-lab-surface text-amber-400 border border-lab-borderSubtle font-bold">
                          {item.category}
                        </span>
                        {item.severity && (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold ${
                              item.severity === 'high'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {item.severity} severity
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                        {item.problem}
                      </h4>
                      <p className="text-xs text-lab-textMuted mt-1 line-clamp-1 font-sans">
                        <span className="text-lab-textDim font-mono mr-1">Investigation:</span>
                        {item.diagnosis}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-lab-surfaceElevated text-lab-textDim hover:text-white shrink-0 mt-1"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded: Problem -> Investigation -> Fix -> Result */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-lab-borderSubtle pt-5 space-y-4">
                    {/* 4 Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Step 1: Investigation */}
                      <div className="bg-black/50 p-4 rounded-2xl border border-sky-500/30 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                          <Search className="w-3.5 h-3.5" />
                          <span>1. Investigation</span>
                        </div>
                        <p className="text-lab-text leading-relaxed font-sans">
                          {item.diagnosis}
                        </p>
                      </div>

                      {/* Step 2: Fix */}
                      <div className="bg-black/50 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>2. Fix</span>
                        </div>
                        <p className="text-lab-text leading-relaxed font-sans">
                          {item.fix}
                        </p>
                      </div>

                      {/* Step 3: Result */}
                      <div className="bg-black/50 p-4 rounded-2xl border border-purple-500/30 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>3. Result</span>
                        </div>
                        <p className="text-lab-text leading-relaxed font-sans">
                          {item.result}
                        </p>
                      </div>
                    </div>

                    {/* Diagnostic & Fix Commands */}
                    {item.commands && item.commands.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>Command / Test Verification</span>
                        </div>
                        <div className="space-y-2.5">
                          {item.commands.map((cmd, idx) => (
                            <CodeBlock
                              key={idx}
                              command={cmd.cmd}
                              lang={cmd.lang || 'bash'}
                              shellTitle={cmd.shellTitle || 'Diagnostic Command'}
                              explanation={cmd.purpose || cmd.explanation}
                              output={cmd.output}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
