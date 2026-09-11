import React, { useState } from 'react';
import { CopyButton } from './CopyButton';
import { Terminal, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface CodeBlockProps {
  command: string;
  lang?: string;
  shellTitle?: string;
  explanation?: string;
  why?: string;
  output?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  command,
  lang = 'bash',
  shellTitle = 'Terminal',
  explanation,
  why,
  output,
  className = '',
}) => {
  const [showOutput, setShowOutput] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  // Simple token highlighter for terminal commands (keywords, flags, pipes, IPs, paths)
  const formatCommandLine = (cmdText: string) => {
    return cmdText.split('\n').map((line, lineIdx) => {
      const isComment = line.trim().startsWith('#');
      if (isComment) {
        return (
          <div key={lineIdx} className="text-lab-textDim italic">
            {line}
          </div>
        );
      }

      // Simple highlight rules
      const tokens = line.split(/(\s+|[|;&><\\]+)/);
      return (
        <div key={lineIdx} className="leading-relaxed whitespace-pre font-mono">
          <span className="text-lab-accent/70 select-none mr-2 font-mono text-xs">root@lab:~#</span>
          {tokens.map((token, tokIdx) => {
            if (/^(sudo|sysctl|iptables|uci|openssl|chown|chmod|cp|cat|tail|grep|netstat|ip|wg|curl|nslookup|echo)$/.test(token)) {
              return <span key={tokIdx} className="text-sky-400 font-semibold">{token}</span>;
            }
            if (/^(-[a-zA-Z0-9]+|--[a-zA-Z0-9_-]+)/.test(token)) {
              return <span key={tokIdx} className="text-amber-400">{token}</span>;
            }
            if (/^(\||\&|;|&&|\|\||>|>>|<|\\)$/.test(token)) {
              return <span key={tokIdx} className="text-rose-400 font-bold">{token}</span>;
            }
            if (/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|un1ca\.dpdns\.org|:\d+)/.test(token)) {
              return <span key={tokIdx} className="text-emerald-400">{token}</span>;
            }
            if (/(\/[a-zA-Z0-9_.-]+)+/.test(token)) {
              return <span key={tokIdx} className="text-purple-300">{token}</span>;
            }
            if (/\[REDACTED[A-Z0-9_]*\]/.test(token)) {
              return <span key={tokIdx} className="bg-rose-500/20 text-rose-300 px-1 rounded border border-rose-500/30 text-xs font-mono">{token}</span>;
            }
            return <span key={tokIdx} className="text-lab-text">{token}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-lab-border bg-[#090d14] shadow-xl ${className}`}>
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-lab-surfaceElevated border-b border-lab-border text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <Terminal className="w-3.5 h-3.5 text-lab-accent" />
          <span className="font-mono text-lab-text font-medium">{shellTitle}</span>
          <span className="px-1.5 py-0.5 rounded bg-lab-surface text-[10px] text-lab-textMuted uppercase font-mono tracking-wider border border-lab-borderSubtle">
            {lang}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {output && (
            <button
              onClick={() => setShowOutput(!showOutput)}
              className="text-[11px] font-mono text-lab-accent hover:underline flex items-center gap-1 px-2 py-0.5 rounded hover:bg-lab-surface"
              type="button"
            >
              <span>{showOutput ? 'Hide Output' : 'View Output'}</span>
              {showOutput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
          <CopyButton text={command} />
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-sm">
        {formatCommandLine(command)}
      </div>

      {/* Optional Output Drawer */}
      {output && showOutput && (
        <div className="border-t border-lab-border bg-black/60 p-3.5 text-xs font-mono">
          <div className="text-lab-textDim text-[10px] uppercase font-bold tracking-wider mb-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            STDOUT / Verification Output
          </div>
          <pre className="text-emerald-300/90 whitespace-pre-wrap overflow-x-auto leading-relaxed">
            {output}
          </pre>
        </div>
      )}

      {/* Explanation & Why Footer */}
      {(explanation || why) && (
        <div className="border-t border-lab-borderSubtle bg-lab-surface/50 px-4 py-2.5 text-xs text-lab-textMuted flex flex-col gap-1.5">
          {explanation && (
            <div className="leading-relaxed">
              <span className="font-semibold text-lab-text font-mono text-[11px] mr-1">Explanation:</span>
              {explanation}
            </div>
          )}

          {why && (
            <div className="pt-1 border-t border-lab-borderSubtle/60">
              <button
                onClick={() => setShowWhy(!showWhy)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 font-mono transition-colors"
                type="button"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Why is this required?</span>
                {showWhy ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              {showWhy && (
                <p className="mt-1 text-amber-200/90 leading-relaxed bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  {why}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
