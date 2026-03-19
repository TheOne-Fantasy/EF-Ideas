'use client';
import { useEffect, useRef, useState } from 'react';

const LampertiGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  // Game Constants
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -12;
  const GROUND_Height = 50;
  const GAME_SPEED = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frames = 0;

    // Game State
    let player = {
      x: 50,
      y: canvas.height - GROUND_Height - 40,
      width: 40,
      height: 40,
      dy: 0,
      jumping: false
    };

    let obstacles: { x: number, y: number, width: number, height: number, type: 'rock' | 'star' }[] = [];
    let bgOffset = 0;

    const resetGame = () => {
      player.y = canvas.height - GROUND_Height - 40;
      player.dy = 0;
      player.jumping = false;
      obstacles = [];
      frames = 0;
      setScore(0);
      setGameOver(false);
      setWon(false);
      bgOffset = 0;
    };

    const drawBackground = () => {
      // Sky Gradient (Vaporwave)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#2b061e'); // Dark Purple
      gradient.addColorStop(0.5, '#871a5b'); // Deep Pink
      gradient.addColorStop(1, '#ff0080'); // Neon Pink
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2 + 50, 80, 0, Math.PI * 2);
      const sunGradient = ctx.createLinearGradient(canvas.width / 2, canvas.height / 2 - 30, canvas.width / 2, canvas.height / 2 + 130);
      sunGradient.addColorStop(0, '#ffff00');
      sunGradient.addColorStop(1, '#ff0080');
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Grid Lines (Pseudo 3D)
      ctx.strokeStyle = 'rgba(255, 0, 128, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Horizon line
      ctx.moveTo(0, canvas.height - GROUND_Height);
      ctx.lineTo(canvas.width, canvas.height - GROUND_Height);
      // Perspective lines
      for (let i = -canvas.width; i < canvas.width * 2; i += 40) {
        ctx.moveTo(i + bgOffset, canvas.height);
        ctx.lineTo(canvas.width / 2, canvas.height / 2); // Vanishing point
      }
      ctx.stroke();

      // Ground
      ctx.fillStyle = '#1a0b2e';
      ctx.fillRect(0, canvas.height - GROUND_Height, canvas.width, GROUND_Height);
    };

    const drawPlayer = () => {
      // Simple Cyclist Representation (Emoji for now or simple shapes)
      ctx.font = '30px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText('🚴', player.x, player.y + 35);
      
      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(player.x + 20, player.y + 40, 15, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawObstacles = () => {
      obstacles.forEach(obs => {
        if (obs.type === 'rock') {
          ctx.font = '30px Arial';
          ctx.fillText('🚧', obs.x, obs.y + 30);
        } else {
          ctx.font = '30px Arial';
          ctx.fillText('💗', obs.x, obs.y + 30);
        }
      });
    };

    const update = () => {
      if (!isPlaying || gameOver || won) return;

      frames++;
      bgOffset = (bgOffset - GAME_SPEED) % 40;

      // Player Physics
      player.dy += GRAVITY;
      player.y += player.dy;

      // Ground Collision
      if (player.y > canvas.height - GROUND_Height - 40) {
        player.y = canvas.height - GROUND_Height - 40;
        player.dy = 0;
        player.jumping = false;
      }

      // Obstacle Spawning
      if (frames % 100 === 0) {
        const type = Math.random() > 0.3 ? 'rock' : 'star'; // More obstacles than bonuses
        obstacles.push({
          x: canvas.width,
          y: type === 'rock' ? canvas.height - GROUND_Height - 40 : canvas.height - GROUND_Height - 90, // Stars can be higher
          width: 30,
          height: 30,
          type: type
        });
      }

      // Obstacle Movement & Collision
      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.x -= GAME_SPEED;

        // Collision Detection
        if (
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.height > obs.y
        ) {
          if (obs.type === 'rock') {
            setGameOver(true);
            setIsPlaying(false);
          } else {
            setScore(prev => {
              const newScore = prev + 10;
              if (newScore >= 100) {
                setWon(true);
                setIsPlaying(false);
              }
              return newScore;
            });
            obstacles.splice(i, 1);
            i--;
          }
        }

        // Remove off-screen
        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
          i--;
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawPlayer();
      drawObstacles();
      update();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event Listeners
    const handleJump = () => {
      if (!isPlaying && !gameOver && !won) {
        setIsPlaying(true);
        resetGame();
      } else if (gameOver || won) {
        resetGame();
        setIsPlaying(true);
      } else if (!player.jumping) {
        player.dy = JUMP_STRENGTH;
        player.jumping = true;
      }
    };
    
    // Attach listener to canvas parent for better hit area if needed, but canvas is fine
    // canvas.addEventListener('click', handleJump); // React onClick is better
    // window.addEventListener('keydown', (e) => { if(e.code === 'Space') handleJump() });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, gameOver, won]);

  const handleCanvasClick = () => {
    // Logic handled inside useEffect via refs/state is tricky with closures
    // Better to handle simple state triggers here and refs inside loop
    if (!isPlaying && !gameOver && !won) {
      setIsPlaying(true);
    } else if (gameOver || won) {
      setIsPlaying(true);
      setScore(0);
      setGameOver(false);
      setWon(false);
    } else {
      // Jump logic needs access to player object which is inside useEffect closure
      // We can use a ref for player or dispatch a custom event, 
      // OR re-architect slightly. For this simple game, let's cheat:
      // We will re-implement jump inside the render loop's scope or use a mutable Ref for inputs.
    }
  };

  // Input Ref to bridge React state and Canvas Loop
  const inputRef = useRef({ jumpPressed: false });
  
  const handleInteraction = () => {
     if (!isPlaying && !gameOver && !won) {
        setIsPlaying(true);
        setScore(0);
        setGameOver(false);
        setWon(false);
      } else if (gameOver || won) {
        setScore(0);
        setGameOver(false);
        setWon(false);
        setIsPlaying(true);
      } else {
         inputRef.current.jumpPressed = true;
      }
  };

  // Re-implementing the loop with refs to fix closure staleness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frames = 0;
    
    // Mutable Game State
    const gameState = {
      player: { x: 50, y: 150, width: 30, height: 30, dy: 0, jumping: false },
      obstacles: [] as { x: number, y: number, width: number, height: number, type: 'rock' | 'star' }[],
      bgOffset: 0,
      scoreInternal: 0,
      gameSpeed: 5,
      isRunning: false,
      isGameOver: false,
      isWon: false
    };
    
    const GAME_HEIGHT = canvas.height;
    const GROUND_Y = GAME_HEIGHT - 40;

    const reset = () => {
      gameState.player.y = GROUND_Y - 40;
      gameState.player.dy = 0;
      gameState.player.jumping = false;
      gameState.obstacles = [];
      gameState.frames = 0;
      gameState.scoreInternal = 0;
      gameState.bgOffset = 0;
      gameState.isGameOver = false;
      gameState.isWon = false;
      gameState.isRunning = true;
      setScore(0);
      setGameOver(false);
      setWon(false);
      setIsPlaying(true);
    };

    const loop = () => {
      // Check Input
      if (inputRef.current.jumpPressed) {
        if (!gameState.player.jumping && gameState.isRunning) {
           gameState.player.dy = -10; // Jump strength
           gameState.player.jumping = true;
        }
        inputRef.current.jumpPressed = false;
      }

      // Check Start/Restart from external state
      // (Handled by checking isPlaying prop passed down? No, we use local refs)

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- DRAW BACKGROUND ---
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#2b061e');
      gradient.addColorStop(0.5, '#5c1048');
      gradient.addColorStop(1, '#ff0080');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2 + 60, 60, 0, Math.PI * 2);
      const sunGradient = ctx.createLinearGradient(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2 + 120);
      sunGradient.addColorStop(0, '#ffff00');
      sunGradient.addColorStop(1, '#ff0055');
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Grid
      ctx.strokeStyle = 'rgba(255, 100, 200, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(canvas.width, GROUND_Y);
      
      gameState.bgOffset = (gameState.bgOffset - gameState.gameSpeed) % 40;
      // Perspective Lines
      const vanishingX = canvas.width / 2;
      const vanishingY = canvas.height / 2;
      
      for (let i = -canvas.width; i < canvas.width * 2; i += 60) {
         // Calculate moving x based on offset
         let startX = i + gameState.bgOffset;
         ctx.moveTo(startX, canvas.height);
         ctx.lineTo(vanishingX, vanishingY);
      }
      ctx.stroke();

      // Ground Fill
      ctx.fillStyle = '#11051b';
      ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);


      if (gameState.isRunning) {
        frames++;

        // Physics
        gameState.player.dy += 0.5; // Gravity
        gameState.player.y += gameState.player.dy;

        if (gameState.player.y > GROUND_Y - 40) {
          gameState.player.y = GROUND_Y - 40;
          gameState.player.dy = 0;
          gameState.player.jumping = false;
        }

        // Spawning
        if (frames % 120 === 0) {
           const type = Math.random() > 0.4 ? 'rock' : 'star';
           gameState.obstacles.push({
             x: canvas.width,
             y: type === 'rock' ? GROUND_Y - 30 : GROUND_Y - 80,
             width: 30,
             height: 30,
             type: type
           });
        }

        // Obstacles Logic
        for (let i = 0; i < gameState.obstacles.length; i++) {
           let obs = gameState.obstacles[i];
           obs.x -= gameState.gameSpeed;

           // Draw Obstacle
           ctx.font = '30px Arial';
           ctx.fillText(obs.type === 'rock' ? '🚧' : '💗', obs.x, obs.y + 30);

           // Collision
           if (
              gameState.player.x < obs.x + obs.width &&
              gameState.player.x + gameState.player.width > obs.x &&
              gameState.player.y < obs.y + obs.height &&
              gameState.player.y + gameState.player.height > obs.y
            ) {
              if (obs.type === 'rock') {
                 gameState.isRunning = false;
                 gameState.isGameOver = true;
                 setGameOver(true);
                 setIsPlaying(false);
              } else {
                 gameState.scoreInternal += 10;
                 setScore(gameState.scoreInternal);
                 if (gameState.scoreInternal >= 100) {
                    gameState.isRunning = false;
                    gameState.isWon = true;
                    setWon(true);
                    setIsPlaying(false);
                 }
                 gameState.obstacles.splice(i, 1);
                 i--;
              }
            }
            if (obs.x < -50) {
              gameState.obstacles.splice(i, 1);
              i--;
            }
        }
      }

      // Draw Player
      ctx.font = '30px Arial';
      ctx.fillText('🚴', gameState.player.x, gameState.player.y + 30);

      animationFrameId = requestAnimationFrame(loop);
    };

    // Initial Start Logic
    if (isPlaying && !gameOver && !won && frames === 0) {
       reset();
    }
    
    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]); // Re-bind when play state changes broadly, but loop handles internal logic

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '300px', 
        background: '#000', 
        borderRadius: '12px', 
        overflow: 'hidden',
        cursor: 'pointer',
        border: '2px solid #ef5097',
        boxShadow: '0 0 20px rgba(239, 80, 151, 0.4)'
      }}
      onClick={handleInteraction}
    >
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#fff', fontFamily: 'monospace', fontWeight: 'bold', textShadow: '2px 2px #000' }}>
         SCORE: {score} / 100
      </div>

      {!isPlaying && !gameOver && !won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', flexDirection: 'column' }}>
           <h3 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Mission: California Unlocked</h3>
           <div style={{ background: '#ef5097', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 'bold', animation: 'pulse 1s infinite' }}>TAP TO START</div>
           <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '1rem' }}>Tap/Click to Jump • Collect 💗 • Avoid 🚧</p>
        </div>
      )}

      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', flexDirection: 'column' }}>
           <h3 style={{ color: '#ff0055', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '1rem' }}>MISSION FAILED</h3>
           <div style={{ background: '#fff', color: '#000', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 'bold' }}>TRY AGAIN</div>
        </div>
      )}

      {won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 80, 151, 0.9)', flexDirection: 'column' }}>
           <h3 style={{ color: '#fff', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>MISSION PASSED!</h3>
           <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>LUKE LAMPERTI UNLOCKED</p>
           <div style={{ background: '#000', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '4px', fontWeight: 'bold' }}>PLAY AGAIN</div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LampertiGame;
