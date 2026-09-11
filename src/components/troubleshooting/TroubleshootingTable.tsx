import React, { useState, useMemo } from 'react';
import { TroubleshootingItem } from '../../types';
import { CodeBlock } from '../common/CodeBlock';
import { Search, AlertCircle, Wrench, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface TroubleshootingTableProps {
  items: TroubleshootingItem[];
}

export const TroubleshootingTable: React.FC<TroubleshootingTableProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const categories = ['ALL', 'TLS', 'CGNAT', 'WireGuard', 'AdGuard', 'DNS'];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.problem.toLowerCase().includes(q) ||
        item.symptom.toLowerCase().includes(q) ||
        item.cause.toLowerCase().includes(q) ||
        item.solution.toLowerCase().includes(q) ||
        item.commands.some((c) => c.cmd.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-lab-border flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-lab-textDim absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symptoms, errors, iptables, certificates, ports..."
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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-lab-textDim hidden sm:inline mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-bold'
                  : 'bg-lab-surfaceElevated text-lab-textMuted border-lab-border hover:text-white hover:border-lab-borderSubtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-lab-textDim px-1">
        <span>Showing {filteredItems.length} documented failure cases</span>
        {searchQuery && <span>Filtered by: "{searchQuery}"</span>}
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
                  isExpanded ? 'border-sky-500/40 shadow-lg' : 'border-lab-border hover:border-lab-borderSubtle'
                }`}
              >
                {/* Header Row */}
                <div
                  className="p-5 cursor-pointer select-none flex items-start justify-between gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-lab-surfaceElevated border border-lab-border flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-lab-surface text-sky-400 border border-lab-borderSubtle">
                          {item.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                            item.severity === 'high'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          {item.severity} severity
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                        {item.problem}
                      </h4>
                      <p className="text-xs text-lab-textMuted mt-1 line-clamp-1">
                        <span className="text-lab-textDim mr-1">Symptom:</span>
                        {item.symptom}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-1.5 rounded-lg bg-lab-surfaceElevated text-lab-textDim hover:text-white shrink-0 mt-1"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Diagnosis & Solution */}
                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-lab-borderSubtle pt-5 space-y-4">
                    {/* Cause & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-black/40 p-3.5 rounded-xl border border-lab-borderSubtle">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold mb-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Root Cause
                        </div>
                        <p className="text-lab-textMuted leading-relaxed">{item.cause}</p>
                      </div>

                      <div className="bg-black/40 p-3.5 rounded-xl border border-lab-borderSubtle">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1 flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          Prescribed Resolution
                        </div>
                        <p className="text-lab-textMuted leading-relaxed">{item.solution}</p>
                      </div>
                    </div>

                    {/* Diagnostic & Fix Commands */}
                    {item.commands && item.commands.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                          Diagnostic & Remediation Commands
                        </div>
                        <div className="space-y-2.5">
                          {item.commands.map((cmd, idx) => (
                            <CodeBlock
                              key={idx}
                              command={cmd.cmd}
                              lang={cmd.lang || 'bash'}
                              shellTitle={cmd.shellTitle || 'Diagnostic Command'}
                              explanation={cmd.explanation}
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
