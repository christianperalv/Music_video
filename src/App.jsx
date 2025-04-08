import React from "react"
import MediaPlayer from "./components/MediaPlayer"
import "./index.css"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold my-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        🎵 Reproductor Multimedia
      </h1>

      <div className="w-full max-w-3xl space-y-8">
        {/* Reproductor de Video */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Video Player</h2>
          <MediaPlayer type="video" src="/daredevil.mp4" title="Daredevil Trailer" artist="Marvel Studios" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3 text-blue-300">Video Player</h2>
          <MediaPlayer type="video" src="/.mp4" title=" Trailer" artist="" />
        </div>
        {/* Reproductor de Audio */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-purple-300">Audio Player</h2>
          <MediaPlayer
            type="audio"
            src="/BrunoMars.mp3"
            title="Bruno Mars - Just The Way You Are"
            artist="Bruno Mars"
            coverImage="/portada.jpg"
          />
        </div>
      </div>
    </div>
  )
}

export default App

