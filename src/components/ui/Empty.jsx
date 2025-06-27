import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "Nothing Here Yet!", 
  description = "It looks like there's nothing to show right now. Why not start your adventure?",
  actionText = "Get Started",
  onAction,
  icon = "Package"
}) => {
  return (
    <div className="min-h-96 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6"
          >
            <ApperIcon name={icon} className="w-12 h-12 text-gray-500" />
          </motion.div>
          
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-3">
            {title}
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>
          
          {onAction && (
            <Button
              variant="primary"
              size="lg"
              onClick={onAction}
              className="min-w-48"
            >
              <ApperIcon name="Sparkles" className="w-5 h-5 mr-2" />
              {actionText}
            </Button>
          )}
          
          {/* Floating encouraging elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${35 + (i % 2) * 30}%`
                }}
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 15, -15, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              >
                {['✨', '🌟', '🎯', '🚀', '💎'][i]}
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Empty