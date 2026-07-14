export default function MidCta() {
  return (
    <section className="mid-cta">
      <div className="container mid-cta__inner">
        <div className="mid-cta__image">
          <div className="mid-cta__image-mock">
            <div className="mid-cta__image-screen">
              <div className="mid-cta__screen-bar" />
              <div className="mid-cta__screen-content">
                <div className="mid-cta__screen-thumb" />
                <div className="mid-cta__screen-thumb mid-cta__screen-thumb--sm" />
                <div className="mid-cta__screen-thumb mid-cta__screen-thumb--xs" />
              </div>
            </div>
          </div>
        </div>
        <div className="mid-cta__content">
          <h2 className="mid-cta__title">Butuh Bantuan dengan Manajemen File Digital?</h2>
          <p className="mid-cta__desc">
            FileVault menawarkan layanan konsultasi untuk membantu Anda membangun sistem manajemen dokumen yang tepat. Tingkatkan efisiensi tim, hemat waktu, dan tingkatkan produktivitas.
          </p>
          <a href="#upload" className="btn btn--amber btn--lg">
            Coba Gratis Sekarang →
          </a>
        </div>
      </div>
    </section>
  )
}
