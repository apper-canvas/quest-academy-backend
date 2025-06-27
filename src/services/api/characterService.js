import { characterData, availableItems } from '@/services/mockData/characterData'

export const getCharacterData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 250))
  return { ...characterData }
}

export const getAvailableItems = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...availableItems]
}

export const updateCharacter = async (updates) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  Object.assign(characterData, updates)
  return { ...characterData }
}

export const purchaseItem = async (itemId, cost) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const item = availableItems.find(i => i.id === itemId)
  if (!item) throw new Error('Item not found')
  
  // In a real app, this would check user's points and deduct cost
  if (!characterData.unlockedItems.includes(itemId)) {
    characterData.unlockedItems.push(itemId)
  }
  
  return { success: true, item }
}