import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { t } from '../translations';

export default function Home({ navigate, theme, lang }) {
  const pageRef = useRef(null);
  const dict = t[lang].home;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 1, stagger: 0.1 }, '-=0.4')
        .from('.hero-desc',  { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-btns',  { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');

      tl.from('.bottle-wrap', { scale: 0.85, opacity: 0, duration: 1.4, ease: 'back.out(1.2)' }, '-=1.5');
      tl.from('.bottle-orbit', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, '-=1');

      tl.from('.right-panel', { x: 40, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=1');
      tl.from('.left-panel-item', { x: -40, opacity: 0, duration: 0.8, stagger: 0.15 }, '-=1');

      gsap.from('.scroll-section', {
        scrollTrigger: { trigger: '.scroll-section', start: 'top 80%' },
        y: 60, opacity: 0, duration: 1.2, ease: 'power2.out'
      });

      const counters = pageRef.current.querySelectorAll('[data-count]');
      counters.forEach(el => {
        const target = parseFloat(el.getAttribute('data-count'));
        const isFloat = el.getAttribute('data-float') === 'true';
        gsap.to({ val: 0 }, {
          val: target, duration: 2.5, ease: 'power2.out', delay: 1.2,
          onUpdate: function () {
            el.innerText = isFloat ? this.targets()[0].val.toFixed(1) : Math.round(this.targets()[0].val);
          }
        });
      });
    }, pageRef);

    const handleMouseMove = (e) => {
      const { innerWidth: W, innerHeight: H } = window;
      const dx = (e.clientX - W / 2) / W;
      const dy = (e.clientY - H / 2) / H;
      gsap.to('.bottle-img', { x: dx * 20, y: dy * 15, duration: 1.2, ease: 'power2.out' });
      gsap.to('.bottle-orbit', { x: dx * 10, y: dy * 8, duration: 1.6, ease: 'power2.out' });
      gsap.to('.right-panel', { x: dx * 8, duration: 1.4, ease: 'power2.out', stagger: 0.05 });
      gsap.to('.left-panel-item', { x: dx * -8, duration: 1.4, ease: 'power2.out', stagger: 0.05 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => { ctx.revert(); window.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <div ref={pageRef}>
      <div className="home-hero">
        <div className="hero-left" style={{ justifyContent: 'flex-start', paddingTop: '20px' }}>
          <div className="left-panel-item" style={{ marginBottom: 24 }}>
            <div className="label hero-label" style={{ marginBottom: 16 }}>{dict.est}</div>
            <h1 className="h-big hero-title" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6.5rem)' }}>
              {dict.title1}<br />{dict.title2}<br />{dict.title3}
            </h1>
            <p className="body-text hero-desc" style={{ maxWidth: 280, marginTop: 16 }}>{dict.desc}</p>
            <div className="hero-btns" style={{ display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => navigate('collection')}>{dict.shop}</button>
              <button className="btn-outline" onClick={() => navigate('about')}>{dict.story}</button>
            </div>
          </div>

          <div className="left-panel-item" style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <div className="panel panel-cut-tl panel-glow" style={{ flex: 1, padding: '18px 20px' }}>
              <div className="stat-num">
                <span data-count="94" style={{ fontFamily: 'var(--font-big)', fontSize: 40, color: 'var(--primary)' }}>0</span>
                <span style={{ fontFamily: 'var(--font-big)', fontSize: 20, color: 'var(--gold)' }}>+</span>
              </div>
              <div className="stat-desc" style={{ whiteSpace: 'pre-line' }}>{dict.countries}</div>
            </div>
            <div className="panel panel-cut-tr" style={{ flex: 1, padding: '18px 20px' }}>
              <div className="stat-num">
                <span data-count="4.9" data-float="true" style={{ fontFamily: 'var(--font-big)', fontSize: 40, color: 'var(--gold)' }}>0</span>
                <span style={{ fontFamily: 'var(--font-big)', fontSize: 20, color: 'var(--text-muted)' }}>/5</span>
              </div>
              <div className="stat-desc" style={{ whiteSpace: 'pre-line' }}>{dict.rating}</div>
            </div>
          </div>
        </div>

        <div className="hero-center" style={{ paddingBottom: '30px', alignItems: 'center' }}>
          <div className="bottle-wrap" style={{ alignItems: 'center', transform: 'translateY(-20px)' }}>
            <div className="bottle-orbit"><div className="orbit-dot" /></div>
            <img src={`${import.meta.env.BASE_URL}bottle.png`} alt="ARDEUR Perfume" className="bottle-img" style={{ maxHeight: '100%', marginBottom: '20px' }} />
          </div>
        </div>

        <div className="hero-right" style={{ justifyContent: 'center' }}>
          <div className="right-panel panel panel-cut-trbl panel-glow" style={{ marginBottom: 16 }}>
            <div className="label-gold" style={{ marginBottom: 12 }}>{dict.latest}</div>
            <h3 className="h-section" style={{ fontSize: 24, fontFamily: 'var(--font-display)', fontWeight: 300 }}>
              NOCTURNE<br /><em style={{ color: 'var(--primary)' }}>Rouge</em>
            </h3>
            <div className="divider" style={{ margin: '14px 0' }} />
            <p className="body-text" style={{ fontSize: 13 }}>
              {dict.latestDesc}<br />{dict.limit}
            </p>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-big)', fontSize: 32, color: 'var(--text)' }}>€290</span>
              <button className="btn-primary" style={{ fontSize: 11, padding: '10px 22px' }} onClick={() => navigate('collection')}>{dict.view}</button>
            </div>
          </div>

          <div className="right-panel panel panel-cut-bl" style={{ marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 16 }}>{dict.prof}</div>
            {[
              { name: dict.long,  pct: 95 },
              { name: dict.sillage, pct: 82 },
              { name: dict.unique, pct: 98 },
            ].map(({ name, pct }) => (
              <div key={name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-sub)' }}>{name}</span>
                  <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-panel2)', borderRadius: 2, overflow: 'hidden' }}>
                  <div className="profile-bar" data-width={`${pct}%`} style={{ height: '100%', width: 0, background: `linear-gradient(90deg, var(--primary), var(--gold))`, borderRadius: 2, boxShadow: '0 0 8px var(--primary-glow)' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="right-panel panel panel-cut-tl panel-gold-glow">
            <div className="label-gold" style={{ marginBottom: 8 }}>{dict.recog}</div>
            <p className="body-text" style={{ fontSize: 13 }}>{dict.award}<br /><span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{dict.aSub}</span></p>
          </div>
        </div>
      </div>

      <div className="scroll-section" style={{ padding: '80px 48px 120px', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <div className="label" style={{ marginBottom: 20 }}>{dict.phil}</div>
        <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: 40 }}>
          {dict.pTitle1}<br /><em style={{ color: 'var(--primary)' }}>{dict.pTitle2}</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 60, textAlign: 'left' }}>
          <div className="panel panel-cut-tl panel-glow" style={{ padding: '40px' }}>
            <div className="label-gold" style={{ marginBottom: 12 }}>{dict.n1}</div>
            <h3 className="h-section" style={{ fontSize: 28, marginBottom: 16 }}>{dict.t1}</h3>
            <p className="body-text">{dict.d1}</p>
          </div>
          <div className="panel panel-cut-br panel-glow" style={{ padding: '40px' }}>
            <div className="label-gold" style={{ marginBottom: 12 }}>{dict.n2}</div>
            <h3 className="h-section" style={{ fontSize: 28, marginBottom: 16 }}>{dict.t2}</h3>
            <p className="body-text">{dict.d2}</p>
          </div>
          <div className="panel panel-cut-trbl panel-glow" style={{ padding: '40px' }}>
            <div className="label-gold" style={{ marginBottom: 12 }}>{dict.n3}</div>
            <h3 className="h-section" style={{ fontSize: 28, marginBottom: 16 }}>{dict.t3}</h3>
            <p className="body-text">{dict.d3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
