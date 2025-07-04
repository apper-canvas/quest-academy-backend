import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { useUserProgress } from "@/hooks/useUserProgress";
import ApperIcon from "@/components/ApperIcon";
import ProblemCard from "@/components/molecules/ProblemCard";
import RewardModal from "@/components/molecules/RewardModal";
import ProgressBar from "@/components/atoms/ProgressBar";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
const ActivitySession = ({ problems, subject, difficulty, isGame = false, gameData = null }) => {
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
  
// Game-specific state
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  
  // Challenge-specific state
  const [challengeMode, setChallengeMode] = useState(false)
  const [challengeStartTime, setChallengeStartTime] = useState(null)
  const [challengeEndTime, setChallengeEndTime] = useState(null)
  const [questionStartTime, setQuestionStartTime] = useState(null)
  const [responseTimes, setResponseTimes] = useState([])
const currentProblem = problems[currentIndex]
  const isLastProblem = currentIndex === problems.length - 1
  const progress = isGame && gameData?.timeLimit 
    ? ((gameData.timeLimit - (timeRemaining || 0)) / gameData.timeLimit) * 100
    : ((currentIndex + 1) / problems.length) * 100
  
// Initialize challenge mode
  useEffect(() => {
    if (gameData?.challengeType) {
      setChallengeMode(true)
    }
  }, [gameData])
  
  // Game timer effect (enhanced for challenges)
  useEffect(() => {
    if ((isGame || challengeMode) && gameData?.timeLimit && gameStarted && timeRemaining > 0 && !gameComplete) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameComplete(true)
            setChallengeEndTime(new Date())
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [isGame, challengeMode, gameData, gameStarted, timeRemaining, gameComplete])
  
  // Initialize game/challenge timer
  useEffect(() => {
    if ((isGame || challengeMode) && gameData?.timeLimit && !gameStarted) {
      setTimeRemaining(gameData.timeLimit)
    }
  }, [isGame, challengeMode, gameData])
  
  // Handle game/challenge completion
  useEffect(() => {
    if (gameComplete && (isGame || challengeMode)) {
      if (challengeMode) {
        handleChallengeComplete()
      } else {
        handleGameComplete()
      }
    }
  }, [gameComplete, isGame, challengeMode])
  
  // Start question timing for challenges
  useEffect(() => {
    if (challengeMode && !showResult) {
      setQuestionStartTime(new Date())
    }
  }, [currentIndex, challengeMode, showResult])
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }
  
const handleSubmitAnswer = () => {
    if (!selectedAnswer) return
    
    // Calculate response time for challenges
    const responseTime = challengeMode && questionStartTime 
      ? (new Date() - questionStartTime) / 1000 
      : 0
    
    // Start game/challenge timer on first answer
    if ((isGame || challengeMode) && !gameStarted) {
      setGameStarted(true)
      if (challengeMode) {
        setChallengeStartTime(new Date())
      }
    }
    
    const correct = selectedAnswer === currentProblem.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    // Track response times for challenges
    if (challengeMode) {
      setResponseTimes(prev => [...prev, responseTime])
    }
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1)
      let points = currentProblem.points
      
      // Apply challenge bonuses
      if (challengeMode) {
        const speedBonusThreshold = subject === 'math' ? 10 : 15
        if (responseTime < speedBonusThreshold) {
          points = Math.floor(points * (subject === 'math' ? 1.5 : 1.3))
        }
      }
      
      setSessionScore(prev => prev + points)
      setAvatarEmotion('excited')
      setCurrentReward({ points, badge: sessionScore === 0 ? 'First Success!' : null })
      
      const message = challengeMode && responseTime < (subject === 'math' ? 10 : 15)
        ? `Lightning fast! +${points} points (Speed Bonus!)`
        : `Correct! +${points} points`
      
      toast.success(message, {
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
  
const handleChallengeComplete = async () => {
    const finalScore = sessionScore
    const totalQuestions = problems.length
    const timeUsed = challengeStartTime ? Math.floor((new Date() - challengeStartTime) / 1000) : 0
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0

    // Submit challenge result to leaderboard
    try {
      const challengeSubmission = {
        userId: 'current_user',
        userName: 'Player',
        challengeType: gameData?.challengeType || gameData?.type,
        skillLevel: parseInt(difficulty),
        score: finalScore,
        correctAnswers,
        totalQuestions,
        timeUsed,
        avgResponseTime
      }

      // Import and call appropriate service
      if (subject === 'math') {
        const { submitChallenge } = await import('@/services/api/mathService')
        await submitChallenge(challengeSubmission)
      } else {
        const { submitChallenge } = await import('@/services/api/readingService')
        await submitChallenge(challengeSubmission)
      }

      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)

      updateProgress({
        subject,
        difficulty,
        points: finalScore,
        completed: true,
        isChallenge: true,
        challengeType: gameData?.challengeType || gameData?.type,
        correctAnswers,
        totalQuestions,
        timeUsed,
        avgResponseTime
      })

      toast.success(
        `🏆 Challenge Complete! Score: ${finalScore} points. Check the leaderboard to see your ranking!`,
        {
          position: "top-center",
          autoClose: 5000
        }
      )

    } catch (error) {
      toast.error('Challenge completed but failed to submit to leaderboard', {
        position: "top-center",
        autoClose: 3000
      })
    }

    setTimeout(() => {
      navigate('/leaderboard')
    }, 4000)
  }

  const handleGameComplete = () => {
    const finalScore = sessionScore
    const targetReached = correctAnswers >= (gameData?.targetScore || 0)
    
    if (targetReached) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
    
    updateProgress({
      subject,
      difficulty,
      points: finalScore,
      completed: targetReached,
      isGame: true,
      gameType: gameData?.type,
      correctAnswers,
      targetScore: gameData?.targetScore
    })
    
    const message = targetReached 
      ? `🎉 Game Complete! Target reached: ${correctAnswers}/${gameData?.targetScore}. Total: ${finalScore} points!`
      : `Game Over! Score: ${correctAnswers}/${gameData?.targetScore}. Total: ${finalScore} points. Try again!`
    
    toast.success(message, {
      position: "top-center",
      autoClose: 4000
    })
    
    setTimeout(() => {
      navigate(subject === 'math' ? '/math' : '/reading')
    }, 3000)
  }
  
  const handleNextProblem = () => {
    setShowResult(false)
    setSelectedAnswer('')
    setAvatarEmotion('happy')
    
    if (isGame) {
      // For games, continue until time runs out or manually completed
      if (timeRemaining <= 0 || gameComplete) {
        handleGameComplete()
        return
      }
      
      // Move to next problem or cycle back for timed games
      if (isLastProblem) {
        setCurrentIndex(0) // Cycle back for continuous play
      } else {
        setCurrentIndex(prev => prev + 1)
      }
} else {
      // Original lesson logic
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
      {/* Confetti for game/challenge completion */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-magical p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar character="wizard" emotion={avatarEmotion} animated />
            <div>
              <h2 className="text-xl font-display font-bold text-gray-800">
                {challengeMode ? (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Trophy" className="w-6 h-6 text-yellow-600" />
                    <span>{gameData?.name || 'Timed Challenge'}</span>
                    <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Challenge Mode
                    </span>
                  </div>
                ) : isGame ? (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name={gameData?.icon || 'Gamepad2'} className="w-6 h-6" />
                    <span>{gameData?.title || 'Mini Game'}</span>
                  </div>
                ) : (
                  subject === 'math' ? 'Math Quest' : 'Reading Adventure'
                )}
              </h2>
              <p className="text-gray-600">
                {challengeMode ? (
                  <div className="flex items-center space-x-4">
                    <span>Correct: {correctAnswers}/{problems.length}</span>
                    <span>Accuracy: {problems.length > 0 ? Math.round((correctAnswers / Math.max(currentIndex, 1)) * 100) : 0}%</span>
                    {timeRemaining !== null && (
                      <span className={`font-mono ${timeRemaining <= 30 ? 'text-red-600' : timeRemaining <= 60 ? 'text-yellow-600' : ''}`}>
                        ⏱️ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                ) : isGame ? (
                  <div className="flex items-center space-x-4">
                    <span>Correct: {correctAnswers}/{gameData?.targetScore || 0}</span>
                    {timeRemaining !== null && (
                      <span className={`font-mono ${timeRemaining <= 10 ? 'text-red-600' : ''}`}>
                        ⏱️ {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                ) : (
                  `Problem ${currentIndex + 1} of ${problems.length}`
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {challengeMode ? 'Challenge Score' : isGame ? 'Game Score' : 'Session Score'}
              </p>
              <p className="text-2xl font-bold text-primary-600">{sessionScore}</p>
            </div>
            <Button variant="ghost" onClick={handleQuit}>
              <ApperIcon name="X" className="w-4 h-4 mr-2" />
              {challengeMode ? 'End Challenge' : isGame ? 'End Game' : 'Quit'}
            </Button>
          </div>
        </div>
        
        <ProgressBar value={progress} className="mb-2" />
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            {challengeMode ? 'Time Progress' : isGame ? 'Time Progress' : 'Progress'}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        {/* Challenge performance indicators */}
        {challengeMode && (
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Avg Response: {responseTimes.length > 0 ? (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(1) : 0}s</span>
            <span>Questions Left: {problems.length - currentIndex - 1}</span>
          </div>
        )}
      </div>
      
{/* Problem/Game/Challenge Question */}
      {isGame || challengeMode ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-magical p-8 mb-8"
        >
          {/* Challenge mode enhanced display */}
          {challengeMode && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Zap" className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-800">Challenge Question {currentIndex + 1}</span>
                </div>
                {questionStartTime && (
                  <div className="text-sm text-yellow-700">
                    Response time: {((new Date() - questionStartTime) / 1000).toFixed(1)}s
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Game-specific rendering */}
          {gameData?.type === 'speed-math' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {currentProblem.question} = ?
              </h3>
              <input
                type="number"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                className="text-2xl font-bold text-center border-2 border-primary-300 rounded-lg px-4 py-2 w-32"
                placeholder="?"
                autoFocus
                disabled={showResult}
              />
            </div>
          )}
          
          {gameData?.type === 'number-sequence' && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                What comes next in the sequence?
              </h3>
              <div className="flex justify-center items-center space-x-4 mb-6">
                {currentProblem.sequence?.map((num, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center text-xl font-bold ${
                      num === '?' 
                        ? 'border-primary-500 bg-primary-50 text-primary-600' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <input
                type="number"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                className="text-xl font-bold text-center border-2 border-primary-300 rounded-lg px-4 py-2 w-24"
                placeholder="?"
                autoFocus
                disabled={showResult}
              />
            </div>
          )}
          
          {gameData?.type === 'word-scramble' && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Unscramble this word:
              </h3>
              <div className="text-3xl font-bold text-primary-600 mb-2 tracking-widest">
                {currentProblem.scrambled}
              </div>
              <p className="text-gray-600 mb-6">Hint: {currentProblem.hint}</p>
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                className="text-xl font-bold text-center border-2 border-primary-300 rounded-lg px-4 py-2 w-48"
                placeholder="Enter word"
                autoFocus
                disabled={showResult}
              />
            </div>
          )}
          
          {/* Standard challenge questions use ProblemCard */}
          {(!gameData?.type || gameData?.type.includes('challenge')) && (
            <ProblemCard
              problem={currentProblem}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              showResult={showResult}
              enhanced={challengeMode}
            />
          )}
          
          {/* Show result feedback */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-6 text-center p-4 rounded-lg ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <ApperIcon 
                name={isCorrect ? 'CheckCircle' : 'XCircle'} 
                className="w-8 h-8 mx-auto mb-2" 
              />
              <p className="font-bold">
                {isCorrect ? (
                  challengeMode && responseTimes.length > 0 && responseTimes[responseTimes.length - 1] < (subject === 'math' ? 10 : 15) ? 
                    `Lightning Fast! (+Speed Bonus)` : 
                    'Correct!'
                ) : (
                  `Incorrect. The answer was: ${currentProblem.correctAnswer}`
                )}
              </p>
              {challengeMode && responseTimes.length > 0 && (
                <p className="text-sm mt-2">
                  Response time: {responseTimes[responseTimes.length - 1].toFixed(1)}s
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      ) : (
<ProblemCard
          problem={currentProblem}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showResult={showResult}
          enhanced={challengeMode}
          className="mb-8"
        />
      )}
      
      {/* Action Buttons */}
      {!showResult && (
        <div className="text-center">
          <Button
            variant="primary"
            size="xl"
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || gameComplete}
            className="min-w-48"
          >
            {challengeMode ? 'Submit (Challenge)' : isGame ? 'Submit' : 'Submit Answer'}
            <ApperIcon name="Send" className="w-5 h-5 ml-2" />
          </Button>
          
          {(isGame || challengeMode) && gameStarted && (
            <div className="mt-4 text-sm text-gray-600">
              Press Enter to submit quickly! 
              {challengeMode && <span className="text-yellow-600 font-medium"> Challenge Mode Active</span>}
            </div>
          )}
        </div>
      )}
      
      {showResult && !isGame && !challengeMode && (
        <div className="text-center">
          <Button
            variant="primary"
            size="xl"
            onClick={handleNextProblem}
            className="min-w-48"
          >
            {isLastProblem ? 'Complete Session' : 'Next Problem'}
            <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
      
      {showResult && (isGame || challengeMode) && !gameComplete && (
        <div className="text-center">
          <Button
            variant="primary"
            size="xl"
            onClick={handleNextProblem}
            className="min-w-48"
          >
            {challengeMode ? 'Next Challenge' : 'Continue'}
            <ApperIcon name="ArrowRight" className="w-5 h-5 ml-2" />
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