
import * as React from "react";
import { cn } from "@/lib/utils";

interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  type?: "fade" | "slide-up" | "slide-down" | "scale" | "none";
  duration?: "fast" | "normal" | "slow";
  delay?: "none" | "short" | "medium" | "long";
  children: React.ReactNode;
}

export const Transition = ({
  show = true,
  type = "fade",
  duration = "normal",
  delay = "none",
  className,
  children,
  ...props
}: TransitionProps) => {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Don't render anything if not showing and mounted
  if (!show && mounted) return null;

  // Get animation classes
  const getAnimationClass = () => {
    if (!mounted) return "";
    
    // Base transition class
    let baseClass = "transition-all ";
    
    // Duration class
    switch (duration) {
      case "fast":
        baseClass += "duration-200 ";
        break;
      case "slow":
        baseClass += "duration-500 ";
        break;
      default:
        baseClass += "duration-300 ";
    }
    
    // Delay class
    switch (delay) {
      case "short":
        baseClass += "delay-100 ";
        break;
      case "medium":
        baseClass += "delay-200 ";
        break;
      case "long":
        baseClass += "delay-300 ";
        break;
    }
    
    // Animation type
    switch (type) {
      case "fade":
        baseClass += show ? "animate-fade-in" : "animate-fade-out";
        break;
      case "slide-up":
        baseClass += show ? "animate-slide-up" : "opacity-0 translate-y-4";
        break;
      case "slide-down":
        baseClass += show ? "animate-slide-down" : "opacity-0 -translate-y-4";
        break;
      case "scale":
        baseClass += show ? "animate-scale-in" : "animate-scale-out";
        break;
      case "none":
      default:
        // No animation classes
        break;
    }
    
    return baseClass;
  };

  return (
    <div className={cn(getAnimationClass(), className)} {...props}>
      {children}
    </div>
  );
};

// Stagger helper component for staggered animations
interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement[];
  staggerMs?: number;
  type?: "fade" | "slide-up" | "slide-down" | "scale" | "none";
}

export const Stagger = ({
  children,
  staggerMs = 100,
  type = "fade",
  className,
  ...props
}: StaggerProps) => {
  return (
    <div className={cn("", className)} {...props}>
      {React.Children.map(children, (child, index) => {
        // Clone the child and add delayed animation props
        return React.cloneElement(child, {
          className: cn(
            child.props.className,
            type === "fade" ? "animate-fade-in" : 
            type === "slide-up" ? "animate-slide-up" : 
            type === "slide-down" ? "animate-slide-down" : 
            type === "scale" ? "animate-scale-in" : "",
            `delay-[${index * staggerMs}ms]`
          ),
          style: {
            ...child.props.style,
            animationDelay: `${index * staggerMs}ms`,
          },
        });
      })}
    </div>
  );
};
