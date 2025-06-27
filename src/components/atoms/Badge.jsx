import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  animate = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold rounded-full"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-400 text-white",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-400 text-white",
    accent: "bg-gradient-to-r from-accent-500 to-accent-400 text-white",
    success: "bg-gradient-to-r from-green-500 to-green-400 text-white",
    warning: "bg-gradient-to-r from-yellow-500 to-yellow-400 text-white",
    gold: "bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-800 shadow-lg"
  }
  
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2"
  }
  
  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {}
  
  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Badge