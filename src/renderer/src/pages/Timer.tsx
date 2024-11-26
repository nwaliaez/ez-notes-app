import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, StopCircle } from 'lucide-react'

const Timer = () => {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning])

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const handleReset = () => {
    handleStop()
    setTime(25 * 60)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = Number(e.target.value)
    handleStop()
    setTime(newMinutes * 60)
  }

  useEffect(() => {
    if (time === 0) {
      const audio = new Audio('/alarm-sound.mp3')
      audio.play().catch((error) => console.log('Error playing sound:', error))
    }
  }, [time])

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds)
    const mins = Math.floor(absSeconds / 60)
    const secs = absSeconds % 60
    return `${seconds < 0 ? '-' : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Background decoration */}

      {/* Main content */}
      <div className="relative">
        {/* Timer display */}
        <div
          className={`rounded-xl p-4 mb-4 transition-all duration-300  ${
            time < 0 ? 'text-red-400' : 'text-text'
          }`}
        >
          <div className="text-7xl font-bold text-center tracking-wider">{formatTime(time)}</div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              className={`${
                isRunning ? 'bg-textMuted' : 'bg-emerald-500/80 hover:bg-emerald-600/80'
              } backdrop-blur-sm text-white py-2 px-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg border border-white/20`}
              onClick={handleStart}
              disabled={isRunning}
            >
              <Play className="w-5 h-5" />
            </button>
            <button
              className={`${
                !isRunning ? 'bg-textMuted' : 'bg-amber-500/80 hover:bg-amber-600/80'
              } backdrop-blur-sm text-white  py-2 px-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg border border-white/20`}
              onClick={handleStop}
              disabled={!isRunning}
            >
              <Pause className="w-5 h-5" />
            </button>
            <button
              className="bg-rose-500/80 hover:bg-rose-600/80 backdrop-blur-sm text-white  py-2 px-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg border border-white/20"
              onClick={handleReset}
            >
              <StopCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Time input */}
          <div className="flex justify-center">
            <input
              type="number"
              placeholder="Set Mins"
              className="w-28 p-3 rounded-xl text-center bg-white/10 backdrop-blur-sm border border-text text-text placeholder-text focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              onChange={handleTimeChange}
              disabled={isRunning}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Timer
