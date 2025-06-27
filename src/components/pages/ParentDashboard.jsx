import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ProgressBar from '@/components/atoms/ProgressBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { getParentDashboardStats } from '@/services/api/progressService'
import { toast } from 'react-toastify'

const ParentDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timePeriod, setTimePeriod] = useState('month')

  const timePeriods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'all', label: 'All Time' }
  ]

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await getParentDashboardStats()
      setData(dashboardData)
    } catch (err) {
      setError('Failed to load dashboard data')
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDashboardData} showRetry />

  // Chart configurations
  const dailyProgressChartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
      background: 'transparent'
    },
    colors: ['#8B5CF6', '#06B6D4'],
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    xaxis: {
      categories: data.dailyProgress.slice(-7).map(d => 
        new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      labels: {
        style: { colors: '#6B7280' }
      }
    },
    yaxis: [
      {
        title: { text: 'Lessons Completed', style: { color: '#6B7280' } },
        labels: { style: { colors: '#6B7280' } }
      },
      {
        opposite: true,
        title: { text: 'Points Earned', style: { color: '#6B7280' } },
        labels: { style: { colors: '#6B7280' } }
      }
    ],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  }

  const dailyProgressSeries = [
    {
      name: 'Lessons Completed',
      data: data.dailyProgress.slice(-7).map(d => d.lessonsCompleted)
    },
    {
      name: 'Points Earned',
      yAxisIndex: 1,
      data: data.dailyProgress.slice(-7).map(d => d.pointsEarned)
    }
  ]

  const subjectBreakdownOptions = {
    chart: {
      type: 'donut',
      height: 300
    },
    colors: ['#8B5CF6', '#06B6D4'],
    labels: ['Math', 'Reading'],
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Lessons',
              formatter: () => {
                return data.subjectPerformance.math.lessonsCompleted + 
                       data.subjectPerformance.reading.lessonsCompleted
              }
            }
          }
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} lessons`
      }
    }
  }

  const subjectBreakdownSeries = [
    data.subjectPerformance.math.lessonsCompleted,
    data.subjectPerformance.reading.lessonsCompleted
  ]

  const weeklyComparisonOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false }
    },
    colors: ['#10B981'],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%'
      }
    },
    xaxis: {
      categories: data.weeklyComparison.map(w => w.week),
      labels: {
        style: { colors: '#6B7280' }
      }
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280' }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} lessons`
      }
    }
  }

  const weeklyComparisonSeries = [{
    name: 'Lessons Completed',
    data: data.weeklyComparison.map(w => w.lessonsCompleted)
  }]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Parent Dashboard
              </h1>
              <p className="text-gray-600">
                Track your child's learning progress and achievements
              </p>
            </div>
            
            {/* Time Period Filter */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              {timePeriods.map((period) => (
                <Button
                  key={period.key}
                  variant={timePeriod === period.key ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTimePeriod(period.key)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-4">
              <ApperIcon name="BookOpen" className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {data.overview.totalLessons}
            </h3>
            <p className="text-gray-600 text-sm">Total Lessons</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mx-auto mb-4">
              <ApperIcon name="Star" className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {data.overview.totalPoints.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm">Total Points</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mx-auto mb-4">
              <ApperIcon name="Flame" className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {data.overview.currentStreak}
            </h3>
            <p className="text-gray-600 text-sm">Day Streak</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
              <ApperIcon name="Target" className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {data.overview.weeklyGoalProgress}%
            </h3>
            <p className="text-gray-600 text-sm">Weekly Goal</p>
            <ProgressBar 
              progress={data.overview.weeklyGoalProgress} 
              className="mt-2" 
              size="sm"
            />
          </Card>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Daily Progress (Last 7 Days)
                </h3>
                <ApperIcon name="TrendingUp" className="w-5 h-5 text-gray-500" />
              </div>
              <Chart
                options={dailyProgressChartOptions}
                series={dailyProgressSeries}
                type="line"
                height={350}
              />
            </Card>
          </motion.div>

          {/* Subject Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Subject Distribution
                </h3>
                <ApperIcon name="PieChart" className="w-5 h-5 text-gray-500" />
              </div>
              <Chart
                options={subjectBreakdownOptions}
                series={subjectBreakdownSeries}
                type="donut"
                height={300}
              />
            </Card>
          </motion.div>

          {/* Weekly Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Weekly Comparison
                </h3>
                <ApperIcon name="BarChart" className="w-5 h-5 text-gray-500" />
              </div>
              <Chart
                options={weeklyComparisonOptions}
                series={weeklyComparisonSeries}
                type="bar"
                height={300}
              />
            </Card>
          </motion.div>

          {/* Subject Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Subject Performance
              </h3>
              <div className="space-y-6">
                {Object.entries(data.subjectPerformance).map(([subject, performance]) => (
                  <div key={subject} className="border-l-4 border-primary-200 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {subject}
                      </h4>
                      <Badge variant="success" size="sm">
                        +{performance.improvement}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{performance.lessonsCompleted}</span> lessons
                      </div>
                      <div>
                        <span className="font-medium">{performance.averageScore}%</span> avg score
                      </div>
                      <div>
                        <span className="font-medium">{performance.timeSpent}h</span> time spent
                      </div>
                      <div>
                        <ApperIcon name="TrendingUp" className="w-4 h-4 inline mr-1 text-green-500" />
                        Improving
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Achievements & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {data.achievements.slice(0, 5).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center">
                      <ApperIcon name={achievement.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{achievement.name}</p>
                      <p className="text-sm text-gray-500">{achievement.category}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Learning Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Learning Insights
              </h3>
              <div className="space-y-4">
                {data.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      insight.trend === 'up' ? 'bg-green-100' :
                      insight.trend === 'down' ? 'bg-red-100' :
                      'bg-blue-100'
                    }`}>
                      <ApperIcon 
                        name={
                          insight.trend === 'up' ? 'TrendingUp' :
                          insight.trend === 'down' ? 'TrendingDown' :
                          'Info'
                        } 
                        className={`w-4 h-4 ${
                          insight.trend === 'up' ? 'text-green-600' :
                          insight.trend === 'down' ? 'text-red-600' :
                          'text-blue-600'
                        }`} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{insight.message}</p>
                      <p className="text-xs text-gray-500 capitalize mt-1">{insight.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ParentDashboard