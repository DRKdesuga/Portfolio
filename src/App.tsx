import { useState } from 'react';
import { ChevronDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import LiquidEther from './components/LiquidEther';
import profileImg from './assets/img/me.jpg';
import SplitText from './components/SplitText';
import ProjectBubble from './components/ProjectBubble';
import ProjectModal from './components/ProjectModal';
import tigerImg from './assets/img/tiger-banner.png';
import pingImg from './assets/img/ping-banner.png';
import auraImg from './assets/img/aura.png';
import shell42Img from './assets/img/42sh-banner.png';
import nexusImg from './assets/img/nxus-banner.png';
import jwsImg from './assets/img/jws-banner.png';
import eroImg from './assets/img/ero-banner.png';
import sysaliasImg from './assets/img/sysalias-banner.png';
import mybtImg from './assets/img/mybt-banner.png';
import libzorkImg from './assets/img/libzork-banner.png';
import myfindImg from './assets/img/myfind-banner.png';
import mallocImg from './assets/img/malloc-banner.png';
import pingDemo from './assets/demos/ping.mp4';
import auraDemo from './assets/demos/aura.mp4';
import shell42Demo from './assets/demos/42sh.mp4';
import nexusDemo from './assets/demos/nexus.mp4';
import sysaliasDemo from './assets/demos/sysalias.mp4';
import myfindDemo from './assets/demos/myfind.mp4';
import mallocDemo from './assets/demos/malloc.mp4';

const projects = [
  {
    slug: 'tiger',
    title: 'Tiger Compiler',
    subtitle: 'Modular compiler pipeline for the Tiger language.',
    image: tigerImg,
    description: [
      'A complete, educational compiler toolchain for the Tiger language: lexer (Flex), parser (Bison) with tracked locations, typed AST construction, and desugaring of high-level constructs into core forms.',
      'The desugared AST doubles as an intermediate representation for further passes, with utilities for debug printing and structured dumps—turning the project into a practical playground for compiler design.'
    ],
    tech: ['C', 'C++', 'Flex', 'Bison', 'AST', 'Desugaring', 'IR', 'Autotools'],
    tags: ['Compiler', 'C/C++', 'Parsing'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }]
  },
  {
    slug: 'ping',
    title: 'PING',
    subtitle: 'Quarkus + React workspace manager with JWT, projects, folders & files.',
    image: pingImg,
    description: [
      'Lightweight workspace manager with a Quarkus 3 (Java 21) backend exposing REST for authentication (JWT with RSA dev keys) and resources (projects, folders, files: list/upload/move/delete multipart).',
      'PostgreSQL persistence with OpenAPI 3 documentation, plus a Vite/React frontend to browse workspaces and interact with endpoints. Optimized for rapid setup, hot reload, and straightforward local dev.'
    ],
    tech: ['Java 21', 'Quarkus 3', 'REST', 'JWT (RS256)', 'PostgreSQL', 'Hibernate', 'OpenAPI 3', 'Maven', 'React', 'Vite'],
    tags: ['Java', 'Quarkus', 'React'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }],
    demoUrl: pingDemo
  },
  {
    slug: 'aura',
    title: 'AURA – Artificial User Response Assistant',
    subtitle: 'Local full-stack AI assistant (Angular + Spring Boot + PostgreSQL + Ollama).',
    image: auraImg,
    description: [
      'Fully local AI assistant: Spring Boot backend, Angular frontend, Ollama inference engine—no cloud or external APIs.',
      'Backend: Spring Boot 3 (Java 21) + PostgreSQL storing sessions/messages; REST API under /api/chat and /api/sessions with configurable Ollama connector.',
      'Frontend: Angular 17 standalone dark UI with real-time chat, session handling, and model responses; scripts to auto-start/stop the stack and warm models for privacy-first local LLM usage.'
    ],
    tech: ['Java 21', 'Spring Boot 3.3', 'Spring Data JPA', 'PostgreSQL 15', 'Angular 17', 'TypeScript', 'Standalone Components', 'Ollama (LLaMA 3.2)', 'REST API', 'Docker', 'Maven', 'Node.js 20', 'Shell Scripts'],
    tags: ['AI', 'Angular', 'Spring Boot'],
    links: [{ label: 'GitHub – AURA', url: 'https://github.com/DRKdesuga/AURA' }],
    demoUrl: auraDemo
  },
  {
    slug: '42sh',
    title: '42sh',
    subtitle: 'POSIX-compliant UNIX shell with redirections, pipes, and control structures.',
    image: shell42Img,
    description: [
      'POSIX-compatible command interpreter: simple/compound execution, redirections (>, >>, <, 2>), pipelines, logical operators (&&, ||), sub-shells, control structures (if/while/for/case), env management, and built-ins (cd, exit, export, unset, echo…).',
      'Built with Autotools targets for testing/installation; a practical UNIX shell implemented at EPITA.'
    ],
    tech: ['C', 'UNIX', 'POSIX', 'Autotools'],
    tags: ['Shell', 'C', 'POSIX'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }],
    demoUrl: shell42Demo
  },
  {
    slug: 'nxus',
    title: 'Nexus',
    subtitle: 'Spring Boot 3.2 & Angular 17 assistant integrating Spotify, GPT, and NLP.',
    image: nexusImg,
    description: [
      'Full-stack AI assistant: Spring Boot backend + Angular frontend integrating Spotify (OAuth), OpenAI GPT, and local NLP intent detection (DJL embeddings + regex slot extractors).',
      'Backend uses layered architecture with Swagger/OpenAPI and Docker Compose for local deployment; frontend offers modern controls for Spotify playback and AI interactions.'
    ],
    tech: ['Java 21', 'Spring Boot 3.2', 'Spring Web & WebFlux', 'Angular 17', 'TypeScript', 'OAuth 2.0', 'OpenAI API', 'DJL (PyTorch Embeddings)', 'Swagger / OpenAPI', 'Lombok', 'Docker Compose', 'Maven'],
    tags: ['Spring', 'Angular', 'AI'],
    links: [{ label: 'GitHub – NX-US', url: 'https://github.com/DRKdesuga/NX-US' }],
    demoUrl: nexusDemo
  },
  {
    slug: 'jws',
    title: 'JWS',
    subtitle: 'Event-driven microservices ecosystem (Kafka) for a game simulation.',
    image: jwsImg,
    description: [
      'Event-driven game backend modeled with Kafka: inventory service as source of truth, item producer parsing .epimap files, and shop service exposing REST for buy/sell logic.',
      'Services communicate via commands/aggregates (no shared DB) and follow strict boundaries—practical DDD with async messaging and separation of concerns.'
    ],
    tech: ['Java 17', 'Quarkus', 'Apache Kafka', 'PostgreSQL', 'Hibernate Panache', 'Maven', 'DDD'],
    tags: ['Kafka', 'DDD', 'Quarkus'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }]
  },
  {
    slug: 'ero',
    title: 'ERO1',
    subtitle: 'Operations research on urban graphs with OSM data.',
    image: eroImg,
    description: [
      'Operations-research toolkit over urban graphs from OpenStreetMap: directed graph modeling with coverage problems (Chinese Postman, Eulerian traversals, DFS variants) and shortest-path (Dijkstra, A*, Bellman-Ford).',
      'Includes CLI, optional Tkinter GUI, and visualizations (Matplotlib/Folium) with a simple virtual-env setup for quick experimentation.'
    ],
    tech: ['Python 3.9+', 'OSMnx', 'NetworkX', 'Matplotlib', 'Folium', 'Tkinter', 'CLI'],
    tags: ['Python', 'Graphs', 'OR'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }]
  },
  {
    slug: 'sysalias',
    title: 'Sysalias',
    subtitle: 'Lightweight C CLI to manage shell aliases via a JSON registry.',
    image: sysaliasImg,
    description: [
      'Centralizes shell aliases in JSON and syncs with bash/zsh: add/remove/list, import/export, doctor health checks, and generated fragments (aliases.bash / aliases.zsh).',
      'Install via Make or scripts with optional system-wide mode; pragmatic tool to keep aliases tidy and versionable.'
    ],
    tech: ['C', 'Make', 'Shell (bash/zsh)', 'JSON', 'Installer Scripts'],
    tags: ['CLI', 'C', 'Shell'],
    links: [{ label: 'GitHub – Sysalias', url: 'https://github.com/DRKdesuga/Sysalias' }],
    demoUrl: sysaliasDemo
  },
  {
    slug: 'mybt',
    title: 'My-BitTorrent',
    subtitle: 'Modular BitTorrent client in C with Meson.',
    image: mybtImg,
    description: [
      'In-progress BitTorrent client targeting spec compliance with clean modular layout: mbtbe (bencoding), mbtfile (piece validation/disk I/O), mbtnet (peer connections & piece exchange via epoll), mbtutils (strings, views, memory helpers).',
      'Meson build; CLI supports .torrent creation, binding IP/port, pretty-printing torrent metadata, and verbose logging.'
    ],
    tech: ['C', 'Meson', 'epoll', 'Networking', 'Bencode', 'CLI'],
    tags: ['Networking', 'C', 'BitTorrent'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }]
  },
  {
    slug: 'libzork',
    title: 'libZork',
    subtitle: 'C++ framework for graph-based interactive text adventures.',
    image: libzorkImg,
    description: [
      'Author interactive fiction as YAML-described graphs; runners traverse nodes/choices with conditions. Includes CMake build, CLI loader, example assets, and debugging aids.',
      'Screenshots show story execution flow and graph visualization for a “Secret” storyline—compact sandbox for narrative engines.'
    ],
    tech: ['C++', 'CMake', 'YAML', 'CLI', 'Graph Model'],
    tags: ['C++', 'CLI', 'Graphs'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }]
  },
  {
    slug: 'myfind',
    title: 'MyFind',
    subtitle: 'C implementation of Unix find with logical operators and predicates.',
    image: myfindImg,
    description: [
      'Minimal reimplementation of Unix find: parses expressions with AND/OR/NOT via tokenizer, shunting-yard parser, and AST evaluator.',
      'Supports -name, -newer, -perm, -user, -group, -type, plus actions -print and -delete; recursive traversal with lstat safety and Makefile targets for builds.'
    ],
    tech: ['C (POSIX)', 'Makefile', 'Filesystem API', 'fnmatch', 'User/group lookup', 'Permission bits', 'Recursive traversal'],
    tags: ['C', 'POSIX', 'Filesystem'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }],
    demoUrl: myfindDemo
  },
  {
    slug: 'malloc',
    title: 'Custom Malloc Library',
    subtitle: 'C allocator overriding malloc/free/calloc/realloc as libmalloc.so.',
    image: mallocImg,
    description: [
      'Custom memory allocator in C compiled to libmalloc.so and preloaded to intercept standard allocation calls; handles multiple non-contiguous pages, long double alignment, calloc overflow checks, and realloc resizing.',
      'Blocks tracked via internal metadata; tested/debugged via LD_PRELOAD. Makefile provides build/clean targets.'
    ],
    tech: ['C (POSIX)', 'Memory Management', 'Dynamic Allocation', 'Shared Library (.so)', 'Makefile', 'LD_PRELOAD', 'sbrk / mmap', 'Pointer arithmetic'],
    tags: ['C', 'Allocator', 'Systems'],
    links: [{ label: 'GitHub', url: 'https://github.com/DRKdesuga' }],
    demoUrl: mallocDemo
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f19] to-[#1a0a1f] text-white overflow-x-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Liquid Silk Wave Background */}
        <div className="absolute inset-0 z-0">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          </div>
        </div>

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-block px-4 py-2 rounded-full glass-button text-sm text-purple-200/90 mb-8"
          >
            Portfolio
          </motion.div>

          {/* Main heading with split text animation */}
          <SplitText
            text="Welcome to my portfolio"
            className="text-5xl md:text-7xl text-white/95 mb-6"
            delay={700}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            stagger={0.04}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-xl text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Crafting exceptional digital experiences with modern technologies
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5, type: 'spring' }}
            onClick={scrollToPortfolio}
            className="glass-button px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 group neon-glow-purple"
          >
            <span className="flex items-center gap-2">
              See more
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="w-8 h-8 text-white/40" />
        </motion.div>
      </section>

      {/* ==================== MAIN PORTFOLIO SECTION ==================== */}
      <section id="portfolio" className="relative min-h-screen py-20 px-4 md:px-8">
        {/* Background gradient accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* ==================== HEADER SECTION ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 mb-16"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex-shrink-0"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover profile-neon"
                />
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl text-white/95 mb-3">
                  Hamza
                </h1>
                <p className="text-xl text-purple-300/90 mb-4">
                  Software Engineering Student
                </p>
                <p className="text-white/70 max-w-2xl">
                  Passionate about system programming, scalable software, and solving complex problems — driven by curiosity, math, weightlifting, philosophy, and cinema. Major in Software Engineering & Information Systems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ==================== PROJECT BUBBLES GRID ==================== */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl text-white/95 mb-8 text-center">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <ProjectBubble
                  key={index}
                  title={project.title}
                  subtitle={project.subtitle}
                  image={project.image}
                  tags={project.tags}
                  onClick={() => setSelectedProject(project)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* ==================== FOOTER - SOCIAL AREA ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl text-white/95 mb-2">
                  Let's stay in touch
                </h3>
                <p className="text-white/60">
                  Connect with me on social media or drop me an email
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-4 rounded-xl glass-button hover:neon-glow-purple transition-all duration-300 group"
                >
                  <Github className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </motion.a>

                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-4 rounded-xl glass-button hover:neon-glow-cyan transition-all duration-300 group"
                >
                  <Linkedin className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </motion.a>

                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-4 rounded-xl glass-button hover:neon-glow-cyan transition-all duration-300 group"
                >
                  <Twitter className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </motion.a>

                <motion.a
                  href="mailto:hello@example.com"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="p-4 rounded-xl glass-button hover:neon-glow-pink transition-all duration-300 group"
                >
                  <Mail className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </div>
  );
}
