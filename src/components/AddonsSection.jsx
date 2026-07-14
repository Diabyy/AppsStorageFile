const addons = [
  {
    title: 'Kompresi Otomatis →',
    desc: 'Optimalkan ukuran gambar secara otomatis tanpa kehilangan kualitas visual. Hemat storage hingga 60%.',
  },
  {
    title: 'Watermark Dokumen →',
    desc: 'Tambahkan watermark branding ke setiap dokumen PDF yang diupload untuk melindungi konten Anda.',
  },
  {
    title: 'Webhook Integrasi →',
    desc: 'Kirim notifikasi otomatis ke sistem lain ketika file baru diupload atau dihapus melalui Supabase webhook.',
  },
]

export default function AddonsSection() {
  return (
    <section className="addons" id="addons">
      <div className="container addons__inner">
        <div className="addons__header">
          <p className="eyebrow">Tingkatkan Kemampuan</p>
          <h2 className="addons__title">
            Add-ons untuk Memaksimalkan Platform File Anda
          </h2>
          <p className="addons__desc">
            Perluas kemampuan FileVault dengan modul tambahan yang dirancang untuk kebutuhan bisnis profesional.
          </p>
          <a href="#upload" className="btn btn--teal-outline">
            Hubungi Tim Kami →
          </a>
        </div>

        <div className="addons__list">
          {addons.map(a => (
            <div key={a.title} className="addon-item">
              <h3 className="addon-item__title">{a.title}</h3>
              <p className="addon-item__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
