"use client"

import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [blocks, setBlocks] = useState<{ x: number; width: number; color: string }[]>([])
  const [movingBlock, setMovingBlock] = useState({ x: 0, width: 100, color: "#ff4136" })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(2)
  const [direction, setDirection] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [level, setLevel] = useState(1)
  const gameAreaRef = useRef(null)
  const gameAreaWidth = 300
  const blockHeight = 20
  const initialBlockWidth = 100

  const getRandomColor = () => {
    // Different shades of green with Optiprint blue
    const colors = [
      "#2ecc40", // Bright green
      "#25a233", // Medium green
      "#1c7926", // Darker green
      "#155c1e", // Deep green
      "#002F63", // Optiprint blue
      "#39b54a", // Light bright green
      "#178e27"  // Forest green
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const startGame = () => {
    setBlocks([{ x: (gameAreaWidth - initialBlockWidth) / 2, width: initialBlockWidth, color: getRandomColor() }])
    setMovingBlock({
      x: 0,
      width: initialBlockWidth,
      color: getRandomColor(),
    })
    setGameOver(false)
    setScore(0)
    setSpeed(2)
    setLevel(1)
    setGameStarted(true)
  }

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = setInterval(() => {
      setMovingBlock((prev) => {
        let newX = prev.x + speed * direction

        // Bounce the block off the walls
        if (newX <= 0) {
          setDirection(1)
          newX = 0
        } else if (newX + prev.width >= gameAreaWidth) {
          setDirection(-1)
          newX = gameAreaWidth - prev.width
        }

        return { ...prev, x: newX }
      })
    }, 10)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, speed, direction])

  const placeBlock = () => {
    if (gameOver) return

    // Get previous block (the one below)
    const prevBlock = blocks[blocks.length - 1]

    // Calculate overlap
    const leftOverlap = Math.max(0, movingBlock.x - prevBlock.x)
    const rightOverlap = Math.max(0, prevBlock.x + prevBlock.width - (movingBlock.x + movingBlock.width))
    const overlapWidth = movingBlock.width - leftOverlap - rightOverlap

    if (overlapWidth <= 0) {
      // No overlap, game over
      setGameOver(true)
      return
    }

    // Create new block with the overlapping width
    const newBlock = {
      x: Math.max(movingBlock.x, prevBlock.x),
      width: overlapWidth,
      color: movingBlock.color,
    }

    // Update score
    setScore(score + 1)

    // Increase difficulty as score increases
    if (score > 0 && score % 5 === 0) {
      setSpeed((prev) => Math.min(prev + 0.5, 5))
      setLevel((prev) => prev + 1)
    }

    // Add the new block and prepare the next moving block
    setBlocks([...blocks, newBlock])
    setMovingBlock({
      x: 0,
      width: newBlock.width, // New moving block has same width as the placed block
      color: getRandomColor(),
    })
  }

  const handleKeyDown = (e: { code: string; }) => {
    if (e.code === "Space") {
      if (!gameStarted) {
        startGame()
      } else if (!gameOver) {
        placeBlock()
      } else {
        startGame()
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameStarted, gameOver, blocks, movingBlock])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center w-full h-full bg-white p-4">
          <img src="/logo.svg" alt="Optiprint Logo" className="h-16 mb-6" />
          <h2 className="text-xl font-light italic text-[#002F63] text-center mb-4">Hilf dem Techniker, die PCB-Teile zu stapeln! Zum 40-jährigen Jubiläum von Optiprint.</h2>
          <div className="mb-4 text-center">
            <p className="text-sm mb-1 text-[#002F63] font-semibold tracking-wide">SCORE: {score}</p>
            <p className="text-xs text-[#002F63]">LEVEL: {level}</p>
          </div>

          <div
            ref={gameAreaRef}
            className="relative bg-white border border-[#002F63] overflow-hidden"
            style={{ width: gameAreaWidth, height: "400px" }}
            onClick={() => {
              if (!gameStarted) {
                startGame()
              } else if (!gameOver) {
                placeBlock()
              } else {
                startGame()
              }
            }}
          >
            {gameStarted ? (
              <>
                {/* Moving block */}
                {!gameOver && (
                  <div
                    className="absolute transition-transform"
                    style={{
                      left: `${movingBlock.x}px`,
                      top: `${80 - blockHeight}px`,
                      width: `${movingBlock.width}px`,
                      height: `${blockHeight}px`,
                      backgroundColor: movingBlock.color,
                    }}
                  />
                )}

                {/* Stacked blocks */}
                {blocks.map((block, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${block.x}px`,
                      bottom: `${index * blockHeight}px`,
                      width: `${block.width}px`,
                      height: `${blockHeight}px`,
                      backgroundColor: block.color,
                    }}
                  />
                ))}

                {/* Game over message */}
                {gameOver && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                    <h2 className="text-xl font-bold mb-2">Game Over!</h2>
                    <p className="mb-4">Final Score: {score}</p>
                    <button className="px-4 py-2 bg-[#002F63] text-white rounded hover:bg-[#001f42]" onClick={startGame}>
                      Play Again
                    </button>
                  </div>
                )}
              </>
            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
                <p className="text-center mb-4 text-[#002F63]">
                  Drücke die Leertaste oder tippe auf den Bildschirm zum Stapeln
                </p>
                <button className="px-4 py-2 bg-[#002F63] text-white rounded hover:bg-[#001f42]" onClick={startGame}>
                  Start Game
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-center text-gray-600">
            <p className="text-[#002F63] text-xs tracking-wide">DRÜCKE DIE LEERTASTE ODER TIPPE AUF DEN BILDSCHIRM ZUM STAPELN</p>
          </div>
          <div className="mt-4 text-xs text-center text-gray-500">
          </div>
        </div>
      </div>
    </main>
  )
}