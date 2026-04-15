export default function Footer({ lang }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="nav-logo" style={{ marginBottom: '8px' }}>
            ARD<span>E</span>UR
          </div>
          <p className="body-text" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            © 2026 ARDEUR Maison de Parfum.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <span className="label-gold" style={{ marginBottom: '12px', display: 'block' }}>Social</span>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="footer-col">
            <span className="label-gold" style={{ marginBottom: '12px', display: 'block' }}>Legal</span>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
