const features = [
  {
    title: 'Supabase Storage',
    desc: 'File tersimpan aman di infrastruktur Supabase yang andal dengan CDN global.',
  },
  {
    title: 'Upload Multi-File',
    desc: 'Upload banyak file sekaligus dengan satu klik atau drag & drop yang mudah.',
  },
  {
    title: 'Preview Langsung',
    desc: 'Lihat preview gambar dan dokumen PDF langsung di browser tanpa perlu download.',
  },
  {
    title: 'Link Publik',
    desc: 'Dapatkan URL publik untuk setiap file yang bisa dibagikan kepada siapapun.',
  },
  {
    title: 'Manajemen File',
    desc: 'Hapus file yang tidak diperlukan dan kelola storage Anda dengan mudah.',
  },
  {
    title: 'Keamanan Data',
    desc: 'Kebijakan RLS Supabase memastikan akses file yang aman dan terproteksi.',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Platform Penyimpanan File All-in-One</h2>
          <p className="section-subtitle">
            Semua yang Anda butuhkan untuk mengelola file gambar dan dokumen dalam satu platform terintegrasi.
          </p>
        </div>
        <div className="features__grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
