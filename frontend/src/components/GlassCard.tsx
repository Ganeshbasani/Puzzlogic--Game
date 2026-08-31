import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  elevated?: boolean;
  gradient?: boolean;
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GlassCard = ({ elevated, gradient, hoverable = true, children, className, ...props }: GlassCardProps) => (
  <motion.div
    className={cn(
      elevated ? "glass-card-elevated" : "glass-card",
      gradient && "gradient-border",
      "perspective-800 transform-3d",
      "p-5",
      className,
    )}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={
      hoverable
        ? {
            y: -3,
            rotateX: 1.5,
            rotateY: -1,
            transition: { duration: 0.2, ease: "easeOut" },
          }
        : undefined
    }
    style={{ willChange: "transform" }}
    {...props}
  >
    {children}
  </motion.div>
);

export default GlassCard;
