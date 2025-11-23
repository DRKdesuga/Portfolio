import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    subtitle: string;
    image: string;
    description: string[];
    stack: {
      category: string;
      items: string[];
    }[];
    tags: string[];
    demoUrl?: string;
    repoUrl?: string;
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
                className="absolute top-6 right-6 p-2 rounded-full glass-button hover:bg-white/10 transition-all duration-300 group"
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

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-white/90 mb-4">Tech Stack Used</h3>
                <div className="space-y-3">
                  {project.stack.map((category, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2">
                      <span className="text-purple-300/90 min-w-[120px]">
                        {category.category}:
                      </span>
                      <span className="text-white/70">
                        {category.items.join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

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
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 text-white/90 hover:text-white neon-glow-pink"
                  >
                    View Repository
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
