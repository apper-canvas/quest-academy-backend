import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const RewardModal = ({ 
  isOpen, 
  onClose, 
  reward,
  isCorrect = true
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card className="p-8 text-center max-w-md relative overflow-hidden">
              {/* Star burst animation */}
              {isCorrect && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 text-yellow-400"
                      style={{
                        top: '50%',
                        left: '50%',
                        rotate: i * 60
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        y: [-20, -60, -20],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <ApperIcon name="Sparkles" className="w-full h-full" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="mb-6"
              >
                <div className={`w-20 h-20 mx-auto rounded-full ${isCorrect ? 'bg-gradient-to-br from-green-400 to-green-500' : 'bg-gradient-to-br from-red-400 to-red-500'} flex items-center justify-center shadow-magical`}>
                  <ApperIcon 
                    name={isCorrect ? "Trophy" : "X"} 
                    className="w-10 h-10 text-white" 
                  />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                {isCorrect ? "Excellent!" : "Keep Trying!"}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {isCorrect ? "You earned some rewards!" : "Don't give up, you'll get it next time!"}
              </p>
              
              {isCorrect && reward && (
                <div className="space-y-4 mb-6">
                  {reward.points && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Badge variant="gold" size="lg" animate>
                        <ApperIcon name="Star" className="w-4 h-4 mr-2 fill-current" />
                        +{reward.points} Points
                      </Badge>
                    </motion.div>
                  )}
                  
                  {reward.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Badge variant="primary" size="lg" animate>
                        <ApperIcon name="Award" className="w-4 h-4 mr-2" />
                        New Badge: {reward.badge}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              )}
              
              <Button
                variant="primary"
                onClick={onClose}
                className="w-full"
              >
                Continue
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RewardModal