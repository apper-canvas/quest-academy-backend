import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const DifficultySelector = ({ 
  levels, 
  onSelect, 
  variant = 'primary',
  className = ''
}) => {
  const variants = {
    primary: 'math',
    secondary: 'reading'
  }
  
  const buttonVariants = {
    primary: 'primary',
    secondary: 'secondary'
  }
  
  return (
    <div className={`grid gap-6 ${className}`}>
      {levels.map((level, index) => (
        <motion.div
          key={level.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card variant={variants[variant]} hoverable className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${variant === 'primary' ? 'from-primary-500 to-primary-400' : 'from-secondary-500 to-secondary-400'} flex items-center justify-center shadow-lg`}>
                  <ApperIcon name={level.icon} className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{level.name}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {level.unlocked ? (
                  <>
                    {level.completed && (
                      <Badge variant="success" size="sm">
                        <ApperIcon name="Check" className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                    <Button
                      variant={buttonVariants[variant]}
                      onClick={() => onSelect(level)}
                    >
                      {level.completed ? 'Play Again' : 'Start'}
                      <ApperIcon name="Play" className="w-4 h-4 ml-2" />
                    </Button>
                  </>
                ) : (
                  <Badge variant="warning" size="sm">
                    <ApperIcon name="Lock" className="w-3 h-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default DifficultySelector