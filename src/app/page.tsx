'use client';
import { useState, useEffect } from 'react';
import styles from './ef.module.css';

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
        <p className={styles.sectionSubtitle}>
          Moving beyond a standard race recap to create an iconic visual object. High-impact graphics, raw emotions, and immersive sound.
        </p>

        <div className={styles.carouselContainer}>
          <div className={styles.carouselItem}><img src="/case-study/1.png" alt="Slide 1 - Graphic" /></div>
          <div className={styles.carouselItem}><img src="/case-study/2.png" alt="Slide 2 - Victory" /></div>
          <div className={styles.carouselItem}><img src="/case-study/3.png" alt="Slide 3 - Emotion" /></div>
          <div className={styles.carouselItem}><img src="/case-study/4.png" alt="Slide 4 - Peloton" /></div>
          <div className={styles.carouselItem}><img src="/case-study/5.png" alt="Slide 5 - Podium" /></div>
        </div>

        <div className={styles.grid2Col}>
          <div>
            <h3>The &quot;Royal Flush&quot; Concept</h3>
            <p>Utilizing the &quot;Argyle King&quot; design asset to position Ben Healy as the master of the race. This isn&apos;t just a photo; it&apos;s a collector&apos;s item for the #PinkHeartsClub.</p>
            <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem' }}>
              <strong>Caption Strategy:</strong> Focus on &quot;Grit&quot; and &quot;Humanity&quot;.
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666' }}>&quot;This sport asks for everything you have. Your legs, your heart, your sanity. Sometimes, it takes more.&quot;</p>
            </div>
          </div>
          <div className={styles.videoSection}>
             <video 
               className={styles.videoPlayer} 
               controls 
               poster="/case-study/2.png"
             >
               <source src="/case-study/TDF-Victory-Reel.mov" type="video/mp4" />
               Your browser does not support the video tag.
             </video>
             <div className={styles.videoOverlay}>
                <span className={styles.caseStudyTag}>The Sound of Victory (Reel)</span>
             </div>
          </div>
        </div>
      </section>

      {/* TASK 2: LUKE LAMPERTI */}
      <section id="lamperti" className={`${styles.section} ${styles.reveal}`} style={{ backgroundColor: '#000', color: '#fff' }}>
        <div className={styles.caseStudyTag}>TASK 2: RIDER ANNOUNCEMENT</div>
        <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>
          ANNOUNCING <span className={styles.heroPink}>LUKE LAMPERTI.</span>
        </h2>
        <p className={styles.sectionSubtitle} style={{ color: '#aaa' }}>
          How to launch a new American star when he&apos;s still under contract with his old team. 
        </p>

        <div className={styles.grid2Col}>
           <div style={{ background: '#111', borderRadius: '24px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3>&quot;The Takeover&quot; Strategy</h3>
              <p style={{ color: '#888' }}>Instead of hiding the Soudal-Quickstep kit, we lean into the transition. High-contrast Black & White portraits with aggressive &quot;Pink Wave&quot; brush strokes over the old colors.</p>
              <ul style={{ color: '#888', marginTop: '1rem', listStyleType: 'square' }}>
                <li><strong>Identity:</strong> Paint it Pink.</li>
                <li><strong>Narrative:</strong> From Blue to Pink. The future is here.</li>
                <li><strong>Impact:</strong> Fashion-editorial style announcement.</li>
              </ul>
           </div>
           <div style={{ background: '#111', borderRadius: '24px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #333' }}>
              <h3>Video Concept: &quot;Blackout Session&quot;</h3>
              <p style={{ color: '#888' }}>A 30s teaser featuring Luke on a matte black Cannondale, wearing unbranded blackout kit. Flashy pink glitches appearing as he passes the lens.</p>
              <div className={styles.caseStudyTag} style={{ marginTop: '1rem', background: '#333' }}>Teaser Vibe: High-Speed Mystery</div>
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
