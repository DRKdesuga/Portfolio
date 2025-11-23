import { useState } from 'react';
import { ChevronDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import LiquidEther from './components/LiquidEther';
import SplitText from './components/SplitText';
import ProjectBubble from './components/ProjectBubble';
import ProjectModal from './components/ProjectModal';

// Mock project data
const projects = [
  {
    title: 'Analytics Dashboard',
    subtitle: 'Real-time data visualization platform',
    image: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjM3OTMxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: [
      'A comprehensive analytics dashboard that provides real-time insights into business metrics and KPIs. Built with a focus on performance and user experience.',
      'Features include interactive charts, customizable widgets, and advanced filtering capabilities. The platform handles millions of data points efficiently.',
      'Designed to help teams make data-driven decisions with confidence through clear visualizations and actionable insights.'
    ],
    tags: ['Analytics', 'Real-time', 'Dashboard'],
    stack: [
      { category: 'Frontend', items: ['Angular 17', 'Tailwind CSS', 'Chart.js'] },
      { category: 'Backend', items: ['Spring Boot 3', 'Java 21', 'Redis'] },
      { category: 'Database', items: ['PostgreSQL', 'TimescaleDB'] },
      { category: 'DevOps', items: ['Docker', 'Kubernetes', 'GitLab CI'] }
    ],
    demoUrl: '#demo',
    repoUrl: '#repo'
  },
  {
    title: 'E-Commerce Platform',
    subtitle: 'Modern shopping experience',
    image: 'https://images.unsplash.com/photo-1727407209320-1fa6ae60ee05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjM3ODgxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: [
      'A full-featured e-commerce platform that delivers a seamless shopping experience across all devices. Built with scalability and performance in mind.',
      'Includes advanced product search, personalized recommendations, secure payment processing, and order tracking. Supports multiple payment gateways and shipping providers.',
      'The admin panel provides comprehensive tools for inventory management, order processing, and customer analytics.'
    ],
    tags: ['E-Commerce', 'Payment', 'Mobile'],
    stack: [
      { category: 'Frontend', items: ['React 18', 'Next.js 14', 'TypeScript'] },
      { category: 'Backend', items: ['Node.js', 'Express', 'Stripe API'] },
      { category: 'Database', items: ['MongoDB', 'Redis Cache'] },
      { category: 'DevOps', items: ['Vercel', 'AWS S3', 'GitHub Actions'] }
    ],
    demoUrl: '#demo',
    repoUrl: '#repo'
  },
  {
    title: 'Mobile Fitness App',
    subtitle: 'Track workouts and progress',
    image: 'https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzNzk2ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: [
      'A mobile-first fitness application that helps users track their workouts, set goals, and monitor progress over time. Features an intuitive interface designed for quick logging.',
      'Includes workout plans, exercise library with video demonstrations, progress charts, and social features to connect with other fitness enthusiasts.',
      'Integrates with popular wearables and health apps to provide a comprehensive view of your fitness journey.'
    ],
    tags: ['Mobile', 'Health', 'PWA'],
    stack: [
      { category: 'Frontend', items: ['React Native', 'Expo', 'Native Base'] },
      { category: 'Backend', items: ['Firebase', 'Cloud Functions'] },
      { category: 'Database', items: ['Firestore', 'Cloud Storage'] },
      { category: 'APIs', items: ['HealthKit', 'Google Fit'] }
    ],
    demoUrl: '#demo',
    repoUrl: '#repo'
  },
  {
    title: 'Web Dashboard Suite',
    subtitle: 'Enterprise management system',
    image: 'https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYzODExODYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: [
      'An enterprise-grade dashboard suite that centralizes business operations and provides actionable insights. Built for scalability and ease of use.',
      'Features include role-based access control, customizable dashboards, automated reporting, and integration with popular business tools.',
      'Designed to streamline workflows and improve team collaboration across departments.'
    ],
    tags: ['Enterprise', 'SaaS', 'B2B'],
    stack: [
      { category: 'Frontend', items: ['Vue 3', 'Vuetify', 'Pinia'] },
      { category: 'Backend', items: ['Django', 'Python 3.11', 'Celery'] },
      { category: 'Database', items: ['PostgreSQL', 'ElasticSearch'] },
      { category: 'DevOps', items: ['Docker Compose', 'Nginx', 'Jenkins'] }
    ],
    demoUrl: '#demo',
    repoUrl: '#repo'
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
                  src="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM4MzE0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
                  Full-Stack Developer & UI/UX Designer
                </p>
                <p className="text-white/70 max-w-2xl">
                  Passionate about creating beautiful, performant web applications. 
                  Specializing in React, TypeScript, and modern backend technologies. 
                  Always learning and exploring new ways to solve complex problems.
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
