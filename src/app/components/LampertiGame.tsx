'use client';
import { useEffect, useRef, useState } from 'react';

const LampertiGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Input Ref for bridge
  const inputRef = useRef({ left: false, right: false, touchX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // --- GAME CONSTANTS ---
    const ROAD_WIDTH = 400;
    const HORIZON_Y = canvas.height * 0.45;
    const SEGMENT_LENGTH = 100;
    
    // --- MUTABLE STATE ---
    const state = {
      playerX: 0, // -1 to 1 (left to right)
      speed: 0,
      maxSpeed: 0.15,
      acceleration: 0.005,
      deceleration: 0.002,
      distance: 0,
      items: [] as any[],
      scenery: [] as any[],
      frames: 0
    };

    const reset = () => {
      state.playerX = 0;
      state.speed = 0;
      state.distance = 0;
      state.items = [];
      state.scenery = [];
      state.frames = 0;
      setScore(0);
      setGameOver(false);
      setWon(false);
    };

    // --- UTILS ---
    const project = (pX: number, pY: number, pZ: number) => {
      const scale = 1 / (pZ || 0.001);
      const x = (canvas.width / 2) + (pX * scale * canvas.width / 2);
      const y = (canvas.height / 2) + (pY * scale * canvas.height / 2);
      return { x, y, scale };
    };

    const spawnItem = (z: number) => {
      const lane = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
      const isBonus = Math.random() > 0.4;
      state.items.push({
        x: lane * 0.6,
        z: z,
        type: isBonus ? 'star' : 'rock',
        collected: false
      });
    };

    const spawnScenery = (z: number) => {
       state.scenery.push({ x: -1.5, z, side: -1 }, { x: 1.5, z, side: 1 });
    };

    const loop = () => {
      if (isPlaying && !gameOver && !won) {
        // --- INPUT LOGIC ---
        if (inputRef.current.left) state.playerX -= 0.04;
        if (inputRef.current.right) state.playerX += 0.04;
        
        // Touch logic
        if (inputRef.current.touchX !== 0) {
           const center = canvas.width / 2;
           if (inputRef.current.touchX < center) state.playerX -= 0.04;
           else state.playerX += 0.04;
        }

        state.playerX = Math.max(-0.9, Math.min(0.9, state.playerX));

        // Speed logic
        state.speed = Math.min(state.maxSpeed, state.speed + state.acceleration);
        state.distance += state.speed;
        state.frames++;

        // Spawning
        if (state.frames % 30 === 0) spawnScenery(state.distance + 10);
        if (state.frames % 40 === 0) spawnItem(state.distance + 10);
      }

      // --- DRAWING ---
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
      skyGrad.addColorStop(0, '#1a0633');
      skyGrad.addColorStop(1, '#ff0080');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, HORIZON_Y);

      // Retro Sun
      ctx.beginPath();
      ctx.arc(canvas.width / 2, HORIZON_Y, 70, 0, Math.PI, true);
      const sunGrad = ctx.createLinearGradient(0, HORIZON_Y - 70, 0, HORIZON_Y);
      sunGrad.addColorStop(0, '#ffff00');
      sunGrad.addColorStop(1, '#ff0080');
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Ground (California Road)
      ctx.fillStyle = '#11051b';
      ctx.fillRect(0, HORIZON_Y, canvas.width, canvas.height - HORIZON_Y);

      // Render Road Perspective Lines
      ctx.strokeStyle = '#ef5097';
      ctx.lineWidth = 2;
      for (let z = Math.floor(state.distance); z < state.distance + 10; z += 0.5) {
        const p1 = project(-1, 0.5, z - state.distance);
        const p2 = project(1, 0.5, z - state.distance);
        
        if (p1.y > HORIZON_Y) {
           ctx.globalAlpha = 1 - ((z - state.distance) / 10);
           ctx.beginPath();
           ctx.moveTo(0, p1.y);
           ctx.lineTo(canvas.width, p1.y);
           ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Road Edges
      ctx.beginPath();
      const edgeL1 = project(-0.8, 0.5, 0.1);
      const edgeL2 = project(-0.8, 0.5, 10);
      ctx.moveTo(edgeL1.x, edgeL1.y); ctx.lineTo(edgeL2.x, edgeL2.y);
      const edgeR1 = project(0.8, 0.5, 0.1);
      const edgeR2 = project(0.8, 0.5, 10);
      ctx.moveTo(edgeR1.x, edgeR1.y); ctx.lineTo(edgeR2.x, edgeR2.y);
      ctx.stroke();

      // --- RENDER SCENERY (Palm Trees) ---
      state.scenery = state.scenery.filter(s => s.z > state.distance);
      state.scenery.forEach(s => {
        const p = project(s.x, 0.5, s.z - state.distance);
        if (p.y > HORIZON_Y) {
          ctx.font = `${Math.floor(60 * p.scale)}px Arial`;
          ctx.fillText('🌴', p.x - (20 * p.scale), p.y);
        }
      });

      // --- RENDER ITEMS ---
      state.items = state.items.filter(item => item.z > state.distance && !item.collected);
      state.items.forEach(item => {
        const p = project(item.x, 0.5, item.z - state.distance);
        if (p.y > HORIZON_Y) {
          const size = 40 * p.scale;
          ctx.font = `${Math.floor(size)}px Arial`;
          ctx.fillText(item.type === 'star' ? '💗' : '🚧', p.x - size/2, p.y);

          // Collision Detection (when near player z=0.5 approx)
          const relativeZ = item.z - state.distance;
          if (relativeZ < 0.6 && relativeZ > 0.2) {
             const dx = Math.abs(item.x - state.playerX);
             if (dx < 0.2) {
                if (item.type === 'star') {
                   item.collected = true;
                   setScore(s => {
                      const newS = s + 10;
                      if (newS >= 100) { setWon(true); setIsPlaying(false); }
                      return newS;
                   });
                } else {
                   setGameOver(true);
                   setIsPlaying(false);
                }
             }
          }
        }
      });

      // --- RENDER PLAYER (Luke) ---
      const playerPos = project(state.playerX, 0.5, 0.5);
      ctx.font = '60px Arial';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ef5097';
      ctx.fillText('🚴', playerPos.x - 30, playerPos.y);
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    
    if (isPlaying && !gameOver && !won && state.frames === 0) reset();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, gameOver, won]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'ArrowLeft') inputRef.current.left = true;
    if (e.key === 'ArrowRight') inputRef.current.right = true;
  };
  
  const handleKeyUp = (e: any) => {
    if (e.key === 'ArrowLeft') inputRef.current.left = false;
    if (e.key === 'ArrowRight') inputRef.current.right = false;
  };

  const handleTouchStart = (e: any) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      inputRef.current.touchX = e.touches[0].clientX - rect.left;
    }
  };

  const handleTouchEnd = () => {
    inputRef.current.touchX = 0;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '350px', 
        background: '#000', 
        borderRadius: '16px', 
        overflow: 'hidden',
        border: '3px solid #ef5097',
        boxShadow: '0 0 30px rgba(239, 80, 151, 0.5)',
        touchAction: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => { if(!isPlaying) setIsPlaying(true); }}
    >
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={350} 
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      
      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#fff', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.2rem', textShadow: '2px 2px #ff0080' }}>
         HYPE: {score}%
      </div>

      {!isPlaying && !gameOver && !won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', flexDirection: 'column', textAlign: 'center', padding: '2rem' }}>
           <h3 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '1.5rem', marginBottom: '1rem' }}>CALIFORNIA UNLOCKED</h3>
           <p style={{ color: '#ef5097', fontWeight: 'bold', marginBottom: '2rem' }}>PROVE YOUR SKILL TO RECRUIT LAMPERTI</p>
           <div style={{ background: '#ef5097', color: '#fff', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', animation: 'pulse 1s infinite' }}>CLICK TO PLAY</div>
           <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '1.5rem' }}>USE ARROWS OR TAP SIDES TO STEER</p>
        </div>
      )}

      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', flexDirection: 'column' }}>
           <h3 style={{ color: '#ff0055', fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900 }}>CRASHED!</h3>
           <p style={{ color: '#fff', marginBottom: '1.5rem' }}>Contract negotiations failed.</p>
           <div onClick={() => setIsPlaying(true)} style={{ background: '#fff', color: '#000', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 900, cursor: 'pointer' }}>RETRY MISSION</div>
        </div>
      )}

      {won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 80, 151, 0.95)', flexDirection: 'column', textAlign: 'center' }}>
           <h3 style={{ color: '#fff', fontSize: '3rem', textTransform: 'uppercase', fontWeight: 900, margin: 0 }}>MISSION PASSED</h3>
           <div style={{ height: '4px', width: '200px', background: '#fff', margin: '1rem 0' }}></div>
           <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900 }}>LUKE LAMPERTI UNLOCKED 🔓</p>
           <div onClick={() => setIsPlaying(true)} style={{ background: '#000', color: '#fff', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', marginTop: '1.5rem' }}>PLAY AGAIN</div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LampertiGame;
