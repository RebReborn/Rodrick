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
}

const TerminalApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const initialWelcomeMessage = 'Reborn Terminal [Version 1.0.1]\nType "help" for a list of commands, or "theme" to cycle themes.';
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

  const scrollAreaRootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const prompt = `${envVars.USER || 'user'}@Reborn:~$ `;
  
  const themes: Theme[] = [
    { name: 'Classic Green', background: 'black', foreground: '#4ade80', cursor: '#4ade80' },
    { name: 'Matrix Blue', background: '#0f172a', foreground: '#93c5fd', cursor: '#93c5fd' },
    { name: 'Solarized Dark', background: '#002b36', foreground: '#839496', cursor: '#2aa198' },
    { name: 'Light', background: '#f5f5f5', foreground: '#333333', cursor: '#333333' },
  ];

  const commands = {
    help: () => ({
      output: 'Available commands:\n' +
        '  help     - Show this help message\n' +
        '  clear    - Clear the terminal screen (Ctrl+L)\n' +
        '  date     - Display the current date and time\n' +
        '  echo     - Display a line of text\n' +
        '  theme    - Cycle through terminal themes\n' +
        '  set      - Set environment variable (set NAME=VALUE)\n' +
        '  env      - List all environment variables\n' +
        '  whoami   - Display current user',
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
  };

  const commandAliases: Record<string, string> = {
    cls: 'clear',
    dt: 'date',
    print: 'echo',
    who: 'whoami',
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
        throw new Error(`command not found: ${commandToProcess}`);
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
      setIsSearching(true);
      setSearchQuery('');
      setCurrentInput('');
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines([{ id: `line-${Date.now()}-ctrll`, type: 'output', text: initialWelcomeMessage }]);
      setCurrentInput('');
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  const filteredHistory = searchQuery
    ? history.filter(cmd => cmd.toLowerCase().includes(searchQuery.toLowerCase()))
    : history;

  return (
    <div
      className="terminal-container h-full flex flex-col font-code text-sm select-text p-2"
      style={{
        backgroundColor: themes[currentThemeIndex].background,
        color: themes[currentThemeIndex].foreground,
      }}
      onClick={() => hiddenInputRef.current?.focus()}
    >
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
      
      <ScrollArea className="flex-grow" ref={scrollAreaRootRef}>
        <div className="h-full">
          {lines.map((line) => (
            <div key={line.id} className="whitespace-pre-wrap break-words leading-normal">
              {line.type === 'input' ? (
                <span className="text-inherit">{line.text}</span>
              ) : (
                line.text.split('\n').map((subLine, idx) => (
                  <div key={idx} className={line.type === 'error' ? 'text-red-400' : 'text-inherit'}>
                    {subLine}
                    {line.timestamp && idx === 0 && (
                      <span className="text-xs opacity-60 ml-2">
                        [{line.timestamp}ms]
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          ))}
          {isSearching && (
            <div className="text-yellow-400">
              (reverse-i-search)`{searchQuery}`: {filteredHistory[0] || ''}
            </div>
          )}
          <div className="flex items-center leading-normal">
            <span className="text-inherit mr-1">{prompt}</span>
            <span className="text-inherit">{currentInput}</span>
            <span
              className="cursor-block inline-block w-[0.5em] h-[1.2em] align-middle animate-blink ml-0.5"
              style={{ backgroundColor: themes[currentThemeIndex].cursor }}
            ></span>
          </div>
        </div>
      </ScrollArea>
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default TerminalApp;