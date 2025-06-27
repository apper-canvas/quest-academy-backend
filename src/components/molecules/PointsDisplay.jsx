import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const PointsDisplay = ({ 
  points = 0, 
  animated = false,
  size = 'md',
  className = ''
}) => {
  const [displayPoints, setDisplayPoints] = useState(points)
  
  useEffect(() => {
    if (animated && points !== displayPoints) {
      const duration = 1000
      const steps = 30
      const increment = (points - displayPoints) / steps
      let currentStep = 0
      
      const timer = setInterval(() => {
        currentStep++
        if (currentStep === steps) {
          setDisplayPoints(points)
          clearInterval(timer)
        } else {
          setDisplayPoints(prev => Math.round(prev + increment))
        }
      }, duration / steps)
      
      return () => clearInterval(timer)
    } else {
      setDisplayPoints(points)
    }
  }, [points, animated, displayPoints])
  
  const sizes = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3'
  }
  
  return (
    <motion.div
      animate={animated && points > displayPoints ? { scale: [1, 1.2, 1] } : {}}
      className={`inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-800 font-bold rounded-full shadow-lg ${sizes[size]} ${className}`}
    >
      <ApperIcon name="Star" className="w-4 h-4 mr-2 fill-current" />
      {displayPoints.toLocaleString()}
    </motion.div>
  )
}

export default PointsDisplay