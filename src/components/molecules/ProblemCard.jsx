import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'

const ProblemCard = ({ 
  problem, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult = false,
  className = ''
}) => {
  if (!problem) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">
            {problem.question}
          </h2>
          {problem.story && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {problem.story}
            </p>
          )}
        </div>
        
        <div className="grid gap-4 max-w-lg mx-auto">
          {problem.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isCorrect = showResult && option === problem.correctAnswer
            const isWrong = showResult && isSelected && option !== problem.correctAnswer
            
            let variant = 'outline'
            if (showResult) {
              if (isCorrect) variant = 'accent'
              else if (isWrong) variant = 'secondary'
            } else if (isSelected) {
              variant = 'primary'
            }
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <Button
                  variant={variant}
                  size="lg"
                  className="w-full text-left justify-start"
                  onClick={() => !showResult && onAnswerSelect(option)}
                  disabled={showResult}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}

export default ProblemCard