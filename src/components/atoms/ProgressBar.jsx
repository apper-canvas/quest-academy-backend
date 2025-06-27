import { motion } from 'framer-motion'

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className = '',
  variant = 'primary',
  showLabel = false,
  animated = true,
  ...props 
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const variants = {
    primary: "from-primary-500 to-primary-400",
    secondary: "from-secondary-500 to-secondary-400",
    accent: "from-accent-500 to-accent-400",
    success: "from-green-500 to-green-400"
  }
  
  return (
    <div className={`relative ${className}`} {...props}>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className={`h-full bg-gradient-to-r ${variants[variant]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.8 : 0, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 2 
            }}
          />
        </motion.div>
      </div>
      {showLabel && (
        <div className="flex justify-between text-sm font-medium text-gray-600 mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar