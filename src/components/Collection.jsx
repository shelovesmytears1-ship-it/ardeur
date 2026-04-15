import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { t } from '../translations';

export default function Collection({ navigate, lang }) {
  const pageRef = useRef(null);
  const dict = t[lang].col;

  const PRODUCTS = [
    {
      id: 1, name: 'NOCTURNE', sub: 'Rouge',
      desc: 'Dark Rose · Oud · Smoked Cedar', price: '€290', volume: '50ml',
      img: '/rouge.png',
      tag: dict.tags.limited, tagType: 'Limited'
    },
    {
      id: 2, name: 'EMPIRE', sub: 'Absolu',
      desc: 'Vetiver · Amber · Black Pepper', price: '€340', volume: '75ml',
      img: '/absolu.png',
      tag: dict.tags.bestseller, tagType: 'Bestseller'
    },
    {
      id: 3, name: 'REVERIE', sub: 'Blanc',
      desc: 'White Musk · Iris · Sandalwood', price: '€260', volume: '50ml',
      img: '/blanc.png',
      tag: dict.tags.new, tagType: 'New'
    },
    {
      id: 4, name: 'ENFER', sub: 'Noir',
      desc: 'Leather · Myrrh · Dark Patchouli', price: '€420', volume: '100ml',
      img: '/noir.png',
      tag: dict.tags.exclusive, tagType: 'Exclusive'
    },
    {
      id: 5, name: 'VELOURS', sub: 'Soir',
      desc: 'Cashmere · Vanilla · Pink Pepper', price: '€310', volume: '50ml',
      img: '/soir.png',
      tag: null, tagType: null
    },
    {
      id: 6, name: 'ARDEUR', sub: 'Édition d\'Art',
      desc: 'Bulgarian Rose · Oud · Civet', price: '€580', volume: '100ml',
      img: '/bottle.png',
      tag: dict.tags.collector, tagType: 'Collector'
    },
  ];

  const TAG_COLORS = {
    Limited:    { bg: 'var(--primary)',    color: '#fff' },
    Bestseller: { bg: 'var(--gold)',        color: '#111' },
    New:        { bg: 'transparent',       color: 'var(--primary)', border: '1px solid var(--primary)' },
    Exclusive:  { bg: 'var(--primary-dim)', color: 'var(--gold)' },
    Collector:  { bg: 'var(--gold-dim)',    color: 'var(--gold)' },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.coll-header', { y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
      gsap.to('.product-card', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.4, ease: 'back.out(1.2)' });
      gsap.from('.product-card', { y: 50, duration: 0.8, stagger: 0.12, delay: 0.4, ease: 'back.out(1.2)' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleAddToCart = (name) => {
    const toast = document.getElementById('toast');
    if(toast) {
      toast.innerText = `${dict.add.replace(' →', '')}: ${name}`;
      gsap.timeline().to(toast, { opacity: 1, y: 0, duration: 0.3 }).to(toast, { opacity: 0, y: 20, duration: 0.3, delay: 2 });
    }
  };

  return (
    <div ref={pageRef} className="collection-page">
      <div id="toast" className="toast-notice"></div>
      <div className="collection-header">
        <div className="coll-header label" style={{ marginBottom: 12 }}>{dict.lbl}</div>
        <h2 className="coll-header h-section">
          {dict.t1} <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{dict.t2}</em>
        </h2>
        <p className="coll-header body-text" style={{ maxWidth: 480, margin: '16px auto 0' }}>{dict.desc}</p>
      </div>

      <div className="collection-grid">
        {PRODUCTS.map(p => {
          const tagStyle = p.tagType ? TAG_COLORS[p.tagType] : null;
          return (
            <div key={p.id} className="product-card panel-glow" style={{ opacity: 0 }}>
              <div className="card-img-wrap">
                <img src={p.img} alt={p.name} />
                <div className="card-overlay" />
                {p.tag && (
                  <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 3, fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 12px', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)', fontWeight: 700, ...tagStyle }}>
                    {p.tag}
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="label" style={{ marginBottom: 6 }}>{p.desc}</div>
                <div className="card-name">{p.name} <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{p.sub}</span></div>
                <div className="divider" style={{ margin: '12px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="card-price">{p.price} <span>{p.volume}</span></div>
                  <button className="btn-primary" style={{ fontSize: 11, padding: '10px 20px' }} onClick={(e) => { e.stopPropagation(); handleAddToCart(p.name); }}>
                    {dict.add}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
