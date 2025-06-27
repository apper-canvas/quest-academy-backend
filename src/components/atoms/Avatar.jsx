import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ 
  character = 'wizard',
  size = 'md',
  className = '',
  animated = false,
  emotion = 'happy',
  ...props 
}) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }
  
  const emotions = {
    happy: 'text-yellow-500',
    excited: 'text-green-500',
    thinking: 'text-blue-500',
    sad: 'text-gray-500'
  }
  
  const characters = {
    wizard: 'Sparkles',
    knight: 'Shield',
    princess: 'Crown',
    dragon: 'Flame'
  }
  
  const Component = animated ? motion.div : 'div'
  const animationProps = animated ? {
    animate: { 
      y: [0, -5, 0],
      rotate: [0, 2, -2, 0]
    },
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {}
  
  return (
    <Component
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-white to-primary-100 shadow-magical flex items-center justify-center border-4 border-primary-200 ${className}`}
      {...animationProps}
      {...props}
    >
      <ApperIcon 
        name={characters[character]} 
        className={`${emotions[emotion]} ${size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-12 h-12' : size === 'xl' ? 'w-16 h-16' : 'w-8 h-8'}`}
      />
    </Component>
  )
}

export default Avatar