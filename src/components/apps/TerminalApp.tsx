"use client";

import React, { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  text: string;
  timestamp?: number;
}

interface Theme {
  name: string;
  background: string;
  foreground: string;
  cursor: string;
  selection: string;
  accent: string;
}

const TerminalApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const initialWelcomeMessage = `Reborn Terminal [Version 1.1.0]
Type "help" for a list of commands, or "theme" to cycle themes.
Current user: Rodrick`;

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: `line-${Date.now()}`, type: 'output', text: initialWelcomeMessage },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [envVars, setEnvVars] = useState<Record<string, string>>({ USER: 'Rodrick' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(true);

  const scrollAreaRootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const prompt = `${envVars.USER || 'user'}@Reborn:~$ `;

  const themes: Theme[] = [
    { 
      name: 'Classic Green', 
      background: 'black', 
      foreground: '#4ade80', 
      cursor: '#4ade80',
      selection: 'rgba(74, 222, 128, 0.3)',
      accent: '#4ade80'
    },
    { 
      name: 'Matrix Blue', 
      background: '#0f172a', 
      foreground: '#93c5fd', 
      cursor: '#93c5fd',
      selection: 'rgba(147, 197, 253, 0.3)',
      accent: '#93c5fd'
    },
    { 
      name: 'Solarized Dark', 
      background: '#002b36', 
      foreground: '#839496', 
      cursor: '#2aa198',
      selection: 'rgba(42, 161, 152, 0.3)',
      accent: '#2aa198'
    },
    { 
      name: 'Light', 
      background: '#f5f5f5', 
      foreground: '#333333', 
      cursor: '#333333',
      selection: 'rgba(51, 51, 51, 0.2)',
      accent: '#3b82f6'
    },
  ];

  const commands = {
    help: () => ({
      output: `Available commands:
  help     - Show this help message
  clear    - Clear the terminal screen (Ctrl+L)
  date     - Display the current date and time
  echo     - Display a line of text
  theme    - Cycle through terminal themes
  set      - Set environment variable (set NAME=VALUE)
  env      - List all environment variables
  whoami   - Display current user
  history  - Show command history
  search   - Search command history (Ctrl+R)`,
    }),
    clear: () => ({ output: initialWelcomeMessage, clear: true }),
    date: () => ({ output: new Date().toLocaleString() }),
    echo: (args: string) => ({ output: args }),
    theme: () => {
      const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
      setCurrentThemeIndex(nextThemeIndex);
      return { output: `Theme changed to "${themes[nextThemeIndex].name}".` };
    },
    set: (args: string) => {
      const [name, value] = args.split('=').map(s => s.trim());
      if (name && value) {
        setEnvVars(prev => ({ ...prev, [name]: value }));
        return { output: `Set ${name}=${value}` };
      }
      return { error: 'Usage: set NAME=VALUE' };
    },
    env: () => ({ output: Object.entries(envVars).map(([k, v]) => `${k}=${v}`).join('\n') }),
    whoami: () => ({ output: envVars.USER || 'user' }),
    history: () => ({ output: history.map((cmd, i) => `${i + 1}  ${cmd}`).join('\n') || 'No commands in history' }),
    search: () => {
      setIsSearching(true);
      setSearchQuery('');
      return { output: 'Enter search term (Ctrl+R to cancel)' };
    },
  };

  const commandAliases: Record<string, string> = {
    cls: 'clear',
    dt: 'date',
    print: 'echo',
    who: 'whoami',
    hist: 'history',
    find: 'search',
  };

  const availableCommands = [...Object.keys(commands), ...Object.keys(commandAliases)];

  useEffect(() => {
    if (scrollAreaRootRef.current && !viewportRef.current) {
      const viewportElement = scrollAreaRootRef.current.querySelector('div[data-radix-scroll-area-viewport]') as HTMLDivElement;
      if (viewportElement) {
        viewportRef.current = viewportElement;
      }
    }
  }, []);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  useEffect(() => {
    hiddenInputRef.current?.focus();
    
    // Hide help tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowHelpTooltip(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    if (isSearching) {
      setSearchQuery(e.target.value);
    }
  };

  const autoComplete = (input: string): string => {
    const inputLower = input.toLowerCase().trim();
    if (!inputLower) return input;

    const matches = availableCommands.filter(cmd => cmd.startsWith(inputLower));
    if (matches.length === 1) {
      return matches[0];
    }
    if (matches.length > 1) {
      setLines(prev => [...prev, {
        id: `line-${Date.now()}-output`,
        type: 'output',
        text: `Possible completions: ${matches.join(', ')}`,
        timestamp: 0,
      }]);
      return input;
    }
    return input;
  };

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    const startTime = Date.now();

    let commandToProcess = command.trim();
    const parts = commandToProcess.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    // Handle aliases
    const actualCommand = commandAliases[cmd] || cmd;

    try {
      const commandFunc = commands[actualCommand as keyof typeof commands];
      if (!commandFunc) {
        throw new Error(`Command not found: ${commandToProcess}. Type "help" for available commands.`);
      }

      const result = commandFunc(args);
      const executionTime = Date.now() - startTime;

      if (result.clear) {
        setLines([{ id: `line-${Date.now()}-clear`, type: 'output', text: result.output, timestamp: executionTime }]);
      } else {
        setLines(prev => [...prev, {
          id: `line-${Date.now()}-output`,
          type: result.error ? 'error' : 'output',
          text: result.error || result.output,
          timestamp: executionTime,
        }]);
      }
    } catch (error: any) {
      setLines(prev => [...prev, {
        id: `line-${Date.now()}-error`,
        type: 'error',
        text: error.message,
        timestamp: Date.now() - startTime,
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    if (isProcessing) return;

    const commandToProcess = currentInput.trim();
    const newLinesUpdate = [
      ...lines,
      { id: `line-${Date.now()}-input`, type: 'input', text: `${prompt}${currentInput}` },
    ];
    setLines(newLinesUpdate);

    if (commandToProcess) {
      if (commandToProcess !== history[0]) {
        setHistory(prev => [commandToProcess, ...prev].slice(0, 50));
      }
      processCommand(commandToProcess);
    }

    setCurrentInput('');
    setHistoryIndex(-1);
    setIsSearching(false);
    setSearchQuery('');
    hiddenInputRef.current?.focus();
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (isProcessing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && !isSearching) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        if (newIndex !== historyIndex || historyIndex === -1) {
          setHistoryIndex(newIndex);
          setCurrentInput(history[newIndex] || '');
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1 && !isSearching) {
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        setCurrentInput(newIndex === -1 ? '' : (history[newIndex] || ''));
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setCurrentInput(autoComplete(currentInput));
    } else if (e.key === 'r' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsSearching(!isSearching);
      setSearchQuery('');
      setCurrentInput('');
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([{ id: `line-${Date.now()}-ctrll`, type: 'output', text: initialWelcomeMessage }]);
      setCurrentInput('');
      setIsSearching(false);
      setSearchQuery('');
    } else if (e.key === 'Escape') {
      if (isSearching) {
        e.preventDefault();
        setIsSearching(false);
        setSearchQuery('');
        setCurrentInput('');
      }
    }
  };

  const filteredHistory = searchQuery
    ? history.filter(cmd => cmd.toLowerCase().includes(searchQuery.toLowerCase()))
    : history;

  const currentTheme = themes[currentThemeIndex];

  return (
    <div
      ref={terminalContainerRef}
      className="terminal-container h-full flex flex-col font-mono text-sm select-text p-2 relative"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.foreground,
      }}
      onClick={() => hiddenInputRef.current?.focus()}
    >
      {/* Hidden input for capturing keyboard events */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="opacity-0 w-0 h-0 absolute top-[-1000px] left-[-1000px]"
        autoFocus
        spellCheck="false"
        autoComplete="off"
        aria-hidden="true"
        disabled={isProcessing}
      />
      
      {/* Help tooltip that disappears after first interaction */}
      {showHelpTooltip && (
        <div 
          className="absolute top-2 right-2 bg-black bg-opacity-70 text-xs text-white px-2 py-1 rounded z-10"
          style={{ borderColor: currentTheme.accent }}
        >
          Press Ctrl+R to search history
        </div>
      )}

      {/* Status bar */}
      <div 
        className="flex justify-between items-center text-xs mb-1 opacity-70"
        style={{ color: currentTheme.accent }}
      >
        <span>Terminal v1.1.0</span>
        <span>{currentTheme.name}</span>
      </div>

      {/* Terminal content */}
      <ScrollArea 
        className="flex-grow rounded-sm"
        ref={scrollAreaRootRef}
        style={{
          backgroundColor: currentTheme.background,
          // @ts-ignore - CSS custom properties
          '--scrollbar-thumb-color': currentTheme.accent + '80',
        }}
      >
        <div className="h-full p-1">
          {lines.map((line) => (
            <div 
              key={line.id} 
              className="whitespace-pre-wrap break-words leading-normal mb-1"
            >
              {line.type === 'input' ? (
                <span className="text-inherit">{line.text}</span>
              ) : (
                line.text.split('\n').map((subLine, idx, arr) => (
                  <div 
                    key={idx} 
                    className={
                      line.type === 'error' 
                        ? 'text-red-400' 
                        : idx === 0 && line.text === initialWelcomeMessage 
                          ? 'text-blue-300' 
                          : 'text-inherit'
                    }
                  >
                    {subLine}
                    {typeof line.timestamp === 'number' && idx === arr.length - 1 && line.timestamp > 0 && (
                      <span className="text-xs opacity-60 ml-2">
                        [{line.timestamp}ms]
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          ))}
          
          {/* Search mode indicator */}
          {isSearching && (
            <div className="text-yellow-300 mb-1">
              (reverse-i-search)`{searchQuery}`: {filteredHistory[0] || 'no matches'}
            </div>
          )}
          
          {/* Current input line */}
          <div className="flex items-center leading-normal">
            <span 
              className="font-bold mr-1"
              style={{ color: currentTheme.accent }}
            >
              {prompt}
            </span>
            <span className="text-inherit">{currentInput}</span>
            <span
              className="cursor-block inline-block w-[0.5em] h-[1.2em] align-middle animate-blink ml-0.5"
              style={{ backgroundColor: currentTheme.cursor }}
            ></span>
          </div>
        </div>
      </ScrollArea>

      {/* Global styles for the terminal */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        ::selection {
          background-color: ${currentTheme.selection};
          color: inherit;
        }
        [data-radix-scroll-area-viewport] {
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
};

export default TerminalApp;