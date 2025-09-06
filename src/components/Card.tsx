import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ 
  children, 
  className, 
  hover = true,
  glass = true,
  ...props 
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border transition-all duration-300",
        glass ? "glass-card" : "bg-card border-border",
        hover && "hover-lift cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}