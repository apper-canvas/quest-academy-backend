import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-magical hover:shadow-float hover:from-primary-600 hover:to-primary-500",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-400 text-white shadow-magical hover:shadow-float hover:from-secondary-600 hover:to-secondary-500",
    accent: "bg-gradient-to-r from-accent-500 to-accent-400 text-white shadow-magical hover:shadow-float hover:from-accent-600 hover:to-accent-500",
    outline: "border-2 border-primary-500 text-primary-500 bg-white/90 backdrop-blur-sm hover:bg-primary-500 hover:text-white shadow-lg",
    ghost: "text-primary-600 hover:bg-primary-100 shadow-none hover:shadow-lg"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button