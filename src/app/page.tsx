'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LampertiGame = dynamic(() => import('./components/LampertiGame'), { ssr: false });

export default function EFPage() {
  const [fanName, setFanName] = useState('');
  const [fanId, setFanId] = useState('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setFanId(Math.floor(Math.random() * 100000).toString().padStart(6, '0'));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealVisible);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logoArea}>
            <div className={styles.efLogoContainer}>
               <img src="/Photo-Profil.jpg" alt="Paul Harrer" className={styles.navAvatar} />
               <img src="/EF-LOGO.png?v=1" alt="EF Logo" style={{ height: '30px', objectFit: 'contain' }} />
            </div>
            <div className={styles.candidateInfo}>
              <span className={styles.candidateName}>Paul Harrer</span>
              <span className={styles.candidateTitle}>Social Media Strategy Case Study</span>
            </div>
          </div>
          <div className={styles.navLinks}>
            <a href="#tdf">TDF Win</a>
            <a href="#lamperti">Lamperti</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.caseStudyTag}>EF PRO CYCLING 2025</div>
          <h1 className={styles.heroTitle}>
            BEYOND THE <span className={styles.heroPink}>FINISH LINE.</span><br />
            A CASE STUDY IN DIGITAL CULTURE.
          </h1>
          <p className={styles.heroSubtitle}>
            Harnessing the &quot;Pink Wave&quot; through strategic content, unconventional identity, and community-first growth.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
             <a href="#tdf" className={styles.ctaButton}>View Case Study</a>
          </div>
        </div>
      </section>

      {/* TASK 1: TDF STAGE WIN */}
      <section id="tdf" className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.caseStudyTag}>TASK 1: CONTENT PACKAGE</div>
        <h2 className={styles.sectionTitle}>
          TOUR DE FRANCE: <br />
          <span className={styles.heroPink}>STAGE 6 VICTORY.</span>
        </h2>
        
        {/* Strategic Roadmap for Task 1 */}
        <div style={{ background: '#000', color: '#fff', padding: '2rem', borderRadius: '24px', marginBottom: '4rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
           <div style={{ flex: 1 }}>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Strategic Roadmap: The &quot;Afterglow&quot; Loop</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
                A multi-layered deployment strategy focused on immediate dominance, deep engagement, and sensory immersion. 
                Instead of a simple recap, we create a 3-hour narrative arc that keeps the audience in our ecosystem.
              </p>
           </div>
           <div style={{ display: 'flex', gap: '1rem', textAlign: 'center' }}>
              <div style={{ background: '#222', padding: '0.8rem', borderRadius: '12px', minWidth: '70px' }}>
                <div style={{ color: 'var(--ef-pink)', fontWeight: 900 }}>T-0</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>IMPACT</div>
              </div>
              <div style={{ background: '#222', padding: '0.8rem', borderRadius: '12px', minWidth: '70px' }}>
                <div style={{ color: 'var(--ef-pink)', fontWeight: 900 }}>T+1h</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>STORY</div>
              </div>
              <div style={{ background: '#222', padding: '0.8rem', borderRadius: '12px', minWidth: '70px' }}>
                <div style={{ color: 'var(--ef-pink)', fontWeight: 900 }}>T+3h</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>IMMERSION</div>
              </div>
           </div>
        </div>

        {/* DELIVERY A: T-0 IMPACT */}
        <div className={`${styles.grid2Col} ${styles.deliverySection}`}>
          <div>
            <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY A: T-0 INSTANT GRAPHIC</div>
            <h3>The &quot;Ours&quot; Statement</h3>
            <p><strong>Format:</strong> Static Vertical (4:5).</p>
            
            <div className={styles.captionBox}>
              <strong>Proposed Caption:</strong>
              Stage 6? Ours. 💗👊 <br /><br />
              Healy claimed it. We owned it. The Pink Wave is here. <br /><br />
              #EFProCycling #TDF2025 #PinkHeartsClub
            </div>

            <div className={styles.insightCard}>
              <h4>Strategic Insight: The &quot;Why&quot;</h4>
              <p>At T-0 (the exact second the line is crossed), speed beats everything. We provide two visual options: <strong>Option 1</strong> (High-Contrast Text) for maximum readability, or <strong>Option 2</strong> (Iconic Argyle Pattern) for brand-first storytelling. Both claim the win before any official photo is available.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
             <div style={{ flex: 1 }}>
                <img src="/case-study/ours-1.png" alt="Ours Graphic Option 1" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }} />
                <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '0.5rem', opacity: 0.6 }}>Option 1: Bold Statement</p>
             </div>
             <div style={{ flex: 1 }}>
                <img src="/case-study/ours-2.png" alt="Ours Graphic Option 2" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }} />
                <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '0.5rem', opacity: 0.6 }}>Option 2: Brand Identity</p>
             </div>
          </div>
        </div>

        {/* DELIVERY B: T+1h STORY */}
        <div className={`${styles.deliverySection}`}>
          <div className={styles.grid2Col}>
            <div>
              <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY B: T+1h STORYTELLING CAROUSEL</div>
              <h3>The &quot;Royal Flush&quot; Sequence</h3>
              <p><strong>Format:</strong> 5-Slide Immersive Carousel (4:5).</p>
              
              <div className={styles.captionBox}>
                <strong>Proposed Caption:</strong>
                More than just a win. It’s everything. 💗🥺 <br /><br />
                Today, Ben Healy gave it all back. The tears? The relief of sacrifice. The hug? The brotherhood of a team that never stopped believing. <br /><br />
                This is what it takes. #PinkHeartsClub #StageWin
              </div>

              <div className={styles.insightCard}>
                <h4>Strategic Insight: The &quot;Why&quot;</h4>
                <p>One hour later, we pivot to storytelling. This carousel presents a &quot;Royal Flush&quot;—a full 5-card poker hand of graphics that bridge the gap between art and action. It positions the rider as the master of the race, rewarding the user&apos;s deep engagement with a complete, collectible visual sequence.</p>
              </div>
            </div>
            
            <div className={styles.carouselContainer}>
              <div className={styles.carouselItem}><img src="/case-study/card-1.png" alt="Poker Card 1" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-2.png" alt="Poker Card 2" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-3.png" alt="Poker Card 3" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-4.png" alt="Poker Card 4" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-5.png" alt="Poker Card 5" /></div>
            </div>
          </div>
        </div>

        {/* DELIVERY C: T+3h IMMERSION */}
        <div className={`${styles.grid2Col} ${styles.deliverySection}`} style={{ borderBottom: 'none' }}>
          <div>
            <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY C: T+3h SENSORY REEL</div>
            <h3>The &quot;Sound of Victory&quot;</h3>
            <p><strong>Format:</strong> Vertical 9:16 (Reel/TikTok).</p>
            
            <div className={styles.captionBox}>
              <strong>Proposed Caption:</strong>
              No music. Just the music of the race. 🚲💨 <br /><br />
              Turn your volume UP for the raw ASMR of the final kilometer. The gears, the breath, the roar. <br /><br />
              Experience it like you were there. #TDFSound #EFProCycling
            </div>

            <div className={styles.insightCard}>
              <h4>Strategic Insight: The &quot;Why&quot;</h4>
              <p>Three hours post-race, we offer &quot;The Slow Down&quot;. No music, no fancy transitions—just high-fidelity raw audio. It establishes EF as a brand that respects the pure sounds of the sport, creating a premium experience for fans.</p>
            </div>
          </div>

          <div className={styles.videoSection} style={{ aspectRatio: '9 / 16', maxWidth: '350px', margin: '0 auto' }}>
             <video 
               className={styles.videoPlayer} 
               controls 
               poster="/case-study/card-2.png"
             >
               <source src="/case-study/TDF-Victory-Reel-New.mov" type="video/mp4" />
             </video>
          </div>
        </div>
      </section>

      {/* TASK 2: LUKE LAMPERTI */}
      <section id="lamperti" className={`${styles.section} ${styles.reveal}`} style={{ backgroundColor: '#000', color: '#fff' }}>
        <div className={styles.caseStudyTag}>TASK 2: RIDER ANNOUNCEMENT</div>
        <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>
          ANNOUNCING <span className={styles.heroPink}>LUKE LAMPERTI.</span>
        </h2>
        
        {/* Strategic Overview for Task 2 */}
        <div style={{ borderLeft: '2px solid #333', paddingLeft: '2rem', marginBottom: '4rem' }}>
           <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>The Challenge: The Contract Constraint</h3>
           <p style={{ color: '#aaa', fontSize: '0.9rem', maxWidth: '800px' }}>
              How to launch a major American signing while he is still under contract with another team? 
              We cannot show him in the EF kit, so we lean into a &quot;Blackout&quot; and &quot;Transition&quot; narrative. 
              Instead of hiding the old colors, we aggressively &quot;Paint it Pink&quot;.
           </p>
        </div>

        {/* DELIVERY A: THE ANNOUNCEMENT GRAPHIC */}
        <div className={`${styles.grid2Col} ${styles.deliverySection}`} style={{ borderColor: '#222' }}>
          <div>
            <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY A: ANNOUNCEMENT GRAPHIC</div>
            <h3 style={{ color: '#fff' }}>The &quot;Takeover&quot; Visual</h3>
            <p style={{ color: '#888' }}><strong>Format:</strong> Static Vertical (4:5) / X / Instagram Feed.</p>
            
            <div className={styles.captionBox} style={{ background: '#111', color: '#fff', borderColor: '#333' }}>
              <strong style={{ color: '#ef5097' }}>Proposed Caption:</strong>
              The future? It&apos;s Pink. 💗🇺🇸 <br /><br />
              Beyond excited to announce that American sensation Luke Lamperti is joining the EF Pro Cycling family. A rider who defines grit, speed, and the new generation of US cycling. <br /><br />
              The journey starts now. Welcome to the Pink Wave, Luke. 🌊👊 <br /><br />
              #EFProCycling #LukeLamperti #PinkPanthers #NewSigning #Cycling
            </div>

            <div className={styles.insightCard} style={{ background: '#111', borderLeftColor: '#ef5097' }}>
              <h4 style={{ color: '#ef5097' }}>Strategic Insight: The &quot;Why&quot;</h4>
              <p style={{ color: '#aaa' }}>Contractual constraints are turned into a brand advantage. By using high-contrast B&W imagery with aggressive Pink brush strokes, we visually &quot;reclaim&quot; the rider. It signals a new era for both the athlete and the team, creating a high-impact fashion-editorial aesthetic that stands out on the feed.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
             <div style={{ maxWidth: '450px', width: '100%' }}>
                <img src="/case-study/lamperti-final.png" alt="Luke Lamperti Announcement" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }} />
                <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '1rem', color: '#666' }}>Final Selection: The &quot;Paint it Pink&quot; Statement</p>
             </div>
          </div>
        </div>

        {/* DELIVERY B: THE VIDEO CONCEPT */}
        <div className={styles.deliverySection} style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div className={styles.grid2Col}>
            <div>
              <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY B: VIDEO CONCEPT</div>
              <h3 style={{ color: '#fff' }}>Concept: &quot;California Unlocked&quot;</h3>
              <p style={{ color: '#888' }}><strong>Format:</strong> 45-second Short-form (9:16 / 4:5 hybrid).</p>
              
              <div className={styles.insightCard} style={{ background: '#111', borderLeftColor: '#ef5097' }}>
                <h4 style={{ color: '#ef5097' }}>The Pitch</h4>
                <p style={{ color: '#aaa' }}>How do we announce a top-tier American talent without his new kit? By leaning into his heritage rather than his jersey. &quot;California Unlocked&quot; is a high-octane video that merges the iconic &quot;Californication&quot; (RHCP) music video aesthetic with GTA-inspired gaming codes.</p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>The &quot;Why&quot; it works:</h4>
                <ul style={{ color: '#888', fontSize: '0.85rem', listStyleType: 'square', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                  <li><strong style={{ color: '#fff' }}>Neutralizes the Constraint:</strong> The USA National kit feels like a &quot;National Pride&quot; statement rather than a placeholder.</li>
                  <li><strong style={{ color: '#fff' }}>Cultural Bridge:</strong> Connects the team&apos;s American roots with global pop-culture and gaming communities.</li>
                  <li><strong style={{ color: '#fff' }}>Viral Storytelling:</strong> Moves away from standard interviews to create a high-retention piece of digital art.</li>
                </ul>
              </div>
            </div>

            <div style={{ background: '#111', borderRadius: '24px', padding: '2rem', border: '1px solid #222' }}>
              <h4 style={{ color: '#ef5097', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Playable Prototype: Mission Concept</h4>
              
              <div style={{ marginBottom: '2rem' }}>
                 <LampertiGame />
                 <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>
                    *Interactive Concept: Prove your skill to unlock the new rider.
                 </p>
              </div>

              <h4 style={{ color: '#ef5097', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>The Script (45&quot;)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.3rem' }}>00-10” | CHARACTER SELECTION</div>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Luke &quot;glitches&quot; into frame. UI text: <span style={{ color: '#ef5097' }}>SELECT RIDER: LAMPERTI</span>. Vaporwave sunset background.</p>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.3rem' }}>10-35” | THE MISSION</div>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Dynamic shots of Luke riding through San Francisco-style hills. Each checkpoint flashes EF Pink. Gaming UI: Pink Stamina bar, EF mini-map.</p>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.3rem' }}>35-45” | MISSION PASSED</div>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Luke crosses a digital finish line. Screen freeze-frame with the message: <span style={{ color: '#ef5097' }}>&quot;NEW TEAM UNLOCKED&quot;</span>.</p>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #222' }}>
                <h4 style={{ color: '#fff', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1rem' }}>Visual Reference: RHCP Style</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
                  <iframe 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    src="https://www.youtube.com/embed/YlUKcNNmywk" 
                    title="Californication Reference"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TASK 3: COMMUNITY ROADMAP */}
      <section id="roadmap" className={`${styles.section} ${styles.reveal}`}>
        <div className={styles.caseStudyTag}>TASK 3: COMMUNITY & GROWTH</div>
        <h2 className={styles.sectionTitle}>
          BEYOND THE RECAP: <br />
          <span className={styles.heroPink}>BUILDING A LEGACY.</span>
        </h2>
        
        <div className={styles.strategyGrid}>
          <div className={styles.strategyCard}>
            <span className={styles.tag}>Pillar 1</span>
            <h3>The &quot;Coffee Stop&quot;</h3>
            <p>Lifestyle-first content. Talking about everything except cycling. Humanizing riders through their habits, music, and culture.</p>
          </div>
          <div className={styles.strategyCard}>
            <span className={styles.tag}>Pillar 2</span>
            <h3>&quot;Inside the Bus&quot;</h3>
            <p>Raw, unedited pre-race talks and post-race debriefs. Exclusive access that builds a sense of belonging for the fans.</p>
          </div>
          <div className={styles.strategyCard}>
            <span className={styles.tag}>Pillar 3</span>
            <h3>&quot;Fan-Designed Route&quot;</h3>
            <p>Interactive storytelling. Fans voting on gear colors, training playlists, or challenge destinations.</p>
          </div>
        </div>

        {/* Prototype Interactif: Fan-ID */}
        <div className={styles.generatorSection} style={{ marginTop: '4rem' }}>
          <div className={styles.generatorForm}>
            <h3>Interactive Concept: Fan-ID</h3>
            <p>Scaling personal engagement through automation. Every fan can generate their unique &quot;Pink Panthers&quot; membership card.</p>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                placeholder="Type your name..." 
                value={fanName}
                onChange={(e) => setFanName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.fanIdPreview}>
             <div className={styles.fanIdBg}>
                <img src="/ef-assets/culture-2.webp?v=1" alt="Card Background" />
             </div>
            <div className={styles.fanIdHeader} style={{ position: 'relative', zIndex: 1 }}>
              <div className={styles.fanIdLogo}>
                <img src="/EF-LOGO.png?v=1" alt="EF Logo" style={{ height: '20px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className={styles.fanIdType}>PINK PANTHERS CLUB</div>
            </div>
            <div className={styles.fanIdName} style={{ position: 'relative', zIndex: 1 }}>
              {fanName || "YOUR NAME"}
            </div>
            <div className={styles.fanIdFooter} style={{ position: 'relative', zIndex: 1 }}>
              <div className={styles.fanIdNumber}>
                ID #{mounted ? fanId : '------'}
              </div>
              <div style={{ fontSize: '0.6rem', opacity: 0.8, textAlign: 'right' }}>
                DIGITAL PASS 2025<br />STUDY CASE PROTOTYPE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#000', color: '#fff' }}>
        <div className={`${styles.reveal}`}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Ready to launch the <span className={styles.heroPink}>Pink Wave.</span></h2>
          <div style={{ marginBottom: '3rem' }}>
             <img src="/Photo-Profil.jpg" alt="Paul Harrer" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ef5097' }} />
             <p style={{ marginTop: '1rem', fontWeight: 600 }}>Paul Harrer</p>
             <p style={{ color: '#666', fontSize: '0.9rem' }}>Social Media Manager Candidate</p>
          </div>
          <a href="mailto:paulharrer@hotmail.com" className={styles.ctaButton}>Connect</a>
        </div>
      </footer>
    </main>
  );
}
