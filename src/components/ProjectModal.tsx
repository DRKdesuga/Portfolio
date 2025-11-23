import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    slug?: string;
    title: string;
    subtitle: string;
    image: string;
    description: string[];
    tech: string[];
    tags: string[];
    demoUrl?: string;
    links?: { label: string; url: string }[];
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto glass-card rounded-3xl p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-10 p-2 rounded-full glass-button bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <X className="w-6 h-6 text-white/70 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              </button>

              {/* Image */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6 relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-white/95 mb-2">{project.title}</h2>
                <p className="text-purple-300/80">{project.subtitle}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="mb-8 space-y-4">
                {project.description.map((paragraph, index) => (
                  <p key={index} className="text-white/70 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tech highlights */}
              {project.tech.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-purple-300 mb-4">Tech Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside marker:text-purple-400 text-white/80">
                    {project.tech.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 text-white/90 hover:text-white neon-glow-purple"
                  >
                    See Live Demo
                  </a>
                )}
                {project.links?.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 text-white/90 hover:text-white neon-glow-pink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
