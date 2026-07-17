"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Terminal, type TerminalCommands } from "@/components/Terminal";

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
  "AWS",
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "AI Agents",
  "Flutter",
  "Firebase",
];
const techDoubled = [...tech, ...tech];

const log = [
  "building full-stack AI apps",
  "shipping AI agents to prod",
  "deploying on GCP",
  "debugging RAG retrieval",
  "fine-tuning transformers",
  "containerizing ML pipelines",
  "status: deep-work-mode",
];
const logDoubled = [...log, ...log];

const stats = [
  { target: 20, suffix: "+", pad: false, label: "Skills fulfilled via vibe coding" },
  { target: 3, suffix: "", pad: true, label: "AI internships shipped" },
  { target: 15, suffix: "+", pad: false, label: "Projects built" },
];

const nowCards = [
  {
    icon: "⚙",
    tag: "Working on",
    title: "Building app MVPs & AI agents",
    body: "Kin, a one-button check-in app for parents and guardians with no location tracking, plus Jotgen, an agent that writes well-researched blogs with near-zero hallucination.",
  },
  {
    icon: "◇",
    tag: "Exploring",
    title: "Getting comfortable with not knowing",
    body: "Trading finished answers for better questions — every project is a rough draft, and the only failure is standing still.",
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
    name: "Local RAG System",
    image: "/local_rag.png",
    link: "https://github.com/BEASTBOYJAY/Local_RAG",
    desc: "A fully local RAG pipeline that processes PDFs, builds embeddings, and returns context-aware answers via semantic search.",
    tags: ["Python", "Groq", "LLM"],
  },
  {
    num: "02",
    year: "2024",
    name: "GPT Language Model",
    image: "/gpt_language_model.png",
    link: "https://github.com/BEASTBOYJAY/GPT-dev",
    desc: "A GPT-style language model in PyTorch — multi-head attention, character tokenization, and GPU-accelerated training from scratch.",
    tags: ["Python", "PyTorch", "LLM"],
  },
  {
    num: "03",
    year: "2026",
    name: "Car Racing Reinforcement Learning",
    image: "/car_rl.png",
    link: "https://github.com/BEASTBOYJAY/Car_RL",
    desc: "A self-driving racer trained with PPO — lidar-based perception, custom physics, and reward shaping, racing head-to-head against a human player.",
    tags: ["Python", "PPO", "Reinforcement Learning"],
  },
];

