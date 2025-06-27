import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DifficultySelector from '@/components/molecules/DifficultySelector'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getMathLevels } from '@/services/api/mathService'

const MathWorldPage = () => {
  const navigate = useNavigate()
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadLevels = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await getMathLevels()
      setLevels(data)
    } catch (err) {
      setError('Failed to load math levels. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadLevels()
  }, [])
  
  const handleLevelSelect = (level) => {
    navigate(`/activity/math/${level.id}`)
  }
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadLevels} />
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center shadow-magical"
          >
            <ApperIcon name="Calculator" className="w-12 h-12 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
          Math World
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master the magical art of numbers! Choose your difficulty level and start your mathematical adventure.
        </p>
      </motion.div>
      
      {/* Fun Fact Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Card variant="math" className="p-6 text-center">
          <ApperIcon name="Lightbulb" className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Did You Know?</h3>
          <p className="text-gray-600">
            The word "mathematics" comes from the Greek word "mathema" which means "knowledge" or "learning"!
          </p>
        </Card>
      </motion.div>
      
      {/* Difficulty Levels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-display font-bold text-center text-gray-800 mb-8">
          Choose Your Challenge
        </h2>
        
        <DifficultySelector
          levels={levels}
          onSelect={handleLevelSelect}
          variant="primary"
        />
      </motion.div>
      
      {/* Floating Math Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['+', '−', '×', '÷', '='].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl font-bold text-primary-300 opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.7
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MathWorldPage