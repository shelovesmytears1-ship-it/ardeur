import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Collection from './components/Collection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const overlayRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const navigate = (to) => {
    if (to === page) return;
    const overlay = overlayRef.current;
    gsap.timeline()
      .set(overlay, { scaleY: 0, transformOrigin: 'bottom' })
      .to(overlay, { scaleY: 1, duration: 0.45, ease: 'power3.inOut' })
      .call(() => setPage(to))
      .to(overlay, { scaleY: 0, transformOrigin: 'top', duration: 0.45, ease: 'power3.inOut' });
  };

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const renderPage = () => {
    switch (page) {
      case 'home':       return <Home navigate={navigate} theme={theme} lang={lang} />;
      case 'about':      return <About lang={lang} />;
      case 'collection': return <Collection navigate={navigate} lang={lang} />;
      case 'contact':    return <Contact lang={lang} />;
      default:           return <Home navigate={navigate} theme={theme} lang={lang} />;
    }
  };

  return (
    <>
      <div ref={overlayRef} className="page-overlay" />
      <Nav
        currentPage={page}
        navigate={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        setLang={setLang}
      />
      <main className="page">
        {renderPage()}
      </main>
      <Footer lang={lang} />
    </>
  );
}
