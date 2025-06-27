import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ActivitySession from '@/components/organisms/ActivitySession'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getMathProblems } from '@/services/api/mathService'
import { getReadingProblems } from '@/services/api/readingService'

const ActivityPage = () => {
  const { subject, difficulty } = useParams()
  const navigate = useNavigate()
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
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
  
  useEffect(() => {
    loadProblems()
  }, [subject, difficulty])
  
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
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ActivitySession
        problems={problems}
        subject={subject}
        difficulty={difficulty}
      />
    </div>
  )
}

export default ActivityPage