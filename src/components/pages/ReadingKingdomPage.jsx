import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DifficultySelector from '@/components/molecules/DifficultySelector'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getReadingLevels } from '@/services/api/readingService'

const ReadingKingdomPage = () => {
  const navigate = useNavigate()
  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadLevels = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await getReadingLevels()
      setLevels(data)
    } catch (err) {
      setError('Failed to load reading levels. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadLevels()
  }, [])
  
  const handleLevelSelect = (level) => {
    navigate(`/activity/reading/${level.id}`)
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
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-full flex items-center justify-center shadow-magical"
          >
            <ApperIcon name="BookOpen" className="w-12 h-12 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span style={{ background: 'linear-gradient(135deg, #FF6B6B, #feb2b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Reading Kingdom
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock the power of words and stories! Journey through exciting tales and become a reading champion.
        </p>
      </motion.div>
      
      {/* Fun Fact Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Card variant="reading" className="p-6 text-center">
          <ApperIcon name="Sparkles" className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Reading Magic!</h3>
          <p className="text-gray-600">
            Reading for just 20 minutes a day exposes you to 1.8 million words per year!
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
          Choose Your Story Level
        </h2>
        
        <DifficultySelector
          levels={levels}
          onSelect={handleLevelSelect}
          variant="secondary"
        />
      </motion.div>
      
      {/* Floating Book Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['📖', '📚', '✨', '🏰', '👑'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${15 + i * 18}%`,
              top: `${25 + (i % 2) * 45}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ReadingKingdomPage