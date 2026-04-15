import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { t } from '../translations';

export default function About({ lang }) {
  const pageRef = useRef(null);
  const dict = t[lang].about;

  const TIMELINE = [
    { year: '2009', title: dict.t8, text: dict.t8d },
    { year: '2014', title: dict.t14, text: dict.t14d },
    { year: '2018', title: dict.t18, text: dict.t18d },
    { year: '2024', title: dict.t24, text: dict.t24d },
  ];

  const VALUES = [
    { icon: '◈', title: dict.v1, text: dict.vd1 },
    { icon: '◇', title: dict.v2, text: dict.vd2 },
    { icon: '◆', title: dict.v3, text: dict.vd3 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-header-anim', { y: 50, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' });
      gsap.from('.about-text-anim', { x: -40, opacity: 0, duration: 1, delay: 0.4, stagger: 0.15, ease: 'power3.out' });
      gsap.from('.about-img-wrap', { x: 60, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
      gsap.to('.timeline-item', { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, delay: 0.6, ease: 'power2.out' });
      gsap.from('.value-panel', { y: 40, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.15, ease: 'back.out(1.3)' });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="about-page">
      <div style={{ marginBottom: 70, maxWidth: 700 }}>
        <div className="about-header-anim label" style={{ marginBottom: 16 }}>{dict.lbl}</div>
        <h2 className="about-header-anim h-section">
          {dict.title1} <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{dict.title1em}</em><br />
          {dict.title2} <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{dict.title2em}</em>
        </h2>
      </div>

      <div className="about-grid">
        <div>
          <p className="about-text-anim body-text" style={{ marginBottom: 32, fontSize: 17 }}>{dict.p1}</p>
          <p className="about-text-anim body-text" style={{ marginBottom: 40 }}>{dict.p2}</p>

          <div className="timeline">
            {TIMELINE.map(item => (
              <div key={item.year} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p className="body-text" style={{ fontSize: 14, marginTop: 4 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-visual">
          <div className="about-img-wrap panel-glow">
            <img src="/noir.png" alt="Ardeur aesthetics" />
          </div>
          <div className="panel panel-cut-tl panel-glow" style={{ position: 'absolute', bottom: -24, right: -24, width: 220, padding: '20px 24px' }}>
            <div className="label-gold" style={{ marginBottom: 8 }}>{dict.badgeL}</div>
            <div style={{ fontFamily: 'var(--font-big)', fontSize: 48, color: 'var(--text)', lineHeight: 1 }}>100%</div>
            <p className="body-text" style={{ fontSize: 13, marginTop: 6 }}>{dict.badgeT}</p>
          </div>
        </div>
      </div>

      <div className="values-row">
        {VALUES.map((v, i) => {
          const cuts = ['panel-cut-tl panel-glow', 'panel-cut-tlbr', 'panel-cut-br panel-gold-glow'];
          return (
            <div key={v.title} className={`value-panel panel ${cuts[i]}`} style={{ padding: '32px 28px' }}>
              <div style={{ fontFamily: 'var(--font-big)', fontSize: 36, color: 'var(--primary)', marginBottom: 12 }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, marginBottom: 10 }}>{v.title}</h3>
              <p className="body-text" style={{ fontSize: 14 }}>{v.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
