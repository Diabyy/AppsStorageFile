import { useState } from 'react'

const navLinks = [
  { label: 'Fitur', href: '#features' },
  { label: 'Add-ons', href: '#addons' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Upload', href: '#upload' },
]

export default function Navbar({ activeUsers, realtimeStatus, user, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-icon">⬡</span>
          <span className="navbar__logo-text">FileVault</span>
        </a>

        {user && (
          <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
        )}

        <div className="navbar__actions">
          {user && (
            <div className="navbar__realtime">
              <span className={`navbar__pulse ${realtimeStatus === 'SUBSCRIBED' ? 'navbar__pulse--active' : ''}`}></span>
              <span className="navbar__realtime-text">
                {realtimeStatus === 'SUBSCRIBED' 
                  ? `Realtime (${activeUsers} Sesi)` 
                  : 'Connecting...'}
              </span>
            </div>
          )}

          {user ? (
            <>
              <div className="navbar__user-badge" title={user.email}>
                👤 {user.email.split('@')[0]}
              </div>
              <button onClick={onSignOut} className="btn btn--sm btn--danger">
                Keluar
              </button>
            </>
          ) : (
            <a href="#auth" className="btn btn--primary btn--sm">Masuk / Daftar</a>
          )}

          {user && (
            <button className="navbar__hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
