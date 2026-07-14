"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const tech = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Computer Vision",
  "NLP",
  "GenAI",
  "LangChain",
  "Docker",
  "FastAPI",
  "SQL",
  "Hugging Face",
  "RAG",
];
const techDoubled = [...tech, ...tech];

const log = [
  "training detection models",
  "debugging RAG retrieval",
  "fine-tuning transformers",
  "containerizing ML pipelines",
  "tracking objects across cameras",
  "building AI agents",
  "status: deep-work-mode",
];
const logDoubled = [...log, ...log];

const stats = [
  { target: 2, suffix: "", pad: true, label: "AI internships shipped" },
  { target: 10, suffix: "+", pad: false, label: "Projects built" },
  { target: 4, suffix: "", pad: false, label: "AI domains: CV · NLP · GenAI · RAG" },
];

const nowCards = [
  {
    icon: "⚙",
    tag: "Working on",
    title: "Micro ML services at Magure",
    body: "ANPR, object detection, and multi-camera tracking, plus RAG agents that query databases in plain language.",
  },
  {
    icon: "◇",
    tag: "Exploring",
    title: "MCP & local agent workflows",
    body: "Tighter context, better tools, and fewer handoffs between thought and execution on-device.",
  },
  {
    icon: "☕",
    tag: "Fuel",
    title: "Black coffee, double shot",
    body: "The default compiler for late-night training runs and debugging retrieval scores.",
  },
  {
    icon: "♫",
    tag: "Now playing",
    title: "Lo-fi & synthwave",
    body: "Low-vocal, high-focus — the soundtrack for deep-work mode and long GPU sessions.",
  },
];

const projects = [
  {
    num: "01",
    year: "2024",
    name: "Virtual Hand Painting",
    shot: "[ gesture demo ]",
    link: "https://github.com/BEASTBOYJAY/Virtual_hand_painting",
    desc: "Draw digitally with hand gestures — real-time hand tracking, dynamic brush sizing, and multiple colors, built on MediaPipe and OpenCV.",
    tags: ["Python", "OpenCV", "MediaPipe"],
  },
  {
    num: "02",
    year: "2024",
    name: "Local RAG System",
    shot: "[ retrieval flow ]",
    link: "https://github.com/BEASTBOYJAY/Local_RAG",
    desc: "A fully local RAG pipeline that processes PDFs, builds embeddings, and returns context-aware answers via semantic search.",
    tags: ["Python", "Groq", "LLM"],
  },
  {
    num: "03",
    year: "2024",
    name: "GPT Language Model",
    shot: "[ attention map ]",
    link: "https://github.com/BEASTBOYJAY/GPT-dev",
    desc: "A GPT-style language model in PyTorch — multi-head attention, character tokenization, and GPU-accelerated training from scratch.",
    tags: ["Python", "PyTorch", "LLM"],
  },
];

const experience = [
  {
    dates: "MAY 2025 — OCT 2025",
    company: "Magure Inc.",
    role: "AI Research Intern",
    points: [
      "Built micro ML services for ANPR, object detection, and multi-camera tracking.",
      "Developed RAG-based AI agents for natural-language database querying.",
      "Containerized ML pipelines with Docker, Kafka, and Redis.",
    ],
  },
  {
    dates: "JUL 2024 — DEC 2024",
    company: "Wyr.ai",
    role: "AI Engineer Intern",
    points: [
      "Trained deep learning models for real-time object detection.",
      "Automated data workflows and built scalable APIs.",
      "Researched autoencoders for feature extraction.",
    ],
  },
];

