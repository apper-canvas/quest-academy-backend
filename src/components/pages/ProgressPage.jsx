import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ProgressBar from '@/components/atoms/ProgressBar'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { useUserProgress } from '@/hooks/useUserProgress'
import { getProgressStats } from '@/services/api/progressService'

const ProgressPage = () => {
  const { progress } = useUserProgress()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  
  const loadStats = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await getProgressStats()
      setStats(data)
    } catch (err) {
      setError('Failed to load progress data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadStats()
  }, [])
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadStats} />
  
  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'all', label: 'All Time' }
  ]
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-400 rounded-full flex items-center justify-center shadow-magical"
          >
            <ApperIcon name="TrendingUp" className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
          Your Progress
        </h1>
        <p className="text-xl text-gray-600">
          Track your learning journey and celebrate your achievements!
        </p>
      </motion.div>
      
      {/* Period Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedPeriod === period.key
                  ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Star" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{progress.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{progress.completedLessons.length}</div>
            <div className="text-sm text-gray-600">Lessons Done</div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Award" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{progress.badges.length}</div>
            <div className="text-sm text-gray-600">Badges</div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Flame" className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{progress.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-display font-bold text-gray-800 mb-6">Subject Progress</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Calculator" className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-gray-700">Math World</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">Level {progress.mathLevel}</span>
                </div>
                <ProgressBar 
                  value={progress.mathLevel * 20} 
                  max={100} 
                  variant="primary"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="BookOpen" className="w-5 h-5 text-secondary-600" />
                    <span className="font-medium text-gray-700">Reading Kingdom</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">Level {progress.readingLevel}</span>
                </div>
                <ProgressBar 
                  value={progress.readingLevel * 20} 
                  max={100} 
                  variant="secondary"
                />
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Recent Badges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-display font-bold text-gray-800 mb-6">Recent Achievements</h3>
            
            <div className="space-y-4">
              {progress.badges.length > 0 ? (
                progress.badges.slice(-5).map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                      <ApperIcon name="Award" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{badge}</div>
                      <div className="text-sm text-gray-600">Achievement unlocked!</div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <ApperIcon name="Trophy" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No badges earned yet!</p>
                  <p className="text-sm text-gray-500">Complete lessons to earn your first badge.</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Card className="p-6">
          <h3 className="text-xl font-display font-bold text-gray-800 mb-6">Weekly Activity</h3>
          
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const activity = stats?.weeklyActivity?.[index] || 0
              const maxActivity = Math.max(...(stats?.weeklyActivity || [1]))
              const height = Math.max((activity / maxActivity) * 100, 10)
              
              return (
                <div key={day} className="text-center">
                  <div className="mb-2">
                    <motion.div
                      className="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg mx-auto"
                      style={{ width: '24px', height: `${height}px` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}px` }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-600">{day}</div>
                  <div className="text-xs text-gray-500">{activity}</div>
                </div>
              )
            })}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProgressPage