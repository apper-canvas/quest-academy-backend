import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-magical mx-auto mb-6"
          >
            <ApperIcon name="AlertTriangle" className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-3">
            Oops! Something Went Wrong
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>
          
          {showRetry && onRetry && (
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={onRetry}
                className="w-full"
              >
                <ApperIcon name="RefreshCw" className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                <ApperIcon name="Home" className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          )}
          
          {/* Floating sad elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-20"
                style={{
                  left: `${25 + i * 20}%`,
                  top: `${40 + (i % 2) * 30}%`
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                {['😔', '💔', '⚠️', '🔧'][i]}
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Error