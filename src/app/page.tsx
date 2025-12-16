"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BrainCircuit,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  Eye,
  MessageSquare,
  Sparkles,
  Server,
  Container,
  Zap,
  ChevronDown,
  Moon,
  Sun,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import VantaBackground from "@/components/ui/VantaBackground";

const technologies = [
  { name: "Python", icon: Code2 },
  { name: "PyTorch", icon: Brain },
  { name: "TensorFlow", icon: Cpu },
  { name: "Computer Vision", icon: Eye },
  { name: "NLP", icon: MessageSquare },
  { name: "GenAI", icon: Sparkles },
  { name: "LangChain", icon: Zap },
  { name: "Docker", icon: Container },
  { name: "FastAPI", icon: Server },
  { name: "SQL", icon: Database },
  { name: "Hugging Face", icon: Brain },
  { name: "RAG", icon: Sparkles },
];

const projects = [
  {
    title: "Virtual Hand Painting",
    description:
      "Interactive application enabling users to create digital drawings using hand gestures with MediaPipe and OpenCV.",
    tech: ["Python", "OpenCV", "MediaPipe"],
    features: [
      "Real-time hand tracking",
      "Dynamic brush sizing",
      "Multiple colors & eraser",
    ],
    link: "https://github.com/BEASTBOYJAY/Virtual_hand_painting",
  },
  {
    title: "Local RAG System",
    description:
      "Engineered a local RAG system to process PDF documents and generate embeddings for content-based query responses.",
    tech: ["Python", "Groq", "LLM"],
    features: [
      "PDF processing",
      "Semantic search",
      "Context-aware responses",
    ],
    link: "https://github.com/BEASTBOYJAY/Local_RAG",
  },
  {
    title: "GPT Language Model",
    description:
      "Developed a GPT-style language model using PyTorch with multi-head attention and transformer architecture.",
    tech: ["Python", "PyTorch", "LLM"],
    features: [
      "Multi-head attention",
      "Character tokenization",
      "GPU acceleration",
    ],
    link: "https://github.com/BEASTBOYJAY/GPT-dev",
  },
];

const experience = [
  {
    company: "Magure Inc.",
    role: "AI Research Intern",
    period: "May 2025 - October 2025",
    highlights: [
      "Micro ML services for ANPR, object detection, multi-camera tracking",
      "RAG-based AI agents for database querying",
      "Containerized ML pipelines with Docker, Kafka, Redis",
    ],
  },
  {
    company: "Wyr.ai",
    role: "AI Engineer Intern",
    period: "July 2024 - Dec 2024",
    highlights: [
      "Deep learning models for real-time object detection",
      "Automated data workflows and scalable APIs",
      "Autoencoders for feature extraction research",
    ],
  },
];

const skills = {
  "Programming": ["Python", "C++", "SQL"],
  "ML/DL": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
  "AI Domains": ["Computer Vision", "NLP", "GenAI", "RAG"],
  "Tools": ["Docker", "FastAPI", "AWS", "Redis", "Kafka", "Git"],
};

function TechMarquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...technologies, ...technologies];

  return (
    <div className="overflow-hidden py-6">
      <div
        className={`flex gap-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {items.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-7 py-3.5 bg-card/60 backdrop-blur-sm rounded-full border border-border hover:border-accent hover:bg-card/80 hover:scale-105 transition-all duration-300 group shadow-sm cursor-pointer"
          >
            <tech.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="text-sm font-semibold whitespace-nowrap tracking-tight group-hover:text-accent transition-colors duration-300">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ isDark, setIsDark }: { isDark: boolean; setIsDark: (value: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-300 ${
        scrolled ? "py-3" : ""
      }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between bg-card/70 backdrop-blur-2xl rounded-full px-8 py-4 border border-border/50 shadow-lg transition-all duration-300 ${
        scrolled ? "py-3 shadow-xl" : ""
      }`}>
        <motion.span 
          className="text-xl font-bold gradient-text cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          JS
        </motion.span>
        <div className="hidden md:flex items-center gap-10">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-200">About</a>
          <a href="#experience" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-200">Experience</a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-200">Projects</a>
          <a href="#skills" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-200">Skills</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-200">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-accent/20 hover:text-accent hover:scale-110 transition-all duration-200"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <a href="https://github.com/beastboyjay" target="_blank" rel="noopener noreferrer" className="group relative">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 hover:text-accent hover:scale-110 transition-all duration-200">
              <Github className="w-4 h-4" />
            </Button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
              GitHub
            </span>
          </a>
          <a href="https://www.linkedin.com/in/beastboyjay/" target="_blank" rel="noopener noreferrer" className="group relative">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 hover:text-accent hover:scale-110 transition-all duration-200">
              <Linkedin className="w-4 h-4" />
            </Button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
              LinkedIn
            </span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6">
      <div className="max-w-7xl mx-auto w-full pt-40 pb-16">
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/20 mb-8 shadow-sm hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">AI Engineer & ML Developer</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block text-foreground mb-3">Hi, I&apos;m</span>
            <span className="gradient-text">Jay Sinha</span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Building intelligent systems with{" "}
            <span className="text-accent font-semibold">Deep Learning</span>,{" "}
            <span className="text-primary font-semibold">Computer Vision</span>, and{" "}
            <span className="text-accent font-semibold">Generative AI</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a href="#contact">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 hover:text-primary-foreground hover:scale-105 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </motion.div>
    </section>
  );
}

