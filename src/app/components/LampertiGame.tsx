'use client';
import { useEffect, useRef, useState } from 'react';

const LampertiGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  // Input Ref for bridge
  const inputRef = useRef({ left: false, right: false, touchX: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // --- GAME CONSTANTS ---
    const HORIZON_Y = canvas.height * 0.45;
    const ROAD_COLORS = { light: '#1a0b2e', dark: '#11051b', line: '#ef5097' };
    
    // --- MUTABLE STATE ---
    const state = {
      playerX: 0, // -1 to 1
      playerTilt: 0,
      speed: 0,
      maxSpeed: 0.12,
      acceleration: 0.004,
      distance: 0,
      items: [] as any[],
      scenery: [] as any[],
      frames: 0,
      pedalAngle: 0
    };

    const reset = () => {
      state.playerX = 0;
      state.playerTilt = 0;
      state.speed = 0;
      state.distance = 0;
      state.items = [];
      state.scenery = [];
      state.frames = 0;
      setScore(0);
      setGameOver(false);
      setWon(false);
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
      ctx.scale(scale * 1.5, scale * 1.5);
      
      // Tilt effect
      ctx.rotate(state.playerTilt * 0.2);

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(0, 5, 15, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rear Wheel
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Frame (Bike)
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, -15); // Seat post
      ctx.stroke();

      // Legs (Pedaling animation)
      const legY = Math.sin(state.pedalAngle) * 5;
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 4;
      // Left Leg
      ctx.beginPath();
      ctx.moveTo(-5, -10); ctx.lineTo(-8, -5 + legY);
      ctx.stroke();
      // Right Leg
      ctx.beginPath();
      ctx.moveTo(5, -10); ctx.lineTo(8, -5 - legY);
      ctx.stroke();

      // Torso (EF Pink Jersey)
      ctx.fillStyle = '#ef5097';
      ctx.beginPath();
      ctx.roundRect(-8, -25, 16, 12, 4);
      ctx.fill();
      // Back details (pockets)
      ctx.fillStyle = '#d63384';
      ctx.fillRect(-6, -18, 5, 4);
      ctx.fillRect(1, -18, 5, 4);

      // Helmet (EF White/Pink)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, -28, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef5097';
      ctx.fillRect(-6, -28, 12, 2);

      ctx.restore();
    };

    const drawBackground = () => {
      // Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
      skyGrad.addColorStop(0, '#0a0212');
      skyGrad.addColorStop(1, '#4a0e3a');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, HORIZON_Y);

      // Retro Sun
      ctx.beginPath();
      ctx.arc(canvas.width / 2, HORIZON_Y, 60, 0, Math.PI, true);
      const sunGrad = ctx.createLinearGradient(0, HORIZON_Y - 60, 0, HORIZON_Y);
      sunGrad.addColorStop(0, '#ffff00');
      sunGrad.addColorStop(1, '#ff0080');
      ctx.fillStyle = sunGrad;
      ctx.fill();
      
      // Sun stripes (Retro effect)
      ctx.fillStyle = '#0a0212';
      for(let i=1; i<5; i++) {
        ctx.fillRect(canvas.width/2 - 70, HORIZON_Y - (i * 12), 140, 2);
      }

      // Distant Mountains
      ctx.fillStyle = '#1a0633';
      ctx.beginPath();
      ctx.moveTo(0, HORIZON_Y);
      ctx.lineTo(100, HORIZON_Y - 30); ctx.lineTo(200, HORIZON_Y - 10);
      ctx.lineTo(350, HORIZON_Y - 40); ctx.lineTo(500, HORIZON_Y - 15);
      ctx.lineTo(600, HORIZON_Y);
      ctx.fill();
    };

    const loop = () => {
      if (isPlaying && !gameOver && !won) {
        // Controls
        let targetTilt = 0;
        if (inputRef.current.left) { state.playerX -= 0.04; targetTilt = -1; }
        if (inputRef.current.right) { state.playerX += 0.04; targetTilt = 1; }
        
        if (inputRef.current.touchX !== 0) {
           const center = canvas.width / 2;
           if (inputRef.current.touchX < center) { state.playerX -= 0.04; targetTilt = -1; }
           else { state.playerX += 0.04; targetTilt = 1; }
        }

        state.playerTilt += (targetTilt - state.playerTilt) * 0.1;
        state.playerX = Math.max(-0.85, Math.min(0.85, state.playerX));

        // Speed & Distance
        state.speed = Math.min(state.maxSpeed, state.speed + state.acceleration);
        state.distance += state.speed;
        state.frames++;
        state.pedalAngle += state.speed * 10;

        // Spawning
        if (state.frames % 40 === 0) {
           state.scenery.push({ x: -1.2, z: state.distance + 15, type: 'palm' });
           state.scenery.push({ x: 1.2, z: state.distance + 15, type: 'palm' });
        }
        if (state.frames % 50 === 0) {
           const lane = Math.floor(Math.random() * 3) - 1;
           const isBonus = Math.random() > 0.4;
           state.items.push({ x: lane * 0.5, z: state.distance + 15, type: isBonus ? 'watt' : 'barrier', collected: false });
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();

      // Road Ground
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, HORIZON_Y, canvas.width, canvas.height - HORIZON_Y);

      // Road Lines (Perspective)
      ctx.strokeStyle = 'rgba(239, 80, 151, 0.3)';
      ctx.lineWidth = 2;
      for (let z = Math.floor(state.distance); z < state.distance + 15; z += 1) {
        const p = project(0, 0.5, z - state.distance);
        if (p.y > HORIZON_Y) {
           const width = 100 * p.scale;
           // Side lines
           ctx.beginPath();
           ctx.moveTo(p.x - width, p.y); ctx.lineTo(p.x + width, p.y);
           ctx.stroke();
           // Central dashed line
           if (Math.floor(z * 2) % 2 === 0) {
              ctx.fillStyle = '#ef5097';
              ctx.fillRect(p.x - 2, p.y, 4, 10 * p.scale);
           }
        }
      }

      // Render Scenery
      state.scenery = state.scenery.filter(s => s.z > state.distance);
      state.scenery.forEach(s => {
        const p = project(s.x, 0.5, s.z - state.distance);
        if (p.y > HORIZON_Y) {
           ctx.font = `${Math.floor(80 * p.scale)}px Arial`;
           ctx.fillText('🌴', p.x - (30 * p.scale), p.y);
        }
      });

      // Render Items
      state.items = state.items.filter(item => item.z > state.distance && !item.collected);
      state.items.forEach(item => {
        const p = project(item.x, 0.5, item.z - state.distance);
        if (p.y > HORIZON_Y) {
           const size = 50 * p.scale;
           ctx.font = `${Math.floor(size)}px Arial`;
           ctx.fillText(item.type === 'watt' ? '💗' : '🚧', p.x - size/2, p.y);

           // Collision
           const relZ = item.z - state.distance;
           if (relZ < 0.6 && relZ > 0.2) {
              if (Math.abs(item.x - state.playerX) < 0.2) {
                 if (item.type === 'watt') {
                    item.collected = true;
                    setScore(s => {
                       const next = s + 10;
                       if (next >= 100) { setWon(true); setIsPlaying(false); }
                       return next;
                    });
                 } else {
                    setGameOver(true);
                    setIsPlaying(false);
                 }
              }
           }
        }
      });

      // Render Cyclist (Luke)
      const pPlayer = project(state.playerX, 0.5, 0.5);
      drawCyclist(pPlayer.x, pPlayer.y, 1);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    if (isPlaying && !gameOver && !won && state.frames === 0) reset();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, gameOver, won]);

  const handleInteraction = (e: any) => {
    if (!isPlaying) setIsPlaying(true);
    else inputRef.current.touchX = e.clientX;
  };

  return (
    <div 
      style={{ 
        position: 'relative', width: '100%', height: '350px', background: '#000', borderRadius: '16px', overflow: 'hidden',
        border: '3px solid #ef5097', boxShadow: '0 0 30px rgba(239, 80, 151, 0.5)', touchAction: 'none'
      }}
      onMouseDown={() => { if(!isPlaying) setIsPlaying(true); }}
      onTouchStart={(e) => { if(!isPlaying) setIsPlaying(true); else inputRef.current.touchX = e.touches[0].clientX; }}
      onTouchEnd={() => inputRef.current.touchX = 0}
    >
      <canvas ref={canvasRef} width={600} height={350} style={{ width: '100%', height: '100%', display: 'block' }} />
      
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#fff', fontFamily: 'monospace', fontWeight: 900, fontSize: '1.2rem', textShadow: '2px 2px #ff0080' }}>
         HYPE: {score}%
      </div>

      {!isPlaying && !gameOver && !won && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', flexDirection: 'column', textAlign: 'center', padding: '2rem' }}>
           <h3 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '1.5rem', marginBottom: '1rem' }}>CALIFORNIA UNLOCKED</h3>
           <div style={{ background: '#ef5097', color: '#fff', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', animation: 'pulse 1s infinite' }}>START MISSION</div>
           <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '1.5rem' }}>ARROWS OR TAP TO STEER • COLLECT 100% HYPE</p>
        </div>
      )}

      {(gameOver || won) && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)', flexDirection: 'column' }}>
           <h3 style={{ color: won ? '#ef5097' : '#ff0055', fontSize: '2.5rem', textTransform: 'uppercase', fontWeight: 900 }}>{won ? 'MISSION PASSED' : 'CRASHED!'}</h3>
           <p style={{ color: '#fff', marginBottom: '1.5rem' }}>{won ? 'LUKE LAMPERTI UNLOCKED 🔓' : 'Contract negotiations failed.'}</p>
           <div onClick={() => setIsPlaying(true)} style={{ background: '#fff', color: '#000', padding: '1rem 2rem', borderRadius: '4px', fontWeight: 900, cursor: 'pointer' }}>{won ? 'PLAY AGAIN' : 'RETRY'}</div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default LampertiGame;
