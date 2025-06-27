import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { useUserProgress } from '@/hooks/useUserProgress'
import { getCharacterData, getAvailableItems } from '@/services/api/characterService'

const CharacterPage = () => {
  const { progress } = useUserProgress()
  const [character, setCharacter] = useState(null)
  const [availableItems, setAvailableItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const loadCharacterData = async () => {
    try {
      setError('')
      setLoading(true)
      const [characterData, itemsData] = await Promise.all([
        getCharacterData(),
        getAvailableItems()
      ])
      setCharacter(characterData)
      setAvailableItems(itemsData)
    } catch (err) {
      setError('Failed to load character data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadCharacterData()
  }, [])
  
  const handleItemEquip = (item) => {
    if (character.unlockedItems.includes(item.id)) {
      setCharacter(prev => ({
        ...prev,
        equippedItems: prev.equippedItems.includes(item.id)
          ? prev.equippedItems.filter(id => id !== item.id)
          : [...prev.equippedItems, item.id]
      }))
    }
  }
  
  const categories = ['all', 'hats', 'accessories', 'backgrounds']
  const filteredItems = selectedCategory === 'all' 
    ? availableItems 
    : availableItems.filter(item => item.category === selectedCategory)
  
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCharacterData} />
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
          My Character
        </h1>
        <p className="text-xl text-gray-600">
          Customize your learning companion and show off your achievements!
        </p>
      </motion.div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Character Display */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card variant="character" className="p-8 text-center sticky top-24">
            <div className="mb-6">
              <Avatar 
                character={character?.baseAvatar || 'wizard'}
                size="xl"
                animated
                className="mx-auto"
              />
            </div>
            
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">
              Quest Hero
            </h2>
            <p className="text-gray-600 mb-6">Level {Math.floor(progress.totalPoints / 1000) + 1} Adventurer</p>
            
            {/* Character Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                <span className="font-medium text-gray-700">Total Points</span>
                <Badge variant="gold">{progress.totalPoints.toLocaleString()}</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                <span className="font-medium text-gray-700">Badges Earned</span>
                <Badge variant="secondary">{progress.badges.length}</Badge>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-accent-50 rounded-lg">
                <span className="font-medium text-gray-700">Items Unlocked</span>
                <Badge variant="accent">{character?.unlockedItems.length || 0}</Badge>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Customization Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold text-gray-800">
                Customize Your Hero
              </h3>
              
              {/* Category Filter */}
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => {
                const isUnlocked = character?.unlockedItems.includes(item.id)
                const isEquipped = character?.equippedItems.includes(item.id)
                const canAfford = progress.totalPoints >= item.cost
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`p-4 text-center cursor-pointer transition-all duration-200 ${
                        isEquipped ? 'ring-2 ring-primary-500 bg-primary-50' :
                        isUnlocked ? 'hover:scale-105' : 
                        'opacity-60'
                      }`}
                      onClick={() => isUnlocked && handleItemEquip(item)}
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        isUnlocked ? 'bg-gradient-to-br from-accent-400 to-accent-500' : 'bg-gray-300'
                      }`}>
                        <ApperIcon 
                          name={item.icon} 
                          className={`w-8 h-8 ${isUnlocked ? 'text-white' : 'text-gray-500'}`} 
                        />
                      </div>
                      
                      <h4 className="font-bold text-sm text-gray-800 mb-1">{item.name}</h4>
                      
                      {isUnlocked ? (
                        <Badge variant={isEquipped ? 'success' : 'primary'} size="sm">
                          {isEquipped ? 'Equipped' : 'Owned'}
                        </Badge>
                      ) : (
                        <div className="space-y-1">
                          <Badge variant={canAfford ? 'warning' : 'outline'} size="sm">
                            <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                            {item.cost}
                          </Badge>
                          {!canAfford && (
                            <p className="text-xs text-gray-500">Need more points</p>
                          )}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                )
              })}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Package" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No items in this category yet!</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default CharacterPage