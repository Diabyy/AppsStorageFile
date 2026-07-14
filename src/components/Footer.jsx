const cols = [
  {
    heading: 'Produk',
    links: ['Upload File', 'Manajemen Storage', 'Preview Dokumen', 'Link Publik'],
  },
  {
    heading: 'Solusi',
    links: ['Untuk Tim Desain', 'Untuk Developer', 'Untuk Bisnis', 'Enterprise'],
  },
  {
    heading: 'Sumber Daya',
    links: ['Panduan Penggunaan', 'Dokumentasi API', 'Blog & Tips', 'Status Layanan'],
  },
  {
    heading: 'Perusahaan',
    links: ['Tentang Kami', 'Karir', 'Kebijakan Privasi', 'Syarat & Ketentuan'],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <span className="navbar__logo-icon">⬡</span>
              <span>FileVault</span>
            </a>
            <p className="footer__tagline">Platform manajemen file cloud yang cepat, aman, dan terintegrasi dengan Supabase.</p>
            <p className="footer__powered">Powered by <strong>Supabase</strong> · Built with <strong>React + Vite</strong></p>
          </div>
          <div className="footer__links">
            {cols.map(col => (
              <div key={col.heading} className="footer__col">
                <h4 className="footer__col-heading">{col.heading}</h4>
                <ul className="footer__col-list">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="footer__col-link">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} FileVault · Enuma Project. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
