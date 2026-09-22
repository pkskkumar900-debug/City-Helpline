import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface LiquidGlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
  overflowVisible?: boolean;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className,
  glowColor = 'rgba(0, 229, 255, 0.25)',
  interactive = true,
  overflowVisible = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50 });
      }}
      className={cn(
        'relative rounded-[32px] transition-all duration-700 select-none',
        overflowVisible ? 'overflow-visible' : 'overflow-hidden',
        'backdrop-blur-3xl bg-[rgba(15,23,42,0.65)]',
        'border border-white/20',
        className
      )}
      style={{
        boxShadow: `
          0 25px 50px -12px rgba(0, 0, 0, 0.75),
          0 0 35px -5px ${isHovered ? glowColor : 'rgba(0, 229, 255, 0.12)'},
          inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45),
          inset 0 -1.5px 1px 0 rgba(255, 255, 255, 0.06),
          inset 0 0 30px rgba(255, 255, 255, 0.04)
        `,
      }}
      {...props}
    >
      {/* 1. Underlying Liquid Caustics Container (Strictly clipped to border radius) */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none z-0">
        {/* Primary Liquid Orb */}
        <motion.div
          className="absolute w-[450px] h-[350px] rounded-full blur-[90px] opacity-40 mix-blend-screen pointer-events-none"
          animate={{
            x: isHovered ? `${(mousePos.x - 50) * 0.4}px` : [0, 40, -30, 0],
            y: isHovered ? `${(mousePos.y - 50) * 0.4}px` : [0, -30, 40, 0],
            scale: isHovered ? 1.15 : [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: isHovered ? 0.3 : 10,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, #00E5FF 0%, #3B82F6 50%, transparent 75%)',
            top: '-15%',
            right: '-10%',
          }}
        />

        {/* Secondary Deep Violet Liquid Orb */}
        <motion.div
          className="absolute w-[400px] h-[350px] rounded-full blur-[80px] opacity-35 mix-blend-screen pointer-events-none"
          animate={{
            x: isHovered ? `${(50 - mousePos.x) * 0.3}px` : [0, -40, 30, 0],
            y: isHovered ? `${(50 - mousePos.y) * 0.3}px` : [0, 35, -25, 0],
            scale: isHovered ? 1.1 : [1, 0.9, 1.08, 1],
          }}
          transition={{
            duration: isHovered ? 0.3 : 12,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, #8A2BE2 0%, #4F46E5 50%, transparent 75%)',
            bottom: '-15%',
            left: '-10%',
          }}
        />

        {/* Ambient Subtle Amber Prismatic Core */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38bdf8 0%, #ec4899 60%, transparent 80%)' }}
        />

        {/* Water Liquid Wave Texture Effect */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* 2. Interactive Dynamic Mouse Glass Refraction Spotlight */}
        {interactive && (
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0.4,
              background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.12), rgba(0, 229, 255, 0.05) 30%, transparent 60%)`,
            }}
          />
        )}

        {/* 3. Real Glass Top Specular Glare */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-20 opacity-70 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-[1.5px] inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent z-20 opacity-50 blur-[0.5px] pointer-events-none" />

        {/* 4. Left and Right Prismatic Edge Shimmers */}
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-white/30 via-cyan-400/20 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-white/30 via-purple-400/20 to-transparent z-20 pointer-events-none" />

        {/* 5. Liquid Glass Curved Glare Sweep */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-10"
          style={{
            transform: isHovered ? 'translateY(-2%)' : 'translateY(0%)',
            transition: 'transform 0.8s ease-out',
          }}
        />
      </div>

      {/* 6. Content Container */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </motion.div>
  );
};
