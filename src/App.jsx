import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/organisms/Header'
import HomePage from '@/components/pages/HomePage'
import MathWorldPage from '@/components/pages/MathWorldPage'
import ReadingKingdomPage from '@/components/pages/ReadingKingdomPage'
import CharacterPage from '@/components/pages/CharacterPage'
import ProgressPage from '@/components/pages/ProgressPage'
import LeaderboardPage from '@/components/pages/LeaderboardPage'
import ActivityPage from '@/components/pages/ActivityPage'
import ParentDashboard from '@/components/pages/ParentDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 bg-cloud-pattern">
        <Header />
        <main className="pb-20 md:pb-8">
<Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/math" element={<MathWorldPage />} />
            <Route path="/reading" element={<ReadingKingdomPage />} />
            <Route path="/character" element={<CharacterPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/parent-dashboard" element={<ParentDashboard />} />
            <Route path="/activity/:subject/:difficulty" element={<ActivityPage />} />
          </Routes>
        </main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  )
}

export default App