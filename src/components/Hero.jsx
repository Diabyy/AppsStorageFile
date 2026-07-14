export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Platform Manajemen File Cloud</p>
          <h1 className="hero__title">
            Simpan, Kelola, dan Bagikan File dengan <span className="hero__title-accent">Mudah & Aman</span>
          </h1>
          <p className="hero__desc">
            Upload gambar JPG/PNG dan dokumen PDF ke cloud storage Supabase. Akses file kapan saja, dari mana saja, dengan aman dan terorganisir.
          </p>
          <div className="hero__cta-group">
            <a href="#upload" className="btn btn--teal btn--lg">
              Mulai Upload Sekarang →
            </a>
            <a href="#features" className="btn btn--ghost btn--lg">
              Lihat Fitur
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__visual-card hero__visual-card--main">
            <div className="hero__visual-icon">☁️</div>
            <div className="hero__visual-bar" />
            <div className="hero__visual-bar hero__visual-bar--short" />
            <div className="hero__visual-files">
              <span className="hero__file-chip">🖼️ photo.jpg</span>
              <span className="hero__file-chip hero__file-chip--pdf">📄 report.pdf</span>
              <span className="hero__file-chip">🖼️ banner.png</span>
            </div>
          </div>
          <div className="hero__visual-card hero__visual-card--mini hero__visual-card--a">
            <div style={{fontSize:'22px'}}>✅</div>
            <span style={{fontSize:'12px', fontWeight:600}}>Upload Berhasil!</span>
          </div>
          <div className="hero__visual-card hero__visual-card--mini hero__visual-card--b">
            <div style={{fontSize:'22px'}}>🔗</div>
            <span style={{fontSize:'12px', fontWeight:600}}>Link Publik</span>
          </div>
        </div>
      </div>
    </section>
  )
}
