import { t } from '../translations';

export default function Nav({ currentPage, navigate, theme, toggleTheme, lang, setLang }) {
  const dict = t[lang].nav;
  
  const links = [
    { id: 'home',       label: dict.home },
    { id: 'about',      label: dict.story },
    { id: 'collection', label: dict.col },
    { id: 'contact',    label: dict.contact },
  ];

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => navigate('home')}>
        ARD<span>E</span>UR
      </div>

      <div className="nav-links">
        {links.map(link => (
          <button
            key={link.id}
            className={`nav-link${currentPage === link.id ? ' active' : ''}`}
            onClick={() => navigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="nav-right">
        {/* Language Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginRight: '16px' }}>
          {['en', 'pl', 'ru'].map(l => (
            <span
              key={l}
              onClick={() => setLang(l)}
              style={{
                fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase',
                color: lang === l ? 'var(--primary)' : 'var(--text-sub)',
                cursor: 'pointer', fontWeight: lang === l ? 700 : 400
              }}
            >
              {l}
            </span>
          ))}
        </div>

        <span style={{
          fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--text-muted)', userSelect: 'none'
        }}>
          {theme === 'dark' ? `◉ ${dict.dark}` : `○ ${dict.light}`}
        </span>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" />
      </div>
    </nav>
  );
}
