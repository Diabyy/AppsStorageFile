const benefits = [
  {
    title: 'Tingkatkan Efisiensi Tim',
    desc: 'Kurangi waktu pencarian dokumen. Tim Anda fokus pada pekerjaan penting, bukan mencari file.',
  },
  {
    title: 'Tarik Lebih Banyak Klien dengan SEO',
    desc: 'File publik Anda dapat diindeks mesin pencari, meningkatkan visibilitas online bisnis Anda.',
  },
  {
    title: 'Tampilkan Brand Anda',
    desc: 'Bagikan file dengan URL profesional yang mencerminkan identitas brand Anda.',
  },
  {
    title: 'Otomatisasi Pembaruan Data',
    desc: 'Integrasikan dengan sistem lain menggunakan Supabase Realtime untuk sinkronisasi otomatis.',
  },
]

export default function BenefitsSection() {
  return (
    <section className="benefits">
      <div className="container benefits__inner">
        <div className="benefits__left">
          <p className="eyebrow">Keunggulan Platform</p>
          <h2 className="benefits__title">
            Tingkatkan Produktivitas dan Kembangkan Bisnis Anda
          </h2>
          <p className="benefits__desc">
            Bermitra dengan FileVault memberi Anda akses ke fitur enterprise yang sebelumnya hanya tersedia untuk perusahaan besar.
          </p>
        </div>
        <div className="benefits__right">
          {benefits.map(b => (
            <div key={b.title} className="benefit-card">
              <h3 className="benefit-card__title">{b.title}</h3>
              <p className="benefit-card__desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
