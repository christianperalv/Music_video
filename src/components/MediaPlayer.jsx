import React from "react"
"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

const MediaPlayer = ({ type, src, title = "Untitled", artist = "Unknown Artist", coverImage }) => {
  const mediaRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Play function with state update
  const play = () => {
    mediaRef.current.play()
    setIsPlaying(true)
  }

  // Pause function with state update
  const pause = () => {
    mediaRef.current.pause()
    setIsPlaying(false)
  }

  // Stop function
  const stop = () => {
    mediaRef.current.pause()
    mediaRef.current.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Toggle fullscreen (for video only)
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Handle volume change
  const changeVolume = (e) => {
    const newVolume = e.target.value
    setVolume(newVolume)
    mediaRef.current.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  // Handle seeking
  const handleSeek = (e) => {
    if (mediaRef.current) {
      const seekPosition = e.target.value
      const newTime = (seekPosition / 100) * duration
      mediaRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Skip forward/backward
  const skip = (seconds) => {
    if (mediaRef.current) {
      const newTime = Math.min(Math.max(currentTime + seconds, 0), duration)
      mediaRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Update time and duration
  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    const handleTimeUpdate = () => {
      setCurrentTime(media.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(media.duration)
      setIsLoaded(true)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      media.currentTime = 0
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    media.addEventListener("timeupdate", handleTimeUpdate)
    media.addEventListener("loadedmetadata", handleLoadedMetadata)
    media.addEventListener("ended", handleEnded)
    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      media.removeEventListener("timeupdate", handleTimeUpdate)
      media.removeEventListener("loadedmetadata", handleLoadedMetadata)
      media.removeEventListener("ended", handleEnded)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all ${
        isFullscreen ? "fixed inset-0 z-50" : "relative"
      }`}
    >
      {/* Media Element */}
      <div className="relative">
        {type === "video" ? (
          <video ref={mediaRef} className="w-full aspect-video bg-black" controls={false} onClick={togglePlay}>
            <source src={src} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        ) : (
          <div className="relative bg-gradient-to-r from-blue-900 to-purple-900 aspect-[3/1] flex items-center p-4">
            <audio ref={mediaRef} controls={false} className="hidden">
              <source src={src} type="audio/mp3" />
              Tu navegador no soporta el audio.
            </audio>

            {/* Audio visualization with cover image */}
            <div className="flex items-center w-full">
              {coverImage && (
                <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                  <img src={coverImage || "/portada.jpg"} alt={title} className="h-full w-full object-cover" />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-center pb-2">
                      <div className="flex items-end space-x-1">
                        <div className={`w-1 bg-white rounded-t ${isPlaying ? "h-4 animate-sound-wave" : "h-1"}`}></div>
                        <div
                          className={`w-1 bg-white rounded-t ${isPlaying ? "h-8 animate-sound-wave animation-delay-200" : "h-1"}`}
                        ></div>
                        <div
                          className={`w-1 bg-white rounded-t ${isPlaying ? "h-6 animate-sound-wave animation-delay-400" : "h-1"}`}
                        ></div>
                        <div
                          className={`w-1 bg-white rounded-t ${isPlaying ? "h-10 animate-sound-wave animation-delay-600" : "h-1"}`}
                        ></div>
                        <div
                          className={`w-1 bg-white rounded-t ${isPlaying ? "h-4 animate-sound-wave animation-delay-800" : "h-1"}`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-gray-300">{artist}</p>
              </div>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay for Video */}
        {type === "video" && (
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
              isPlaying ? "opacity-0" : "opacity-100 bg-black bg-opacity-40"
            }`}
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-80 flex items-center justify-center pointer-events-auto cursor-pointer">
                <Play size={30} className="text-white ml-1" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4">
        {/* Progress Bar */}
        {isLoaded && (
          <div className="mb-4">
            <div className="relative h-2 bg-gray-700 rounded-full">
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Main Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => skip(-10)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            >
              <SkipBack size={20} />
            </button>

            <button onClick={togglePlay} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>

            <button
              onClick={stop}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            >
              <Square size={18} />
            </button>

            <button
              onClick={() => skip(10)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <div className="relative w-24 h-2 bg-gray-700 rounded-full">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={changeVolume}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${volume * 100}%` }}></div>
            </div>

            {type === "video" && (
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors ml-2"
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaPlayer

