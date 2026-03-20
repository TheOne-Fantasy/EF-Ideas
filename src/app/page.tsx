'use client';
import { useState, useEffect } from 'react';
import styles from './ef.module.css';

export default function EFPage() {
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
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Strategic Roadmap</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', margin: 0 }}>
                A multi-layered deployment strategy focused on immediate dominance, deep engagement, and sensory immersion. 
                Instead of a simple recap, we create a narrative arc that keeps the audience in our ecosystem.
              </p>
           </div>
           <div style={{ display: 'flex', gap: '1rem', textAlign: 'center' }}>
              <div style={{ background: '#222', padding: '0.8rem', borderRadius: '12px', minWidth: '70px' }}>
                <div style={{ color: 'var(--ef-pink)', fontWeight: 900 }}>T-0</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>IMPACT</div>
              </div>
              <div style={{ background: '#222', padding: '0.8rem', borderRadius: '12px', minWidth: '70px' }}>
                <div style={{ color: 'var(--ef-pink)', fontWeight: 900 }}>T +30-60 min</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>STORY</div>
              </div>
              <div style={{ background: '#222', padding: '0.8rem', borderRadius: '12px', minWidth: '70px' }}>
                <div style={{ color: 'var(--ef-pink)', fontWeight: 900 }}>T +2h</div>
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
              NO WORDS. JUST PINK. 💗🏁<br /><br />
              Stage 6 is OURS. Ben Healy just silenced the world. <br /><br />
              #EFProCycling #TDF2025 #PinkSnap
            </div>

            <div className={styles.insightCard}>
              <h4>Strategic Insight: The &quot;Why&quot;</h4>
              <p>At T-0, speed is everything. This post is not just a static image, it is a fast edit based on a pre-made template. The goal is to be the first to post the second the rider crosses the line. By having the design ready in advance, I can just drop in the right photo and post immediately. This workflow allows us to beat the news cycle and stand out with a bold, branded look instead of a generic race photo.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
             <div style={{ flex: 1 }}>
                <img src="/case-study/ours-1.png" alt="Ours Graphic Option 1" className={styles.staticPost} />
                <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '0.75rem', opacity: 0.6 }}>Option 1: Bold Statement</p>
             </div>
             <div style={{ flex: 1 }}>
                <img src="/case-study/ours-2.png" alt="Ours Graphic Option 2" className={styles.staticPost} />
                <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '0.75rem', opacity: 0.6 }}>Option 2: Brand Identity</p>
             </div>
          </div>
        </div>

        {/* DELIVERY B: T +30-60 min STORY */}
        <div className={`${styles.deliverySection}`}>
          <div className={styles.grid2Col}>
            <div>
              <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY B: T +30-60 min STORYTELLING CAROUSEL</div>
              <h3>The &quot;Royal Flush&quot; Sequence</h3>
              <p><strong>Format:</strong> 4-Slide Immersive Carousel (4:5).</p>
              
              <div className={styles.captionBox}>
                <strong>Proposed Caption:</strong>
                A Royal Flush in the French mountains. 🃏💗<br /><br />
                We didn’t just play the game; we owned the table today. Ben Healy played his cards perfectly to take Stage 6.<br /><br />
                Swipe to see how we took the pot. 💰🏁<br /><br />
                #EFProCycling #TDF2026 #PinkSnap
              </div>

              <div className={styles.insightCard}>
                <h4>Strategic Insight: The &quot;Why&quot;</h4>
                <p>The goal of this carousel is to turn a race win into a story using the &quot;Royal Flush&quot; metaphor. First, I chose the carousel format to increase engagement. By having 5 slides, we make fans spend more time on our post which always engaged more. Second, the poker theme fits the EF identity perfectly. Pro cycling is not just about legs; it is about strategy, bluffing, and taking risks. Using the &quot;Royal Flush&quot; reminds all those things. It shows that today, we played our cards perfectly to win the pot.</p>
              </div>            </div>
            
            <div className={styles.carouselContainer}>
              <div className={styles.carouselItem}><img src="/case-study/card-1.png" alt="Poker Card 1" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-2.png" alt="Poker Card 2" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-3.png" alt="Poker Card 3" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-4.png" alt="Poker Card 4" /></div>
              <div className={styles.carouselItem}><img src="/case-study/card-5.png" alt="Poker Card 5" /></div>
            </div>
          </div>
        </div>

        {/* DELIVERY C: T +2h IMMERSION */}
        <div className={`${styles.grid2Col} ${styles.deliverySection}`} style={{ borderBottom: 'none' }}>
          <div>
            <div className={styles.caseStudyTag} style={{ background: '#333' }}>DELIVERY C: T +2h SENSORY REEL</div>
            <h3>The &quot;Sound of Victory&quot;</h3>
            <p><strong>Format:</strong> Vertical 9:16 (Reel/TikTok).</p>
            
            <div className={styles.captionBox}>
              <strong>Proposed Caption:</strong>
              The raw emotion of Stage 6. 💗🥺<br /><br />
              How does it feel to win at the Tour ? <br /><br />
              #EFProCycling #TDF2026 #BenHealy #PinkSnap
            </div>

            <div className={styles.insightCard}>
              <h4>Strategic Insight: The &quot;Why&quot;</h4>
              <p>The goal is retention through storytelling. I used a &quot;Question-Payoff&quot; structure to keep fans watching until the very end. Starting with a personal question to Ben Healy creates curiosity. Finishing with his answer provides the emotional reward. This format is more powerful than a basic highlights video. It humanizes the rider and builds a real connection with the community. Strategically, it maximizes &quot;Watch Time,&quot; which is the most important signal for the Instagram algorithm.</p>
            </div>
          </div>

          <div className={styles.videoSection}>
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
              The future is pink. 💗🇺🇸 <br /><br />
              Beyond excited to announce that American sensation Luke Lamperti is joining the EF Pro Cycling family. A rider who defines grit, speed, and the new generation of US cycling. <br /><br />
              The journey starts now. Welcome to the Pink Wave, Luke. 🌊👊 <br /><br />
              #EFProCycling #LukeLamperti #PinkSnap #NewSigning #Cycling
            </div>

            <div className={styles.insightCard} style={{ background: '#111', color: '#fff' }}>
              <h4 style={{ color: '#ef5097' }}>Strategic Insight: The &quot;Why&quot;</h4>
              <p style={{ color: '#aaa' }}>The goal was to create a high-impact, editorial announcement. I chose to use high-contrast Black and White to neutralize the old team kit and give the content a stronger personality. This allows the EF brand identity to dominate the visual. I added strategic touches of pink and played with layers and transparency to create a premium, multi-dimensional look. Instead of a standard sports announcement, it feels like a fashion magazine cover.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
             <div style={{ maxWidth: '400px', width: '100%' }}>
                <img src="/case-study/lamperti-final.png" alt="Luke Lamperti Announcement" className={styles.staticPost} style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }} />
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
              <p style={{ color: '#888' }}><strong>Format:</strong> 30-second Short-form (9:16 / 4:5 hybrid).</p>
              
              <div className={styles.insightCard} style={{ background: '#111', color: '#fff' }}>
                <h4 style={{ color: '#ef5097' }}>The Pitch</h4>
                <p style={{ color: '#aaa' }}>A 30-second vertical video. It blends the cel-shaded look of the RHCP &apos;Californication&apos; music video with the world of GTA. We follow Luke’s avatar collecting EF power-ups along the road until the finish line. The video ends with a &apos;New Team Unlocked : ‘EF Pro Cycling’ screen to officially announce his recruitment.</p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>The &quot;Why&quot; it works:</h4>
                <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  This concept turns a contract constraint into a strategic brand win. Using the USA kit and gaming graphics celebrates Luke’s roots while keeping the focus on EF&apos;s identity. It replaces standard interviews with high-retention digital art designed for virality. This approach bridges cycling and pop culture to maximize global engagement and reach a younger audience.
                </p>
              </div>

              <div className={styles.captionBox} style={{ background: '#111', color: '#fff', borderColor: '#333' }}>
                <strong style={{ color: '#ef5097' }}>Proposed Caption:</strong>
                We really got Luke Lamperti at EF before GTA 6. 🤯🎮💗<br /><br />
                #EFProCycling #GTA6 #LukeLamperti #PinkSnap
              </div>
            </div>

            <div style={{ background: '#111', borderRadius: '24px', padding: '2rem', border: '1px solid #222' }}>
              <h4 style={{ color: '#ef5097', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>The Script (30&quot;)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.3rem' }}>00-05” | CHARACTER SELECTION</div>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Luke &quot;glitches&quot; into frame. UI text: <span style={{ color: '#ef5097' }}>SELECT RIDER: LAMPERTI</span>. Vaporwave sunset background.</p>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.3rem' }}>05-20” | THE MISSION</div>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Dynamic shots of Luke riding through San Francisco-style hills. Each checkpoint flashes EF Pink. Gaming UI: Pink Stamina bar, EF mini-map.</p>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 900, marginBottom: '0.3rem' }}>20-30” | MISSION PASSED & REVEAL</div>
                  <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Luke crosses a digital finish line. Screen freeze-frame with the message: <span style={{ color: '#ef5097' }}>&quot;NEW TEAM UNLOCKED : EF PRO CYCLING&quot;</span>.</p>
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
          VISION 2026: <br />
          <span className={styles.heroPink}>THE THREE PILLARS OF GROWTH.</span>
        </h2>
        
        <div className={styles.strategyGrid}>
          {/* PILLAR 1 - PINKSNAP */}
          <div className={styles.strategyCard}>
            <span className={styles.caseStudyTag} style={{ background: 'var(--ef-pink)', color: '#fff', marginBottom: '1rem' }}>FAN ECOSYSTEM</span>
            <h3>THE &quot;PINKSNAP&quot; COMMUNITY</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <strong>Concept: From Hashtag to Private Club.</strong> Building a strong community identity with EF&apos;s signature lifestyle approach.
            </p>
            <ul style={{ color: '#444', fontSize: '0.8rem', paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
              <li><strong>#PinkSnap:</strong> Launching a unique brand voice and a proprietary rallying cry. <em>Example: #WolfPack (Quick Step).</em></li>
              <li><strong>Membership Club:</strong> Turning followers into members with exclusive access to partner rewards, team event invitations, and athlete Q&As.</li>
            </ul>
            <div className={styles.insightCard} style={{ marginTop: 'auto' }}>
              <h4 style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>Strategic Insight: The &quot;Why&quot;</h4>
              <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>
                Shifting from passive followers to active members. Branding the &quot;Pink Wave&quot; as a lifestyle builds long-term loyalty and high engagement year-round, regardless of race results.
              </p>
            </div>
          </div>

          {/* PILLAR 2 - GLOBAL HUBS */}
          <div className={styles.strategyCard}>
            <span className={styles.caseStudyTag} style={{ background: '#000', color: '#fff', marginBottom: '1rem' }}>EXPANSION</span>
            <h3>LOCALIZED DIGITAL HUBS</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <strong>Concept: The NBA Franchise Model (Global-to-Local).</strong> Breaking language barriers by creating regional entry points.
            </p>
            <ul style={{ color: '#444', fontSize: '0.8rem', paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
              <li><strong>Regional Hubs:</strong> Potential launch of dedicated accounts such as @EFProCyclingFR, ITA, or a combined ESP/LATAM hub (leveraging the high Carapaz fan density).</li>
              <li><strong>Bespoke Content:</strong> Using local humor, idioms, and cultural references to drive 3x to 4x higher engagement.</li>
            </ul>
            <div style={{ marginBottom: '1.5rem', fontSize: '0.75rem' }}>
              <span style={{ fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>NBA Inspiration:</span>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                 <a href="https://www.instagram.com/leschicagobulls/" target="_blank" rel="noopener noreferrer" style={{ background: '#000', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}>@LesChicagoBulls</a>
                 <a href="https://www.instagram.com/lesspurs/?hl=fr" target="_blank" rel="noopener noreferrer" style={{ background: '#000', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}>@LesSpurs</a>
              </div>
            </div>
            <div className={styles.insightCard} style={{ marginTop: 'auto' }}>
              <h4 style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>Strategic Insight: The &quot;Why&quot;</h4>
              <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>
                Localized content eliminates engagement barriers. It provides massive leverage for sponsors (target by country) and favors social algorithms that prioritize regional relevance.
              </p>
            </div>
          </div>

          {/* PILLAR 3 - DIRECT LINE */}
          <div className={styles.strategyCard} style={{ border: '2px solid var(--ef-pink)', background: 'rgba(239, 80, 151, 0.02)' }}>
            <span className={styles.caseStudyTag} style={{ marginBottom: '1rem' }}>ENGAGEMENT</span>
            <h3>THE &quot;DIRECT LINE&quot; STRATEGY</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <strong>Concept: Turning Content into Conversation.</strong> Shifting from one-way broadcasting to an active, two-way debate space.
            </p>
            <ul style={{ color: '#444', fontSize: '0.8rem', paddingLeft: '1.2rem', marginBottom: '1.5rem' }}>
              <li><strong>Systematic Prompts:</strong> Every post is a prompt designed to trigger fan theories and debates (e.g., &quot;What&apos;s your strategy for tomorrow?&quot;).</li>
              <li><strong>Proactive Response:</strong> Fueling the fire with 100% human, witty, and expert engagement to keep the discussion loop alive.</li>
            </ul>
            <div className={styles.insightCard} style={{ marginTop: 'auto' }}>
              <h4 style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>Strategic Insight: The &quot;Why&quot;</h4>
              <p style={{ fontSize: '0.75rem', color: '#666', margin: 0 }}>
                Algorithms prioritize &quot;Meaningful Social Interaction.&quot; By inciting debates and personally responding to the community, we maximize organic reach while building an unbreakable &quot;Ride-or-Die&quot; fanbase.
              </p>
            </div>
          </div>
        </div>

        {/* Measuring Success */}
        <div className={styles.reveal} style={{ marginTop: '6rem', borderTop: '1px solid #eee', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '-1px' }}>
            MEASURING SUCCESS: <span className={styles.heroPink}>BEYOND THE PODIUM.</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '24px', border: '1px solid #eee' }}>
              <h4 style={{ color: 'var(--ef-pink)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', fontWeight: 800 }}>01. Real Conversations</h4>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', margin: 0 }}>We don&apos;t count likes; we count <strong>Replies and Shares</strong>. If fans aren&apos;t talking back or sending our content to friends, we aren&apos;t doing our job.</p>
            </div>
            <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '24px', border: '1px solid #eee' }}>
              <h4 style={{ color: 'var(--ef-pink)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', fontWeight: 800 }}>02. The Lifestyle Test</h4>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', margin: 0 }}>We track the performance of non-race content. Success is when a lifestyle video performs as well as a stage win. This proves we are a <strong>brand</strong>, not just a result.</p>
            </div>
            <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '24px', border: '1px solid #eee' }}>
              <h4 style={{ color: 'var(--ef-pink)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', fontWeight: 800 }}>03. Fan Loyalty</h4>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', margin: 0 }}>We monitor the growth of the <strong>#PinkSnap community</strong> and Club sign-ups. We want active members, not passive scrollers.</p>
            </div>
            <div style={{ background: '#f9f9f9', padding: '2rem', borderRadius: '24px', border: '1px solid #eee' }}>
              <h4 style={{ color: 'var(--ef-pink)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem', fontWeight: 800 }}>04. Attention Span</h4>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', margin: 0 }}>For our storytelling Reels, the only metric that matters is the <strong>Completion Rate</strong>. We want fans to stay for the whole story, not just the first 3 seconds.</p>
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
