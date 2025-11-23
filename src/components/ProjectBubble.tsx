import { motion } from 'motion/react';
import { useState } from 'react';

interface ProjectBubbleProps {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  onClick: () => void;
  index: number;
}

export default function ProjectBubble({
  title,
  subtitle,
  image,
  tags,
  onClick,
  index,
}: ProjectBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="glass-card rounded-3xl overflow-hidden cursor-pointer group relative"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Animated neon border glow on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, #5227FF, #FF9FFC, #B19EEF)',
            filter: 'blur(20px)',
            opacity: 0.4,
            zIndex: -1,
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white/95 mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/60 text-sm mb-4">
          {subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70 group-hover:bg-white/10 group-hover:border-purple-400/30 transition-all duration-300 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.15 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent pointer-events-none"
      />
    </motion.div>
  );
}
