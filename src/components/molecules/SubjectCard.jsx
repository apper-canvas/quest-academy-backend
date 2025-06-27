import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const SubjectCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  variant = 'primary',
  progress = 0,
  className = ''
}) => {
  const navigate = useNavigate()
  
  const variants = {
    primary: 'math',
    secondary: 'reading'
  }
  
  const iconColors = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600'
  }
  
  const buttonVariants = {
    primary: 'primary',
    secondary: 'secondary'
  }
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card variant={variants[variant]} className="p-8 text-center h-full">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-white to-${variant === 'primary' ? 'primary' : 'secondary'}-100 shadow-magical flex items-center justify-center`}>
            <ApperIcon name={icon} className={`w-10 h-10 ${iconColors[variant]}`} />
          </div>
        </motion.div>
        
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        {progress > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm font-bold text-gray-800">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 bg-gradient-to-r ${variant === 'primary' ? 'from-primary-500 to-primary-400' : 'from-secondary-500 to-secondary-400'} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        )}
        
        <Button
          variant={buttonVariants[variant]}
          size="lg"
          onClick={() => navigate(route)}
          className="w-full"
        >
          Start Adventure
          <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
        </Button>
      </Card>
    </motion.div>
  )
}

export default SubjectCard