const skills = [
  { group: "Programming", items: ["Python", "C++", "SQL"] },
  { group: "ML / DL", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"] },
  { group: "AI Domains", items: ["Computer Vision", "NLP", "GenAI", "RAG"] },
  { group: "Tools", items: ["Docker", "FastAPI", "AWS", "Redis", "Kafka", "Git"] },
];

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

function SectionLabel({ index, title, right }: { index: string; title: string; right?: React.ReactNode }) {
  return (
    <motion.div {...reveal} className="flex items-baseline gap-4 mb-9">
      <span className="font-mono text-xs tracking-[0.04em] text-accent">
        {index} / {title}
      </span>
      <span className="h-px flex-1 bg-[oklch(0.84_0.012_72)]" />
      {right}
    </motion.div>
  );
}

function StatCounter({ target, suffix, pad }: { target: number; suffix: string; pad: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(pad ? "00" : "0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const dur = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.round(target * eased);
            setDisplay((pad && value < 10 ? "0" + value : "" + value) + suffix);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix, pad]);

  return (
    <div ref={ref} className="font-serif font-normal text-[clamp(44px,5.4vw,68px)] leading-none text-accent">
      {display}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-[14px] border-b border-border transition-colors duration-300 ${
        scrolled ? "bg-background/60" : "bg-background/82"
      }`}
    >
      <a href="#top" className="flex items-center gap-3 text-foreground">
        <span className="grid place-items-center w-[38px] h-[38px] rounded-[10px] bg-primary text-primary-foreground font-mono font-medium text-[15px]">
          JS
        </span>
        <span className="flex flex-col leading-[1.1]">
          <span className="font-bold text-[15px]">Jay Sinha</span>
          <span className="font-mono text-[11px] text-[oklch(0.52_0.02_50)]">AI Engineer · ML</span>
        </span>
      </a>
      <div className="flex items-center gap-7">
        <div className="hidden md:flex gap-[26px]">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[14px] font-medium text-[oklch(0.38_0.012_55)] hover:text-accent transition-colors"
            >
              {n.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 px-4 py-[9px] rounded-full bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-[oklch(0.28_0.006_55)] transition-colors"
        >
          Get in touch →
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <header id="top" className="max-w-[1120px] mx-auto px-8 pt-[88px] pb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2.5 px-[14px] py-[7px] font-mono text-xs tracking-[0.04em] uppercase text-[oklch(0.50_0.02_50)]"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
        Currently AI Research Intern @ Magure — open to interesting problems
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.65fr] gap-12 items-center mt-7">
        <div>
          <h1 className="font-serif font-normal text-[clamp(60px,10vw,142px)] leading-[0.9] tracking-[-0.02em]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="block"
            >
              Engineer.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="block"
            >
              Researcher.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
              className="block text-accent"
            >
              Builder.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            className="mt-[26px] max-w-[520px] text-lg leading-[1.55] text-[oklch(0.44_0.012_55)]"
          >
            Building intelligent systems with deep learning, computer vision, NLP, and generative AI — turning
            research into things that run in production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="flex gap-3.5 mt-[30px]"
          >
            <a
              href="#work"
              className="px-[22px] py-[13px] rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-[oklch(0.28_0.006_55)] transition-colors"
            >
              See the work →
            </a>
            <a
              href="https://github.com/beastboyjay"
              className="px-[22px] py-[13px] rounded-full border border-[oklch(0.80_0.012_72)] bg-[oklch(0.99_0.004_85)] text-[oklch(0.26_0.008_55)] font-semibold text-sm hover:border-accent hover:text-accent transition-colors"
            >
              GitHub ↗
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="w-full aspect-[4/5] rounded-2xl border border-[oklch(0.32_0.01_55)] bg-[oklch(0.185_0.008_55)] overflow-hidden flex flex-col shadow-[0_1px_2px_oklch(0.3_0.02_50/.1),0_24px_54px_oklch(0.3_0.02_50/.16)]">
            <div className="flex items-center gap-[7px] px-[15px] py-[13px] border-b border-[oklch(0.28_0.01_55)]">
              <span className="w-[11px] h-[11px] rounded-full bg-[oklch(0.62_0.16_25)]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[oklch(0.75_0.13_75)]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[oklch(0.68_0.14_145)]" />
              <span className="ml-2 font-mono text-[11px] text-[oklch(0.58_0.012_60)]">jay@sinha: ~</span>
            </div>
            <div className="px-[18px] py-5 font-mono text-[12.5px] leading-[2.05] text-[oklch(0.84_0.012_80)] flex flex-col justify-center flex-1">
              <div>
                <span className="text-[oklch(0.72_0.15_40)]">$</span> whoami
              </div>
              <div className="text-[oklch(0.60_0.012_60)] mb-1.5">AI Engineer · ML Developer</div>
              <div>
                <span className="text-[oklch(0.72_0.15_40)]">$</span> cat stack.txt
              </div>
              <div className="text-[oklch(0.60_0.012_60)] mb-1.5">PyTorch · RAG · CV · NLP · GenAI</div>
              <div>
                <span className="text-[oklch(0.72_0.15_40)]">$</span> status --now
              </div>
              <div className="text-[oklch(0.60_0.012_60)] mb-1.5">shipping intelligent systems</div>
              <div>
                <span className="text-[oklch(0.72_0.15_40)]">$</span>{" "}
                <span className="text-[oklch(0.72_0.15_40)] animate-blink-cursor">▋</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
        className="grid grid-cols-3 gap-6 mt-14 border-t border-[oklch(0.82_0.012_72)] pt-8"
      >
        {stats.map((s) => (
          <div key={s.label}>
            <StatCounter target={s.target} suffix={s.suffix} pad={s.pad} />
            <div className="mt-2 text-sm text-[oklch(0.46_0.012_55)]">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </header>
  );
}

function TechMarquee() {
  return (
    <div className="border-y border-border py-4 overflow-hidden bg-[oklch(0.94_0.01_80)]">
      <div className="flex gap-3 w-max animate-marquee">
        {techDoubled.map((t, i) => (
          <span
            key={i}
            className="px-[15px] py-[7px] border border-[oklch(0.82_0.012_72)] bg-[oklch(0.99_0.004_85)] rounded-full font-mono text-[12.5px] text-[oklch(0.40_0.012_55)] whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function NowSection() {
  return (
    <section id="about" className="max-w-[1120px] mx-auto px-8 pt-[92px] pb-10">
      <SectionLabel
        index="01"
        title="NOW"
        right={<span className="font-mono text-xs text-[oklch(0.55_0.02_50)]">UPDATED JUL 2026</span>}
      />
      <motion.p
        {...reveal}
        className="font-serif font-normal text-[clamp(30px,3.9vw,48px)] leading-[1.24] max-w-[900px] tracking-[-0.01em]"
      >
        A computer science undergrad turning theory into practical AI —{" "}
        <span className="text-accent">chasing the parts of the field still being figured out.</span>
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-11">
        {nowCards.map((c) => (
          <motion.div
            key={c.title}
            {...reveal}
            className="p-[26px] rounded-2xl border border-border bg-[oklch(0.99_0.004_85)] shadow-[0_1px_2px_oklch(0.3_0.02_50/.04)]"
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-lg">{c.icon}</span>
              <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-[oklch(0.50_0.02_50)]">
                {c.tag}
              </span>
            </div>
            <h3 className="text-xl font-bold leading-[1.28] mb-2.5">{c.title}</h3>
            <p className="text-sm leading-[1.55] text-[oklch(0.46_0.012_55)]">{c.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-[oklch(0.94_0.01_80)] py-[13px] overflow-hidden">
        <div className="flex gap-2.5 w-max animate-marquee-slow">
          {logDoubled.map((l, i) => (
            <span key={i} className="font-mono text-xs text-[oklch(0.52_0.015_55)] whitespace-nowrap">
              <span className="text-accent">Log&gt;</span> {l}
              <span className="ml-2.5 text-[oklch(0.75_0.012_72)]">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="max-w-[1120px] mx-auto px-8 pt-[72px] pb-10">
      <SectionLabel
        index="02"
        title="SELECTED WORK"
        right={
          <a href="https://github.com/beastboyjay" className="font-mono text-xs hover:text-accent transition-colors">
            VIEW ALL ↗
          </a>
        }
      />
      <motion.h2
        {...reveal}
        className="font-serif font-normal text-[clamp(34px,4.8vw,58px)] leading-[1.04] max-w-[780px] tracking-[-0.01em] mb-11"
      >
        Systems I built to <span className="text-accent">see, read, and generate.</span>
      </motion.h2>

      <div className="flex flex-col gap-[18px]">
        {projects.map((p) => (
          <motion.a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            {...reveal}
            className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-9 p-[26px] rounded-[18px] border border-border bg-[oklch(0.99_0.004_85)] text-inherit shadow-[0_1px_2px_oklch(0.3_0.02_50/.04)] transition-all duration-[250ms] hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_34px_oklch(0.3_0.02_50/.1)]"
          >
            <div className="aspect-[16/10] rounded-xl bg-[repeating-linear-gradient(135deg,oklch(0.95_0.006_80)_0_12px,oklch(0.92_0.008_78)_12px_24px)] grid place-items-center border border-[oklch(0.86_0.012_72)]">
              <span className="font-mono text-xs text-[oklch(0.55_0.02_50)]">{p.shot}</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-mono text-xs text-[oklch(0.50_0.015_55)] mb-3">
                {p.num} · {p.year}
              </div>
              <h3 className="font-serif font-normal text-[34px] leading-[1.04] mb-3">{p.name}</h3>
              <p className="text-[15px] leading-[1.55] text-[oklch(0.46_0.012_55)] mb-[18px]">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-[5px] border border-[oklch(0.84_0.012_72)] bg-[oklch(0.96_0.006_80)] rounded-full font-mono text-[11.5px] text-[oklch(0.40_0.012_55)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="max-w-[1120px] mx-auto px-8 pt-[72px] pb-10">
      <SectionLabel index="03" title="EXPERIENCE" />
      <div className="flex flex-col">
        {experience.map((e) => (
          <motion.div
            key={e.company}
            {...reveal}
            className="grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr] gap-9 py-7 border-t border-[oklch(0.84_0.012_72)]"
          >
            <div>
              <div className="font-mono text-xs text-[oklch(0.50_0.015_55)]">{e.dates}</div>
            </div>
            <div>
              <h3 className="text-[22px] font-bold mb-1">{e.company}</h3>
              <div className="text-[15px] text-accent mb-4">{e.role}</div>
              <ul className="flex flex-col gap-2.5">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-[1.5] text-[oklch(0.42_0.012_55)]">
                    <span className="text-accent font-mono">→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WritingSection() {
  return (
    <section id="writing" className="bg-[oklch(0.928_0.012_78)] border-y border-[oklch(0.86_0.012_72)] mt-8">
      <div className="max-w-[1120px] mx-auto px-8 py-[72px]">
        <SectionLabel index="04" title="WRITING" />
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
          <motion.div {...reveal}>
            <h2 className="font-serif font-normal text-[clamp(32px,4.2vw,52px)] leading-[1.05] tracking-[-0.01em]">
              I write about AI, ML &amp; <span className="text-accent">building things.</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-[oklch(0.44_0.012_55)]">
              Notes from the workbench — model experiments, RAG pipelines, and lessons from turning papers into
              production code.
            </p>
            <a
              href="https://blogs.jaysinha.dev"
              className="inline-flex items-center gap-2 mt-[26px] px-[22px] py-[13px] rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-[oklch(0.28_0.006_55)] transition-colors"
            >
              Read the blog →
            </a>
          </motion.div>
          <motion.div
            {...reveal}
            className="aspect-square rounded-[18px] border border-[oklch(0.82_0.012_72)] bg-[oklch(0.985_0.004_85)] grid place-items-center relative overflow-hidden"
          >
            <span className="font-mono text-[13px] text-[oklch(0.50_0.02_50)]">~/blog $ ls</span>
            <span className="absolute bottom-[22px] left-[22px] right-[22px] font-mono text-[11px] leading-[1.9] text-[oklch(0.60_0.015_55)]">
              rag-from-scratch.md
              <br />
              attention-notes.md
              <br />
              shipping-ml.md<span className="text-accent">_</span>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="max-w-[1120px] mx-auto px-8 pt-20 pb-10">
      <SectionLabel index="05" title="SKILLS" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {skills.map((g) => (
          <motion.div
            key={g.group}
            {...reveal}
            className="p-[26px] rounded-2xl border border-border bg-[oklch(0.99_0.004_85)]"
          >
            <h3 className="font-mono text-[11px] text-[oklch(0.50_0.02_50)] uppercase tracking-[0.08em] mb-4">
              {g.group}
            </h3>
            <div className="flex flex-wrap gap-[9px]">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-2 border border-[oklch(0.84_0.012_72)] bg-[oklch(0.96_0.006_80)] rounded-[10px] text-sm font-medium text-[oklch(0.30_0.01_55)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="max-w-[1120px] mx-auto px-8 pt-[92px] pb-10">
      <SectionLabel index="06" title="CONTACT" />
      <motion.h2
        {...reveal}
        className="font-serif font-normal text-[clamp(44px,7vw,100px)] leading-[0.98] tracking-[-0.02em] max-w-[900px]"
      >
        Got an <span className="text-accent">interesting problem?</span> Let&apos;s talk.
      </motion.h2>
      <motion.p {...reveal} className="mt-[22px] max-w-[540px] text-lg leading-[1.55] text-[oklch(0.44_0.012_55)]">
        I&apos;m always open to conversations about AI, ML, and generative tech — especially the kind that don&apos;t
        have an obvious answer yet. I read every message.
      </motion.p>
      <motion.div {...reveal} className="flex flex-wrap gap-3.5 mt-[34px]">
        <a
          href="mailto:jay31sinha@gmail.com"
          className="px-[22px] py-[14px] rounded-full bg-primary text-primary-foreground font-semibold text-[15px] hover:bg-[oklch(0.28_0.006_55)] transition-colors"
        >
          jay31sinha@gmail.com ↗
        </a>
        <a
          href="https://www.linkedin.com/in/beastboyjay/"
          className="px-[22px] py-[14px] rounded-full border border-[oklch(0.80_0.012_72)] bg-[oklch(0.99_0.004_85)] text-[oklch(0.26_0.008_55)] font-semibold text-[15px] hover:border-accent hover:text-accent transition-colors"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/beastboyjay"
          className="px-[22px] py-[14px] rounded-full border border-[oklch(0.80_0.012_72)] bg-[oklch(0.99_0.004_85)] text-[oklch(0.26_0.008_55)] font-semibold text-[15px] hover:border-accent hover:text-accent transition-colors"
        >
          GitHub ↗
        </a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-[1120px] mx-auto px-8 pt-12 pb-16 border-t border-[oklch(0.84_0.012_72)] flex flex-wrap items-center justify-between gap-4">
      <div className="text-sm text-[oklch(0.48_0.012_55)]">© 2026 Jay Sinha</div>
      <div className="font-mono text-xs text-[oklch(0.55_0.02_50)]">
        Built in Raipur, Chhattisgarh · AI, ML &amp; code
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <TechMarquee />
      <NowSection />
      <WorkSection />
      <ExperienceSection />
      <WritingSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
