import { motion } from 'framer-motion'
import SubjectCard from '@/components/molecules/SubjectCard'
import { useUserProgress } from '@/hooks/useUserProgress'

const HomePage = () => {
  const { progress } = useUserProgress()
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-display font-bold text-gradient mb-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Welcome to Quest Academy!
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Embark on magical learning adventures! Choose your quest and unlock new skills while having fun.
        </p>
      </motion.div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      {/* Subject Cards */}
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        <SubjectCard
          title="Math World"
          description="Solve exciting math problems and unlock magical number powers!"
          icon="Calculator"
          route="/math"
          variant="primary"
          progress={progress.mathLevel * 20}
        />
        
        <SubjectCard
          title="Reading Kingdom"
          description="Discover amazing stories and become a master of words!"
          icon="BookOpen"
          route="/reading"
          variant="secondary"
          progress={progress.readingLevel * 20}
        />
      </div>
      
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-magical p-8"
      >
        <h2 className="text-2xl font-display font-bold text-center text-gray-800 mb-8">
          Your Adventure Stats
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-primary-600 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress.totalPoints.toLocaleString()}
            </motion.div>
            <p className="text-gray-600 font-medium">Total Points</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-secondary-600 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {progress.completedLessons.length}
            </motion.div>
            <p className="text-gray-600 font-medium">Lessons Done</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-accent-600 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {progress.badges.length}
            </motion.div>
            <p className="text-gray-600 font-medium">Badges Earned</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-green-600 mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              {progress.currentStreak}
            </motion.div>
            <p className="text-gray-600 font-medium">Day Streak</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage