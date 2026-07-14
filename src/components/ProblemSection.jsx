const problems = [
  'File tersebar di banyak lokasi yang berbeda',
  'Tidak ada sistem pencarian yang efisien',
  'Berbagi file via email membuang waktu',
  'Tidak ada riwayat upload yang terstruktur',
]

export default function ProblemSection() {
  return (
    <section className="problem">
      <div className="container problem__inner">
        <div className="problem__image">
          <div className="problem__image-placeholder">
            <div className="problem__image-icon">🗂️</div>
            <div className="problem__image-lines">
              <div className="problem__image-line" />
              <div className="problem__image-line problem__image-line--med" />
              <div className="problem__image-line problem__image-line--short" />
            </div>
          </div>
        </div>

        <div className="problem__content">
          <p className="eyebrow">Masalah Umum</p>
          <h2 className="problem__title">
            Sistem File yang Berantakan Bisa Merugikan Bisnis Anda
          </h2>
          <p className="problem__desc">
            Tanpa platform file yang terorganisir, tim Anda membuang waktu mencari dokumen, risiko kehilangan file penting semakin tinggi, dan produktivitas menurun.
          </p>
          <ul className="problem__list">
            {problems.map(p => (
              <li key={p} className="problem__list-item">
                <span className="problem__check">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
