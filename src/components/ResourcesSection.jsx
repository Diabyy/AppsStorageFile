const resources = [
  {
    tag: 'Panduan',
    title: 'Cara Optimal Mengelola File di Cloud Storage',
    desc: 'Pelajari praktik terbaik dalam mengorganisir file untuk tim yang produktif.',
  },
  {
    tag: 'Tips',
    title: 'Optimalkan Format Gambar Sebelum Upload',
    desc: 'Kurangi ukuran file hingga 60% tanpa kehilangan kualitas visual.',
  },
  {
    tag: 'Integrasi',
    title: 'Menghubungkan Supabase Storage dengan Aplikasi Anda',
    desc: 'Panduan teknis untuk developer yang ingin mengintegrasikan storage ke app.',
  },
]

export default function ResourcesSection() {
  return (
    <section className="resources">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sumber Daya & Panduan</h2>
          <p className="section-subtitle">Tingkatkan pengetahuan Anda tentang manajemen file digital.</p>
        </div>
        <div className="resources__grid">
          {resources.map(r => (
            <div key={r.title} className="resource-card">
              <span className="resource-card__tag">{r.tag}</span>
              <h3 className="resource-card__title">{r.title}</h3>
              <p className="resource-card__desc">{r.desc}</p>
              <a href="#" className="resource-card__link">Baca selengkapnya →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