const experience = [
  {
    dates: "JAN 2026 — JUL 2026",
    company: "Jouleworx",
    companyUrl: "https://jouleworx.com/",
    role: "Tech Generalist Intern",
    points: [
      "Architected and deployed autonomous AI agents, integrating LLMs into production on high-performance infrastructure.",
      "Built and maintained scalable Next.js web apps, bridging complex backends with responsive frontends.",
      "Designed secure, cost-optimized cloud environments and CI/CD pipelines for containerized GCP deployments.",
      "Currently building the company's first product MVP, gearing up for public launch.",
    ],
  },
  {
    dates: "MAY 2025 — OCT 2025",
    company: "Magure Inc.",
    companyUrl: "https://www.magureinc.com/",
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

type SkillSize = "banner" | "wide" | "md" | "sm";

const skills: { group: string; items: string[]; size: SkillSize; placement: string }[] = [
  { group: "AI Domains", items: ["Computer Vision", "NLP", "GenAI", "RAG", "AI Agents", "Vector Databases", "Prompt Engineering", "LLM Fine-tuning"], size: "banner", placement: "lg:col-start-3 lg:row-start-1" },
  { group: "ML / DL", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"], size: "md", placement: "lg:col-start-3 lg:row-start-2" },
  { group: "Frontend (Vibe-Coded)", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"], size: "md", placement: "lg:col-start-4 lg:row-start-2" },
  { group: "Backend", items: ["FastAPI", "Node.js", "PostgreSQL", "MongoDB"], size: "sm", placement: "lg:col-start-1 lg:row-start-3" },
  { group: "Cloud & DevOps", items: ["Docker", "AWS", "GCP", "Terraform", "CI/CD"], size: "wide", placement: "lg:col-start-2 lg:row-start-3" },
  { group: "Programming", items: ["Python", "C++", "SQL"], size: "sm", placement: "lg:col-start-4 lg:row-start-3" },
  { group: "App Development", items: ["Flutter", "Dart", "Firebase"], size: "sm", placement: "lg:col-start-1 lg:row-start-4" },
  { group: "Tools", items: ["Redis", "Kafka", "Git"], size: "sm", placement: "lg:col-start-2 lg:row-start-4" },
  { group: "Agentic AI & LLM Ops", items: ["MCP", "Multi-Agent Orchestration", "Local LLM Workflows", "Efficient Fine-tuning (LoRA/QLoRA)"], size: "banner", placement: "lg:col-start-3 lg:row-start-4" },
];

const BIRTHDATE = new Date(2004, 6, 31);

function computeAge(): number {
  const now = new Date();
  let age = now.getFullYear() - BIRTHDATE.getFullYear();
  const hadBirthday =
    now.getMonth() > BIRTHDATE.getMonth() ||
    (now.getMonth() === BIRTHDATE.getMonth() && now.getDate() >= BIRTHDATE.getDate());
  if (!hadBirthday) age--;
  return age;
}

const commandMeta: { name: string; hint: string }[] = [
  { name: "whoami", hint: "who I am" },
  { name: "age", hint: "how old I am" },
  { name: "about", hint: "short bio" },
  { name: "status", hint: "what I'm up to" },
  { name: "help", hint: "list commands" },
  { name: "skills", hint: "tech I use" },
  { name: "projects", hint: "things I've built" },
  { name: "experience", hint: "work history" },
  { name: "contact", hint: "email" },
  { name: "socials", hint: "social links" },
  { name: "stack", hint: "full tech list" },
  { name: "sudo", hint: "try me" },
  { name: "clear", hint: "clear the screen" },
  { name: "date", hint: "current date/time" },
  { name: "banner", hint: "welcome message" },
];

const terminalCommands: TerminalCommands = {
  whoami: () => ["AI Engineer · FullStack Developer"],
  age: () => [`${computeAge()} years old`],
  about: () => [
    "Building intelligent systems with deep learning, computer vision, NLP, and generative AI —",
    "turning research into things that run in production.",
  ],
  status: () => ["shipping intelligent systems"],
  help: () => ["Available commands:", ...commandMeta.map((c) => `${c.name.padEnd(12)}— ${c.hint}`)],
  skills: () => skills.flatMap((g) => [`${g.group}:`, `  ${g.items.join(", ")}`]),
  projects: () => projects.flatMap((p) => [`${p.name} (${p.year})`, `  ${p.desc}`]),
  experience: () => experience.map((e) => `${e.role} @ ${e.company} (${e.dates})`),
  contact: () => ["jay31sinha@gmail.com"],
  socials: () => ["github.com/beastboyjay", "x.com/BEAST_BOY_JAY", "medium.com/@beastboyjay", "linkedin.com/in/beastboyjay"],
  stack: () => [tech.join(" · ")],
  sudo: () => ["Permission denied: nice try.", "This incident will be reported to /dev/null."],
  date: () => [new Date().toLocaleString()],
  banner: () => ["Welcome to jay@sinha — type 'help' to see available commands."],
};

const bentoSpan: Record<SkillSize, string> = {
  banner: "sm:col-span-2 lg:col-span-2",
  wide: "lg:col-span-2",
  md: "",
  sm: "",
};

const staggerDelay = (i: number) => Math.min(i * 0.05, 0.3);

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
      className={`sticky top-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-[14px] border-b border-border transition-colors duration-300 ${scrolled ? "bg-background/60" : "bg-background/82"
        }`}
    >
      <a href="#top" className="flex items-center gap-3 text-foreground">
        <span className="grid place-items-center w-[38px] h-[38px] rounded-[10px] bg-primary text-primary-foreground font-mono font-medium text-[15px]">
          JS
        </span>
        <span className="flex flex-col leading-[1.1]">
          <span className="font-bold text-[15px]">Jay Sinha</span>
          <span className="font-mono text-[11px] text-[oklch(0.52_0.02_50)]">AI Engineer · FullStack Developer</span>
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
        Currently Founding Engineer @ Jouleworx — open to interesting problems
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
            <Terminal
              commands={terminalCommands}
              boot={
                <>
                  <div>
                    <span className="text-[oklch(0.72_0.15_40)]">$</span> whoami
                  </div>
                  <div className="text-[oklch(0.60_0.012_60)] mb-1.5">AI Engineer · FullStack Developer</div>
                  <div>
                    <span className="text-[oklch(0.72_0.15_40)]">$</span> status
                  </div>
                  <div className="text-[oklch(0.60_0.012_60)] mb-1.5">shipping intelligent systems</div>
                </>
              }
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 border-t border-[oklch(0.82_0.012_72)] pt-8"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
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
        <span className="text-accent">Founding</span> Engineer at JouleWorx,{" "}
        <span className="italic text-[oklch(0.46_0.012_55)]">turning theory into practical AI</span> —{" "}
        <span className="italic text-accent">chasing the parts of the field still being figured out.</span>
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
          <a href="https://github.com/beastboyjay" target="_blank" rel="noopener noreferrer" className="font-mono text-xs hover:text-accent transition-colors">
            VIEW ALL ↗
          </a>
        }
      />
      <motion.h2
        {...reveal}
        className="font-serif font-normal text-[clamp(34px,4.8vw,58px)] leading-[1.04] max-w-[780px] tracking-[-0.01em] mb-11"
      >
        Systems I built to <span className="text-accent">read, generate, and simulate.</span>
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
            <div className="relative aspect-[16/10] rounded-xl bg-[oklch(0.97_0.004_85)] border border-[oklch(0.86_0.012_72)] overflow-hidden">
              <Image
                src={p.image}
                alt={`${p.name} diagram`}
                fill
                className="object-contain p-4"
                sizes="(min-width: 768px) 45vw, 90vw"
              />
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
              {e.companyUrl ? (
                <a
                  href={e.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[22px] font-bold mb-1 hover:text-accent transition-colors inline-block"
                >
                  {e.company}
                </a>
              ) : (
                <h3 className="text-[22px] font-bold mb-1">{e.company}</h3>
              )}
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
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="max-w-[1120px] mx-auto px-8 pt-20 pb-10">
      <SectionLabel index="05" title="SKILLS" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch lg:auto-rows-[minmax(180px,auto)]">
        {skills.map((g, idx) => (
          <Fragment key={g.group}>
            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: staggerDelay(idx === 0 ? 0 : idx + 1) }}
              className={cn(
                "p-[26px] rounded-2xl border border-border bg-[oklch(0.99_0.004_85)]",
                bentoSpan[g.size],
                g.placement
              )}
            >
              <h3 className="font-mono text-[11px] text-[oklch(0.50_0.02_50)] uppercase tracking-[0.08em] mb-4">
                {g.group}
              </h3>
              <div className="flex flex-wrap gap-[9px]">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-2 rounded-[10px] border border-[oklch(0.84_0.012_72)] bg-[oklch(0.96_0.006_80)] text-sm font-medium text-[oklch(0.30_0.01_55)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {idx === 0 && (
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: staggerDelay(1) }}
                className="rounded-2xl border border-[oklch(0.32_0.01_55)] bg-[oklch(0.185_0.008_55)] overflow-hidden flex flex-col shadow-[0_1px_2px_oklch(0.3_0.02_50/.1),0_24px_54px_oklch(0.3_0.02_50/.16)] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1 lg:max-h-[466px]"
              >
                <div className="flex items-center gap-[7px] px-[15px] py-[13px] border-b border-[oklch(0.28_0.01_55)]">
                  <span className="w-[11px] h-[11px] rounded-full bg-[oklch(0.62_0.16_25)]" />
                  <span className="w-[11px] h-[11px] rounded-full bg-[oklch(0.75_0.13_75)]" />
                  <span className="w-[11px] h-[11px] rounded-full bg-[oklch(0.68_0.14_145)]" />
                  <span className="ml-2 font-mono text-[11px] text-[oklch(0.58_0.012_60)]">jay@sinha: ~</span>
                </div>
                <Terminal
                  commands={terminalCommands}
                  boot={
                    <>
                      <div>
                        <span className="text-[oklch(0.72_0.15_40)]">$</span> ./stack --summary
                      </div>
                      {stats.map((s) => (
                        <div key={s.label} className="text-[oklch(0.60_0.012_60)] mb-1.5">
                          <span className="text-[oklch(0.84_0.012_80)]">
                            {s.pad && s.target < 10 ? "0" + s.target : s.target}
                            {s.suffix}
                          </span>{" "}
                          {s.label}
                        </div>
                      ))}
                    </>
                  }
                />
              </motion.div>
            )}
          </Fragment>
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