function TechShowcaseSection() {
  return (
    <section className="py-20 px-6 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TechMarquee />
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-7"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m a driven computer science undergraduate passionate about AI, ML, and generative AI, 
                with strong data science expertise and a focus on transforming theoretical concepts into 
                practical innovations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eager to deliver cutting-edge solutions in the dynamic and transformative field of 
                artificial intelligence and generative technologies.
              </p>
              <div className="flex items-start gap-4 pt-6">
                <Badge variant="secondary" className="px-5 py-3 text-sm font-medium max-w-sm hover:scale-105 hover:text-accent hover:border-accent hover:border-2 hover:bg-accent/10 transition-all duration-200 cursor-pointer">
                  <Brain className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>B.Tech Computer Science</span>
                </Badge>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-accent/20 p-1.5 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center backdrop-blur-xl">
                  <BrainCircuit className="w-40 h-40 text-primary/40 animate-float" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="space-y-8 max-w-5xl mx-auto">
            {experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="bg-card/60 border border-border/50 hover:border-primary/40 transition-all duration-300 card-hover backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
                        <p className="text-primary font-semibold text-lg">{exp.role}</p>
                      </div>
                      <Badge variant="outline" className="w-fit px-4 py-2 text-sm font-medium border-2">
                        {exp.period}
                      </Badge>
                    </div>
                    <ul className="space-y-4">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-4 text-muted-foreground text-base">
                          <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full bg-card/60 border border-border/50 hover:border-primary/40 transition-all duration-300 card-hover group backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300">
                        <Code2 className="w-8 h-8 text-primary" />
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer" />
                      </a>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-muted-foreground text-base mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>
                    <div className="space-y-5">
                      <div className="flex flex-wrap gap-2.5">
                        {project.tech.map((t, i) => (
                          <Badge key={i} variant="secondary" className="text-xs font-semibold px-3 py-1.5">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <ul className="space-y-2.5">
                        {project.features.map((f, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="bg-card/60 border border-border/50 h-full hover:border-primary/40 card-hover backdrop-blur-sm shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-primary">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {items.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-sm font-medium px-3.5 py-2 border-2">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="gradient-text">Let&apos;s Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-14 max-w-3xl mx-auto leading-relaxed">
            I&apos;m always open to discussing new opportunities, innovative projects, 
            or just having a chat about AI and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 hover:text-primary-foreground hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base px-8 py-6">
              <Mail className="w-5 h-5 mr-2" />
              jay31sinha@gmail.com
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 hover:bg-accent/20 hover:text-accent hover:border-accent hover:scale-105 transition-all duration-300 font-semibold text-base px-8 py-6" onClick={() => window.open("https://www.linkedin.com/in/beastboyjay/", "_blank")}>
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 hover:bg-accent/20 hover:text-accent hover:border-accent hover:scale-105 transition-all duration-300 font-semibold text-base px-8 py-6" onClick={() => window.open("https://github.com/beastboyjay", "_blank")}>
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
          <div className="mt-10 text-base text-muted-foreground font-medium">
            <p>Raipur, Chhattisgarh</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-medium">
          © {currentYear} Jay Sinha. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground font-medium">
          Built with passion for AI
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <main className="min-h-screen">
      <VantaBackground isDark={isDark}>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <HeroSection />
        <TechShowcaseSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </VantaBackground>
    </main>
  );
}