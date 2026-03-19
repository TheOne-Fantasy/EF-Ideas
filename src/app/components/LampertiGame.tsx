'use client';
import { useEffect, useRef, useState } from 'react';

const LampertiGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const inputRef = useRef({ left: false, right: false, touchX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const HORIZON_Y = canvas.height * 0.45;
    
    const state = {
      playerX: 0,
      playerTilt: 0,
      speed: 0.12, // Start already at speed
      distance: 0,
      maxDistance: 7.2, // Approx 10 seconds at 0.12 speed / 60fps
      items: [] as any[],
      scenery: [] as any[],
      frames: 0,
      pedalAngle: 0,
      finishTriggered: false
    };

    const reset = () => {
      state.playerX = 0;
      state.playerTilt = 0;
      state.distance = 0;
      state.items = [];
      state.scenery = [];
      state.frames = 0;
      state.finishTriggered = false;
      setScore(0);
      setGameOver(false);
      setWon(false);
      setTimeLeft(10);
    };

    const project = (pX: number, pY: number, pZ: number) => {
      const scale = 1 / (pZ || 0.001);
      const x = (canvas.width / 2) + (pX * scale * canvas.width / 2);
      const y = (canvas.height / 2) + (pY * scale * canvas.height / 2);
      return { x, y, scale };
    };

    const drawCyclist = (x: number, y: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale * 1.6, scale * 1.6);
      ctx.rotate(state.playerTilt * 0.15);

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 5, 12, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bike
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2); // Rear Wheel
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, -15); // Frame
      ctx.stroke();

      // Animated Legs
      const legY = Math.sin(state.pedalAngle) * 6;
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-5, -10); ctx.lineTo(-8, -4 + legY); ctx.stroke(); // Left
      ctx.beginPath(); ctx.moveTo(5, -10); ctx.lineTo(8, -4 - legY); ctx.stroke(); // Right

      // EF Pink Jersey
      ctx.fillStyle = '#ef5097';
      ctx.beginPath(); ctx.roundRect(-8, -25, 16, 12, 3); ctx.fill();
      
      // Helmet
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(0, -28, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ef5097';
      ctx.fillRect(-6, -28, 12, 2);

      ctx.restore();
    };

    const drawBackground = () => {
      // California Day Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
      skyGrad.addColorStop(0, '#4facfe'); // Deep Blue
      skyGrad.addColorStop(1, '#00f2fe'); // Light Blue/Cyan
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, HORIZON_Y);

      // High Sun
      ctx.fillStyle = '#fff7e6';
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, HORIZON_Y * 0.4, 30, 0, Math.PI * 2);
      ctx.fill();
      // Sun Glow
      ctx.globalAlpha = 0.3;
      ctx.beginPath(); ctx.arc(canvas.width * 0.8, HORIZON_Y * 0.4, 45, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1.0;

      // Distant Desert Mountains
      ctx.fillStyle = '#c2b280'; // Sand color
      ctx.beginPath();
      ctx.moveTo(0, HORIZON_Y);
      ctx.lineTo(80, HORIZON_Y - 20); ctx.lineTo(150, HORIZON_Y - 5);
      ctx.lineTo(300, HORIZON_Y - 35); ctx.lineTo(450, HORIZON_Y - 10);
      ctx.lineTo(600, HORIZON_Y);
      ctx.fill();
    };

    const loop = () => {
      if (isPlaying && !gameOver && !won) {
        // Time & Distance Logic
        state.distance += state.speed;
        state.frames++;
        state.pedalAngle += state.speed * 12;
        
        const currentSeconds = 10 - Math.floor((state.distance / state.maxDistance) * 10);
        if (currentSeconds !== timeLeft) setTimeLeft(Math.max(0, currentSeconds));

        if (state.distance >= state.maxDistance && !state.finishTriggered) {
           state.finishTriggered = true;
           setTimeout(() => { setWon(true); setIsPlaying(false); }, 1000);
        }

        // Controls
        let targetTilt = 0;
        if (inputRef.current.left) { state.playerX -= 0.035; targetTilt = -0.8; }
        if (inputRef.current.right) { state.playerX += 0.035; targetTilt = 0.8; }
        
        if (inputRef.current.touchX !== 0) {
           const center = canvas.width / 2;
           if (inputRef.current.touchX < center) { state.playerX -= 0.035; targetTilt = -0.8; }
           else { state.playerX += 0.035; targetTilt = 0.8; }
        }
        state.playerTilt += (targetTilt - state.playerTilt) * 0.1;
        state.playerX = Math.max(-0.8, Math.min(0.8, state.playerX));

        // Spawning Scenery (Palms)
        if (state.frames % 35 === 0 && !state.finishTriggered) {
           state.scenery.push({ x: -1.3, z: state.distance + 15 }, { x: 1.3, z: state.distance + 15 });
        }
        // Spawning Items (Only on sides to allow straight path)
        if (state.frames % 50 === 0 && !state.finishTriggered) {
           const lane = Math.random() > 0.5 ? -0.5 : 0.5; // No obstacles in center (0)
           const type = Math.random() > 0.3 ? 'watt' : 'barrier';
           state.items.push({ x: lane, z: state.distance + 15, type });
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      // Road (Grey Asphalt)
      ctx.fillStyle = '#333';
      ctx.fillRect(0, HORIZON_Y, canvas.width, canvas.height - HORIZON_Y);

      // Road Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      for (let z = Math.floor(state.distance * 2) / 2; z < state.distance + 15; z += 0.5) {
        const p = project(0, 0.5, z - state.distance);
        if (p.y > HORIZON_Y) {
           const w = 120 * p.scale;
           // Edges
           ctx.beginPath(); ctx.moveTo(p.x - w, p.y); ctx.lineTo(p.x + w, p.y); ctx.stroke();
           // Central Yellow Line
           if (Math.floor(z * 4) % 2 === 0) {
              ctx.fillStyle = '#ffd700';
              ctx.fillRect(p.x - 2, p.y, 4, 15 * p.scale);
           }
        }
      }

      // Render Scenery (Palm Trees)
      state.scenery = state.scenery.filter(s => s.z > state.distance);
      state.scenery.forEach(s => {
        const p = project(s.x, 0.5, s.z - state.distance);
        if (p.y > HORIZON_Y) {
           // Draw Palm (Brown Trunk, Green Leaves)
           const sH = 100 * p.scale;
           ctx.fillStyle = '#5d4037'; // Trunk
           ctx.fillRect(p.x - 2*p.scale, p.y - sH, 4*p.scale, sH);
           ctx.font = `${Math.floor(80 * p.scale)}px Arial`;
           ctx.fillText('🌴', p.x - (40 * p.scale), p.y - sH + 10);
        }
      });

      // Render Items
      state.items = state.items.filter(item => item.z > state.distance && !item.collected);
      state.items.forEach(item => {
        const p = project(item.x, 0.5, item.z - state.distance);
        if (p.y > HORIZON_Y) {
           const size = 60 * p.scale;
           ctx.font = `${Math.floor(size)}px Arial`;
           ctx.fillText(item.type === 'watt' ? '💗' : '🚧', p.x - size/2, p.y);
           // Collision (only if not finished)
           if (!state.finishTriggered && Math.abs(item.z - state.distance - 0.5) < 0.2) {
              if (Math.abs(item.x - state.playerX) < 0.25) {
                 if (item.type === 'watt') {
                    item.collected = true;
                    setScore(s => s + 10);
                 } else {
                    setGameOver(true);
                    setIsPlaying(false);
                 }
              }
           }
        }
      });

      // Render Cyclist
      const pPlayer = project(state.playerX, 0.5, 0.5);
      drawCyclist(pPlayer.x, pPlayer.y, 1);

      // Finish Line Effect
      if (state.finishTriggered) {
         ctx.fillStyle = 'rgba(239, 80, 151, 0.3)';
         ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    if (isPlaying && !gameOver && !won && state.frames === 0) reset();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, gameOver, won]);

  return (
    <div 
      style={{ 
        position: 'relative', width: '100%', height: '350px', background: '#000', borderRadius: '16px', overflow: 'hidden',
        border: '4px solid #ef5097', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', touchAction: 'none'
      }}
      onMouseDown={() => { if(!isPlaying) setIsPlaying(true); }}
      onTouchStart={(e) => { if(!isPlaying) setIsPlaying(true); else inputRef.current.touchX = e.touches[0].clientX; }}
      onTouchEnd={() => inputRef.current.touchX = 0}
    >
      <canvas ref={canvasRef} width={600} height={350} style={{ width: '100%', height: '100%', display: 'block' }} />
      
      {/* UI Top */}
      <div style={{ position: 'absolute', top: '15px', left: '20px', display: 'flex', gap: '20px', color: '#fff', fontFamily: 'monospace', fontWeight: 900, textShadow: '2px 2px #000' }}>
         <div style={{ background: '#ef5097', padding: '5px 10px', borderRadius: '4px' }}>TIME: {timeLeft}s</div>
         <div style={{ background: '#333', padding: '5px 10px', borderRadius: '4px' }}>WATT: {score}</div>
      </div>

      {!isPlaying && !gameOver && !won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', flexDirection: 'column', textAlign: 'center' }}>
           <div style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '2px' }}>California Unlocked</div>
           <p style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '2rem' }}>10 SECOND MISSION • STAY IN CENTER TO WIN</p>
           <div style={{ background: '#ef5097', color: '#fff', padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 900, fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 0 20px #ef5097' }}>START</div>
        </div>
      )}

      {gameOver && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', flexDirection: 'column' }}>
           <h3 style={{ color: '#ff0055', fontSize: '2.5rem', fontWeight: 900 }}>CRASHED!</h3>
           <div onClick={() => setIsPlaying(true)} style={{ marginTop: '1.5rem', background: '#fff', color: '#000', padding: '0.8rem 2rem', borderRadius: '100px', fontWeight: 900, cursor: 'pointer' }}>RETRY</div>
        </div>
      )}

      {won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ef5097', flexDirection: 'column', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
           <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 950, textTransform: 'uppercase', lineHeight: 1 }}>NEW TEAM UNLOCKED</div>
           <div style={{ color: '#000', fontSize: '1.8rem', fontWeight: 950, textTransform: 'uppercase', marginTop: '0.5rem' }}>EF PRO CYCLING</div>
           <div style={{ height: '4px', width: '100px', background: '#fff', margin: '1.5rem 0' }}></div>
           <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MISSION PASSED: CALI-LEVEL 1</p>
           <div onClick={() => setIsPlaying(true)} style={{ marginTop: '2rem', background: '#000', color: '#fff', padding: '0.8rem 2.5rem', borderRadius: '100px', fontWeight: 900, cursor: 'pointer' }}>REPLAY</div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.1); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default LampertiGame;
