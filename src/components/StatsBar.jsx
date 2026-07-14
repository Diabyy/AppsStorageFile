const stats = [
  { number: '99.9%', label: 'Uptime layanan storage' },
  { number: '50MB', label: 'Ukuran maksimum per file' },
  { number: '< 3 dtk', label: 'Rata-rata waktu upload' },
]

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container">
        <p className="stats-bar__headline">Cepat. Aman. Selalu Online.</p>
        <div className="stats-bar__grid">
          {stats.map(s => (
            <div key={s.label} className="stats-bar__item">
              <span className="stats-bar__number">{s.number}</span>
              <span className="stats-bar__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
