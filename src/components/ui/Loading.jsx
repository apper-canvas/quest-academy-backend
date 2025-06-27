import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center shadow-magical mx-auto mb-6"
        >
          <ApperIcon name="Sparkles" className="w-10 h-10 text-white" />
        </motion.div>
        
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl font-display font-bold text-gradient mb-2"
        >
          Loading Your Adventure...
        </motion.h2>
        
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-primary-500 rounded-full"
            />
          ))}
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 text-primary-300"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <ApperIcon name={i % 2 === 0 ? "Star" : "Sparkles"} className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading