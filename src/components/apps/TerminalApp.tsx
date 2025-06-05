
"use client";

import React, { useState, useRef, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminalLine {
  id: string;
  type: 'input' | 'output';
  text: string;
}

const TerminalApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const initialWelcomeMessage = 'FluentFolio Terminal [Version 1.0.0]\nType "help" for a list of commands, or "theme" to toggle theme.';
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 means new command, 0 is most recent history item
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: `line-${Date.now()}`, type: 'output', text: initialWelcomeMessage },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  
  const scrollAreaRootRef = useRef<HTMLDivElement>(null); 
  const viewportRef = useRef<HTMLDivElement | null>(null); 
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const prompt = 'RodrickReborn@fluentfolio:~$ ';

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
  };

  const processCommand = (command: string) => {
    let outputText = '';
    const cmdLower = command.toLowerCase();

    if (cmdLower === 'help') {
      outputText = 'Available commands:\n  help     - Show this help message\n  clear    - Clear the terminal screen (Ctrl+L)\n  date     - Display the current date and time\n  echo ... - Display a line of text\n  theme    - Toggle terminal theme (demo)';
    } else if (cmdLower === 'clear') {
      setLines([{ id: `line-${Date.now()}-clear`, type: 'output', text: initialWelcomeMessage }]);
      return; 
    } else if (cmdLower === 'date') {
      outputText = new Date().toLocaleString();
    } else if (cmdLower.startsWith('echo ')) {
      outputText = command.substring(5);
    } else if (cmdLower === 'theme') {
        const terminalDiv = hiddenInputRef.current?.closest('.terminal-container');
        if (terminalDiv) {
            if (terminalDiv.classList.contains('theme-classic')) {
                terminalDiv.classList.remove('theme-classic');
                terminalDiv.classList.add('theme-matrix-blue');
                outputText = 'Theme changed to "Matrix Blue".';
            } else {
                terminalDiv.classList.remove('theme-matrix-blue');
                terminalDiv.classList.add('theme-classic');
                outputText = 'Theme changed to "Classic Green".';
            }
        } else {
          outputText = "Error: Could not apply theme.";
        }
    } else {
      outputText = `command not found: ${command}`;
    }
    setLines(prev => [...prev, { id: `line-${Date.now()}-output`, type: 'output', text: outputText }]);
  };

  const handleSubmit = () => {
    const commandToProcess = currentInput.trim();
    
    const newLinesUpdate = [
      ...lines,
      { id: `line-${Date.now()}-input`, type: 'input', text: `${prompt}${currentInput}` },
    ];
    setLines(newLinesUpdate);

    if (commandToProcess) {
      // Add to history only if it's a non-empty command
      if (commandToProcess !== (history[0] || '')) { // Avoid duplicate consecutive commands
        setHistory(prev => [commandToProcess, ...prev].slice(0, 50));
      }
      processCommand(commandToProcess);
    }
    
    setCurrentInput('');
    setHistoryIndex(-1); 
    hiddenInputRef.current?.focus();
  };
  
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        if (newIndex !== historyIndex || historyIndex === -1) { // Check if index actually changes or is first time
            setHistoryIndex(newIndex);
            setCurrentInput(history[newIndex] || '');
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) { // Can only go down if we are in history
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        setCurrentInput(newIndex === -1 ? '' : (history[newIndex] || ''));
      } else {
        setCurrentInput(''); // Clear if at bottom of history and press down
      }
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) { 
        e.preventDefault();
        setLines([{ id: `line-${Date.now()}-ctrll`, type: 'output', text: initialWelcomeMessage }]);
        setCurrentInput('');
    }
  };

  return (
    <div
      className="terminal-container theme-classic h-full flex flex-col font-code text-sm select-text p-2"
      onClick={() => hiddenInputRef.current?.focus()} // Focus on click anywhere
    >
      <input // Hidden input for capturing keystrokes
        ref={hiddenInputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="opacity-0 w-0 h-0 absolute top-[-1000px] left-[-1000px]" // Move way off-screen
        autoFocus
        spellCheck="false"
        autoComplete="off"
        aria-hidden="true"
      />
      
      <ScrollArea className="flex-grow" ref={scrollAreaRootRef}>
        <div className="h-full"> 
            {lines.map((line) => (
              <div key={line.id} className="whitespace-pre-wrap break-words leading-normal">
                {line.type === 'input' 
                  ? <span className="text-inherit">{line.text}</span> 
                  : line.text.split('\n').map((subLine, idx) => <div key={idx} className="text-inherit">{subLine}</div>)
                }
              </div>
            ))}
            {/* Display the current input line with prompt and blinking cursor */}
            <div className="flex items-center leading-normal">
              <span className="text-inherit mr-1">{prompt}</span>
              <span className="text-inherit">{currentInput}</span>
              <span className="cursor-block inline-block w-[0.5em] h-[1.2em] align-middle animate-blink ml-0.5"></span>
            </div>
        </div>
      </ScrollArea>
      {/* Inline styles for themes and blink animation */}
      <style jsx global>{`
        .terminal-container.theme-classic {
          background-color: black;
          color: #4ade80; /* Tailwind green-400 */
        }
        .terminal-container.theme-classic .cursor-block {
          background-color: #4ade80; /* Tailwind green-400 */
        }
        .terminal-container.theme-matrix-blue {
          background-color: #0f172a; /* Tailwind slate-900 */
          color: #93c5fd; /* Tailwind blue-300 */
        }
        .terminal-container.theme-matrix-blue .cursor-block {
          background-color: #93c5fd; /* Tailwind blue-300 */
        }
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

