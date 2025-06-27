import { motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
// Voice utility functions
const getVoiceSettings = async () => {
  try {
    const settings = localStorage.getItem('voiceSettings');
    return settings ? JSON.parse(settings) : {
      rate: 1,
      pitch: 1,
      volume: 1,
      voice: null
    };
  } catch (error) {
    console.error('Failed to get voice settings:', error);
    return {
      rate: 1,
      pitch: 1,
      volume: 1,
      voice: null
    };
  }
};

const getAvailableVoices = async () => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve([]);
      return;
    }
    
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
    }
  });
};

const updateVoiceSettings = async (settings) => {
  try {
    localStorage.setItem('voiceSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save voice settings:', error);
    throw error;
  }
};

// Toast notification fallback
const toast = {
  error: (message) => {
    console.error(message);
    if (window.alert) {
      alert(message);
    }
  }
};
const ProblemCard = ({ 
  problem, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult = false,
  className = ''
}) => {
// Voice narration state
  const [isNarrating, setIsNarrating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState(null)
  const [availableVoices, setAvailableVoices] = useState([])
  const [showVoiceControls, setShowVoiceControls] = useState(false)
  const utteranceRef = useRef(null)
  const speechSynthRef = useRef(null)

  // Initialize voice settings and available voices
  useEffect(() => {
    const initializeVoice = async () => {
      try {
        const [settings, voices] = await Promise.all([
          getVoiceSettings(),
          getAvailableVoices()
        ])
        setVoiceSettings(settings)
        setAvailableVoices(voices)
      } catch (error) {
        console.error('Failed to initialize voice settings:', error)
      }
    }
    
    if (problem?.story) {
      initializeVoice()
    }
  }, [problem?.story])

  // Cleanup speech on unmount or problem change
  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel()
      }
    }
  }, [problem?.id])

const handleStartNarration = () => {
    if (!problem?.story || !voiceSettings || !window.speechSynthesis) return

    try {
      // Cancel any existing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(problem.story)
      utterance.rate = voiceSettings.rate
      utterance.pitch = voiceSettings.pitch
      utterance.volume = voiceSettings.volume
      
      // Set voice if specified
      if (voiceSettings.voice && availableVoices.length > 0) {
        const selectedVoice = availableVoices.find(v => v.name === voiceSettings.voice)
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
      }
      
      utterance.onstart = () => {
        setIsNarrating(true)
        setIsPaused(false)
      }
      
      utterance.onend = () => {
        setIsNarrating(false)
        setIsPaused(false)
      }
      
      utterance.onerror = (error) => {
        console.error('Speech synthesis error:', error)
        setIsNarrating(false)
        setIsPaused(false)
        toast.error('Voice narration failed. Please try again.')
      }
      
      utteranceRef.current = utterance
      speechSynthRef.current = window.speechSynthesis
      window.speechSynthesis.speak(utterance)
      
    } catch (error) {
      console.error('Failed to start narration:', error)
      toast.error('Voice narration is not available in your browser.')
    }
  }

const handlePauseNarration = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  const handleResumeNarration = () => {
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }

  const handleStopNarration = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsNarrating(false)
    setIsPaused(false)
  }

  const handleSpeedChange = async (newRate) => {
    const updatedSettings = { ...voiceSettings, rate: newRate }
    setVoiceSettings(updatedSettings)
    
    try {
      await updateVoiceSettings(updatedSettings)
    } catch (error) {
      console.error('Failed to save voice settings:', error)
    }
  }

  const handleVoiceChange = async (voiceName) => {
    const updatedSettings = { ...voiceSettings, voice: voiceName }
    setVoiceSettings(updatedSettings)
    
    try {
      await updateVoiceSettings(updatedSettings)
    } catch (error) {
      console.error('Failed to save voice settings:', error)
    }
  }

  if (!problem) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">
            {problem.question}
          </h2>
          {problem.story && (
            <div className="relative">
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
                {problem.story}
              </p>
              
              {/* Voice Controls */}
              {voiceSettings && (
                <div className="flex justify-center items-center space-x-2 mb-4">
                  {!isNarrating ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleStartNarration}
                      className="flex items-center space-x-2"
                      title="Listen to story"
                    >
                      <ApperIcon name="Volume2" className="w-4 h-4" />
                      <span>Listen</span>
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {!isPaused ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handlePauseNarration}
                          className="flex items-center space-x-1"
                          title="Pause narration"
                        >
                          <ApperIcon name="Pause" className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleResumeNarration}
                          className="flex items-center space-x-1"
                          title="Resume narration"
                        >
                          <ApperIcon name="Play" className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleStopNarration}
                        className="flex items-center space-x-1"
                        title="Stop narration"
                      >
                        <ApperIcon name="Square" className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowVoiceControls(!showVoiceControls)}
                    className="flex items-center space-x-1"
                    title="Voice settings"
                  >
                    <ApperIcon name="Settings" className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {/* Voice Settings Panel */}
              {showVoiceControls && voiceSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 rounded-lg p-4 mb-4 max-w-md mx-auto"
                >
                  <h4 className="font-medium text-gray-800 mb-3">Voice Settings</h4>
                  
                  {/* Speed Control */}
                  <div className="mb-3">
                    <label className="text-sm text-gray-600 block mb-1">
                      Speed: {voiceSettings.rate}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSettings.rate}
                      onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Slow</span>
                      <span>Normal</span>
                      <span>Fast</span>
                    </div>
                  </div>
                  
                  {/* Voice Selection */}
                  {availableVoices.length > 0 && (
                    <div className="mb-3">
                      <label className="text-sm text-gray-600 block mb-1">Voice</label>
                      <select
                        value={voiceSettings.voice || ''}
                        onChange={(e) => handleVoiceChange(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="">Default Voice</option>
                        {availableVoices.map((voice, index) => (
                          <option key={index} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Narration Status Indicator */}
              {isNarrating && (
                <div className="flex justify-center items-center space-x-2 text-primary-600 mb-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {isPaused ? 'Narration Paused' : 'Now Reading...'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="grid gap-4 max-w-lg mx-auto">
          {problem.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isCorrect = showResult && option === problem.correctAnswer
            const isWrong = showResult && isSelected && option !== problem.correctAnswer
            
            let variant = 'outline'
            if (showResult) {
              if (isCorrect) variant = 'accent'
              else if (isWrong) variant = 'secondary'
            } else if (isSelected) {
              variant = 'primary'
            }
            
            return (
              <motion.div
                key={index}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <Button
                  variant={variant}
                  size="lg"
                  className="w-full text-left justify-start"
                  onClick={() => !showResult && onAnswerSelect(option)}
                  disabled={showResult}
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}

export default ProblemCard