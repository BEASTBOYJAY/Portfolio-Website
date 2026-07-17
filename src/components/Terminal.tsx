"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TerminalCommands = Record<string, () => string[]>;

type Entry = { input: string; output: string[] };

export function Terminal({ boot, commands }: { boot: ReactNode; commands: TerminalCommands }) {
  const [history, setHistory] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [navIndex, setNavIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  function syncCursor(el: HTMLInputElement | null) {
    if (!el) return;
    setCursorPos(el.selectionStart ?? el.value.length);
  }

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [history]);

  function run(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) {
      setHistory((h) => [...h, { input: "", output: [] }]);
    } else if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
      setCmdLog((l) => [...l, trimmed]);
    } else {
      const cmd = commands[trimmed.toLowerCase()];
      const output = cmd ? cmd() : [`command not found: ${trimmed}`, "type 'help' for available commands"];
      setHistory((h) => [...h, { input: trimmed, output }]);
      setCmdLog((l) => [...l, trimmed]);
    }
    setValue("");
    setNavIndex(null);
    setCursorPos(0);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdLog.length === 0) return;
      const next = navIndex === null ? cmdLog.length - 1 : Math.max(0, navIndex - 1);
      setValue(cmdLog[next]);
      setNavIndex(next);
      setCursorPos(cmdLog[next].length);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (navIndex === null) return;
      const next = navIndex + 1;
      if (next >= cmdLog.length) {
        setValue("");
        setNavIndex(null);
        setCursorPos(0);
      } else {
        setValue(cmdLog[next]);
        setNavIndex(next);
        setCursorPos(cmdLog[next].length);
      }
    } else {
      const el = e.currentTarget;
      requestAnimationFrame(() => syncCursor(el));
    }
  }

  return (
    <div
      ref={bodyRef}
      onClick={() => inputRef.current?.focus()}
      className={`px-[18px] py-5 font-mono text-[12.5px] leading-[2.05] text-[oklch(0.84_0.012_80)] flex flex-col flex-1 min-h-0 overflow-y-auto cursor-text ${
        history.length === 0 ? "justify-center" : "justify-start"
      }`}
    >
      {boot}
      {history.map((entry, i) => (
        <div key={i}>
          {entry.input && (
            <div>
              <span className="text-[oklch(0.72_0.15_40)]">$</span> {entry.input}
            </div>
          )}
          {entry.output.map((line, j) => (
            <div key={j} className="text-[oklch(0.60_0.012_60)] mb-1.5">
              {line}
            </div>
          ))}
        </div>
      ))}
      <div>
        <span className="text-[oklch(0.72_0.15_40)]">$</span>{" "}
        <span className="relative inline-block">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              syncCursor(e.target);
            }}
            onKeyDown={onKeyDown}
            onKeyUp={(e) => syncCursor(e.currentTarget)}
            onClick={(e) => syncCursor(e.currentTarget)}
            onSelect={(e) => syncCursor(e.currentTarget)}
            size={Math.max(value.length, 1)}
            className="absolute inset-0 w-full bg-transparent border-0 outline-none p-0 m-0 font-mono text-[12.5px] text-transparent caret-transparent"
            aria-label="Terminal command input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          <span aria-hidden className="whitespace-pre text-[oklch(0.84_0.012_80)]">
            {value.slice(0, cursorPos)}
            <span className="text-[oklch(0.72_0.15_40)] animate-blink-cursor">▋</span>
            {value.slice(cursorPos)}
          </span>
        </span>
      </div>
    </div>
  );
}
