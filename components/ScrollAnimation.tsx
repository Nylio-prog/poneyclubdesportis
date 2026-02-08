'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in';
}

/**
 * ScrollAnimation component that respects prefers-reduced-motion
 * Provides subtle entrance animations for content sections
 */
export default function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  variant = 'fade-in',
}: ScrollAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const variants = {
    'fade-in': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    'slide-down': {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    'scale-in': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  // If user prefers reduced motion, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.3,
        delay,
        ease: 'easeOut',
      }}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
