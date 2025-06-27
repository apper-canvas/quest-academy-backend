import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ActivitySession from '@/components/organisms/ActivitySession'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getMathProblems, getMathGames, startMathGame } from '@/services/api/mathService'
import { getReadingProblems, getReadingGames, startReadingGame } from '@/services/api/readingService'

const ActivityPage = () => {
  const { subject, difficulty, mode } = useParams() // Added mode param
  const navigate = useNavigate()
  const [problems, setProblems] = useState([])
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameData, setGameData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showGameSelection, setShowGameSelection] = useState(false)
  
  const isGameMode = mode === 'games'
const loadProblems = async () => {
    try {
      setError('')
      setLoading(true)
      
      let data
      if (subject === 'math') {
        data = await getMathProblems(difficulty)
      } else if (subject === 'reading') {
        data = await getReadingProblems(difficulty)
      } else {
        throw new Error('Invalid subject')
      }
      
      setProblems(data)
    } catch (err) {
      setError(`Failed to load ${subject} problems. Please try again.`)
    } finally {
      setLoading(false)
    }
  }
  
  const loadGames = async () => {
    try {
      setError('')
      setLoading(true)
      
      let data
      if (subject === 'math') {
        data = await getMathGames(difficulty)
      } else if (subject === 'reading') {
        data = await getReadingGames(difficulty)
      } else {
        throw new Error('Invalid subject')
      }
      
      setGames(data)
      setShowGameSelection(true)
    } catch (err) {
      setError(`Failed to load ${subject} games. Please try again.`)
    } finally {
      setLoading(false)
    }
  }
  
  const handleGameSelect = async (game) => {
    try {
      setLoading(true)
      
      let gameSession
      if (subject === 'math') {
        gameSession = await startMathGame(game.Id)
      } else {
        gameSession = await startReadingGame(game.Id)
      }
      
      setSelectedGame(game)
      setGameData(gameSession.game)
      setProblems(gameSession.questions)
      setShowGameSelection(false)
    } catch (err) {
      setError('Failed to start game. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
useEffect(() => {
    if (isGameMode) {
      loadGames()
    } else {
      loadProblems()
    }
  }, [subject, difficulty, mode])
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProblems} />
  if (problems.length === 0) {
    return (
      <Empty
        title="No Problems Available"
        description="We couldn't find any problems for this level right now."
        actionText="Go Back"
        onAction={() => navigate(`/${subject}`)}
      />
    )
  }
  
// Game Selection Screen
  if (isGameMode && showGameSelection && games.length > 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
            Choose Your Mini-Game
          </h1>
          <p className="text-gray-600">
            Select a fun game to practice {subject} skills!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {games.map((game) => (
            <Card
              key={game.Id}
              variant={subject}
              hover
              className="cursor-pointer transform transition-all duration-200 hover:scale-105"
              onClick={() => handleGameSelect(game)}
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <ApperIcon name={game.icon} className="w-8 h-8 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {game.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {game.description}
                </p>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Clock" className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">
                      {Math.floor(game.timeLimit / 60)}:{(game.timeLimit % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Target" className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">
                      Target: {game.targetScore}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    game.difficulty === 1 
                      ? 'bg-green-100 text-green-800'
                      : game.difficulty === 2
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {'★'.repeat(game.difficulty)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate(`/${subject}`)}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to {subject === 'math' ? 'Math World' : 'Reading Kingdom'}
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ActivitySession
        problems={problems}
        subject={subject}
        difficulty={difficulty}
        isGame={isGameMode && selectedGame}
        gameData={gameData}
      />
    </div>
  )
}

export default ActivityPage