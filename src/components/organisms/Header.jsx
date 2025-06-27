import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PointsDisplay from '@/components/molecules/PointsDisplay'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useUserProgress } from '@/hooks/useUserProgress'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { progress } = useUserProgress()
  
const navItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Math World', path: '/math', icon: 'Calculator' },
    { name: 'Reading Kingdom', path: '/reading', icon: 'BookOpen' },
    { name: 'My Character', path: '/character', icon: 'User' },
    { name: 'Progress', path: '/progress', icon: 'TrendingUp' },
    { name: 'Profile', path: '/profile', icon: 'Settings' },
    { name: 'Parent Dashboard', path: '/parent-dashboard', icon: 'BarChart3' }
  ]
  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <ApperIcon name="Sparkles" className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-display font-bold text-gradient">
                Quest Academy
              </span>
            </Link>
            
            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-magical'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <ApperIcon name={item.icon} className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <PointsDisplay points={progress.totalPoints} />
              <Avatar character="wizard" size="sm" animated />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Header */}
      <header className="md:hidden bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-lg sticky top-0 z-40">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center shadow-lg">
                <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-display font-bold text-gradient">
                Quest Academy
              </span>
            </Link>
            
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <PointsDisplay points={progress.totalPoints} size="sm" />
              <Avatar character="wizard" size="sm" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Bottom Navigation */}
{/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-white/20 shadow-lg z-40">
        <div className="grid grid-cols-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-3 transition-all duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600'
                }`}
              >
                <ApperIcon name={item.icon} className={`w-5 h-5 mb-1 ${isActive ? 'text-primary-600' : ''}`} />
                <span className="text-xs font-medium">{item.name.split(' ')[0]}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Header