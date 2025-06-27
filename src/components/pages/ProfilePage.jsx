import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ProgressBar from '@/components/atoms/ProgressBar'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import { useUserProgress } from '@/hooks/useUserProgress'

const ProfilePage = () => {
  const { progress, loading } = useUserProgress()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data - in real app would come from user service
  const userData = {
    name: 'Alex Adventure',
    email: 'alex@questemail.com',
    joinDate: 'September 2024',
    character: 'wizard',
    level: Math.floor(progress?.totalPoints / 100) || 1,
    achievements: [
      { name: 'First Steps', description: 'Complete your first activity', earned: true },
      { name: 'Math Master', description: 'Solve 50 math problems', earned: progress?.subjects?.math?.problemsSolved >= 50 },
      { name: 'Reading Champion', description: 'Read 25 stories', earned: progress?.subjects?.reading?.storiesRead >= 25 },
      { name: 'Streak Keeper', description: 'Maintain a 7-day streak', earned: false },
    ]
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'User' },
    { key: 'achievements', label: 'Achievements', icon: 'Award' },
    { key: 'settings', label: 'Settings', icon: 'Settings' }
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your Quest Academy profile and settings
          </p>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-6 md:p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar character={userData.character} size="xl" animated />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">
                  {userData.name}
                </h2>
                <p className="text-gray-600 mb-4">{userData.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <Badge variant="primary">Level {userData.level}</Badge>
                  <Badge variant="secondary">{progress?.totalPoints || 0} Points</Badge>
                  <Badge variant="accent">Joined {userData.joinDate}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">
                      {progress?.subjects?.math?.problemsSolved || 0}
                    </div>
                    <div className="text-sm text-gray-600">Problems Solved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-600">
                      {progress?.subjects?.reading?.storiesRead || 0}
                    </div>
                    <div className="text-sm text-gray-600">Stories Read</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-600">
                      {userData.achievements.filter(a => a.earned).length}
                    </div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex gap-2 p-1 bg-white/50 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white shadow-md text-primary-600'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-white/50'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress Summary */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ApperIcon name="TrendingUp" className="w-5 h-5 text-primary-600" />
                  Progress Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Math World</span>
                      <span className="text-sm text-gray-600">
                        {progress?.subjects?.math?.level || 1}/10
                      </span>
                    </div>
                    <ProgressBar 
                      progress={((progress?.subjects?.math?.level || 1) / 10) * 100} 
                      color="primary" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Reading Kingdom</span>
                      <span className="text-sm text-gray-600">
                        {progress?.subjects?.reading?.level || 1}/10
                      </span>
                    </div>
                    <ProgressBar 
                      progress={((progress?.subjects?.reading?.level || 1) / 10) * 100} 
                      color="secondary" 
                    />
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ApperIcon name="Clock" className="w-5 h-5 text-secondary-600" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                    <ApperIcon name="Calculator" className="w-4 h-4 text-primary-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Math Practice</div>
                      <div className="text-xs text-gray-600">2 hours ago</div>
                    </div>
                    <Badge variant="primary" size="sm">+50 XP</Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                    <ApperIcon name="BookOpen" className="w-4 h-4 text-secondary-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Story Reading</div>
                      <div className="text-xs text-gray-600">Yesterday</div>
                    </div>
                    <Badge variant="secondary" size="sm">+30 XP</Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-4 ${achievement.earned ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'opacity-60'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <ApperIcon 
                          name="Award" 
                          className={`w-6 h-6 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Badge variant="accent" size="sm">Earned</Badge>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ApperIcon name="Settings" className="w-5 h-5 text-gray-600" />
                  Account Settings
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notifications
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Daily progress reminders</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Achievement notifications</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Weekly progress reports</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="primary" size="lg" className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage