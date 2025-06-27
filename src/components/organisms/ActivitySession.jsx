import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ProblemCard from '@/components/molecules/ProblemCard'
import RewardModal from '@/components/molecules/RewardModal'
import ProgressBar from '@/components/atoms/ProgressBar'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import { useUserProgress } from '@/hooks/useUserProgress'

const ActivitySession = ({ problems, subject, difficulty }) => {
  const navigate = useNavigate()
  const { updateProgress } = useUserProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [currentReward, setCurrentReward] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [avatarEmotion, setAvatarEmotion] = useState('happy')
  
  const currentProblem = problems[currentIndex]
  const isLastProblem = currentIndex === problems.length - 1
  const progress = ((currentIndex + 1) / problems.length) * 100
  
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }
  
  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return
    
    const correct = selectedAnswer === currentProblem.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      const points = currentProblem.points
      setSessionScore(prev => prev + points)
      setAvatarEmotion('excited')
      setCurrentReward({ points, badge: sessionScore === 0 ? 'First Success!' : null })
      toast.success(`Correct! +${points} points`, {
        position: "top-center",
        autoClose: 2000
      })
    } else {
      setAvatarEmotion('sad')
      toast.error("Not quite right. Try again!", {
        position: "top-center",
        autoClose: 2000
      })
    }
    
    setTimeout(() => {
      if (correct) {
        setShowReward(true)
      } else {
        handleNextProblem()
      }
    }, 1000)
  }
  
  const handleNextProblem = () => {
    setShowResult(false)
    setSelectedAnswer('')
    setAvatarEmotion('happy')
    
    if (isLastProblem) {
      // Session complete
      updateProgress({
        subject,
        difficulty,
        points: sessionScore,
        completed: true
      })
      
      toast.success(`Session complete! Total: ${sessionScore} points`, {
        position: "top-center",
        autoClose: 3000
      })
      
      setTimeout(() => {
        navigate(subject === 'math' ? '/math' : '/reading')
      }, 2000)
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }
  
  const handleCloseReward = () => {
    setShowReward(false)
    setCurrentReward(null)
    handleNextProblem()
  }
  
  const handleQuit = () => {
    if (sessionScore > 0) {
      updateProgress({
        subject,
        difficulty,
        points: sessionScore,
        completed: false
      })
    }
    navigate(subject === 'math' ? '/math' : '/reading')
  }
  
  if (!currentProblem) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No problems available</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-magical p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar character="wizard" emotion={avatarEmotion} animated />
            <div>
              <h2 className="text-xl font-display font-bold text-gray-800">
                {subject === 'math' ? 'Math Quest' : 'Reading Adventure'}
              </h2>
              <p className="text-gray-600">
                Problem {currentIndex + 1} of {problems.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Session Score</p>
              <p className="text-2xl font-bold text-primary-600">{sessionScore}</p>
            </div>
            <Button variant="ghost" onClick={handleQuit}>
              <ApperIcon name="X" className="w-4 h-4 mr-2" />
              Quit
            </Button>
          </div>
        </div>
        
        <ProgressBar value={progress} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* Problem */}
      <ProblemCard
        problem={currentProblem}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        showResult={showResult}
        className="mb-8"
      />
      
      {/* Action Button */}
      {!showResult && (
        <div className="text-center">
          <Button
            variant="primary"
            size="xl"
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="min-w-48"
          >
            Submit Answer
            <ApperIcon name="Send" className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
      
      {/* Reward Modal */}
      <RewardModal
        isOpen={showReward}
        onClose={handleCloseReward}
        reward={currentReward}
        isCorrect={isCorrect}
      />
    </div>
  )
}

export default ActivitySession