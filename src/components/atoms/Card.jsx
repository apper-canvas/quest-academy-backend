import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hoverable = false,
  onClick,
  ...props 
}) => {
  const baseClasses = "rounded-2xl bg-white/95 backdrop-blur-sm border border-white/20"
  
  const variants = {
    default: "shadow-magical",
    elevated: "shadow-float",
    math: "border-primary-200 bg-gradient-to-br from-white to-primary-50/50",
    reading: "border-secondary-200 bg-gradient-to-br from-white to-secondary-50/50",
    character: "bg-gradient-to-br from-white to-accent-50/50 border-accent-200"
  }
  
  const hoverClasses = hoverable ? "cursor-pointer hover:scale-105 hover:shadow-float transition-all duration-200" : ""
  
  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, y: -2 } : {}}
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card