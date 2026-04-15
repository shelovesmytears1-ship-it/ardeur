import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { t } from '../translations';

export default function Contact({ lang }) {
  const pageRef = useRef(null);
  const [sent, setSent] = useState(false);
  const dict = t[lang].contact;

  const DETAILS = [
    { icon: '◈', title: dict.aTitle, value: dict.aVal },
    { icon: '◇', title: 'Email',   value: 'maison@ardeur.com' },
    { icon: '◆', title: 'Phone',   value: '+33 1 42 00 00 00' },
    { icon: '⬡', title: dict.hTitle, value: dict.hVal },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header-anim', { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
      gsap.from('.contact-left > *', { x: -40, opacity: 0, duration: 0.9, stagger: 0.15, delay: 0.3, ease: 'power3.out' });
      gsap.from('.contact-form-anim', { x: 60, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to('.submit-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div ref={pageRef} style={{ paddingTop: 80, padding: '100px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 60 }}>
        <div className="contact-header-anim label" style={{ marginBottom: 12 }}>{dict.lbl}</div>
        <h2 className="contact-header-anim h-section">
          {dict.t1}<br /><em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{dict.t2}</em>
        </h2>
      </div>

      <div className="contact-page" style={{ paddingTop: 0 }}>
        <div className="contact-left contact-info">
          <p className="body-text" style={{ maxWidth: 340 }}>{dict.desc}</p>
          <div className="divider" />
          {DETAILS.map(d => (
            <div key={d.title} className="contact-detail">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ color: 'var(--primary)', fontSize: 16 }}>{d.icon}</span>
                <div className="label-gold">{d.title}</div>
              </div>
              <p className="body-text" style={{ paddingLeft: 26 }}>{d.value}</p>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {['Instagram', 'Pinterest', 'LinkedIn'].map(s => (
              <button key={s} className="btn-outline" style={{ fontSize: 10, padding: '8px 16px' }}>{s}</button>
            ))}
          </div>
        </div>

        <div className="contact-form-anim">
          <div className="panel panel-cut-tlbr panel-glow" style={{ padding: 40 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontFamily: 'var(--font-big)', fontSize: 56, color: 'var(--primary)', marginBottom: 16 }}>✦</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, marginBottom: 12 }}>{dict.success}</h3>
                <p className="body-text">{dict.sDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">{dict.fn}</label>
                    <input className="form-input" type="text" required placeholder={dict.plFn} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{dict.ln}</label>
                    <input className="form-input" type="text" required placeholder={dict.plLn} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" required placeholder="contact@example.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">{dict.subj}</label>
                  <input className="form-input" type="text" placeholder={dict.plSubj} />
                </div>
                <div className="form-group">
                  <label className="form-label">{dict.msg}</label>
                  <textarea className="form-textarea" required placeholder={dict.plMsg} />
                </div>
                <button type="submit" className="btn-primary submit-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 13, padding: '16px' }}>
                  {dict.btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
