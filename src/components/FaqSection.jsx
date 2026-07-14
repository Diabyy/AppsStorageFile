import { useState } from 'react'

const faqs = [
  {
    q: 'Format file apa yang didukung oleh FileVault?',
    a: 'FileVault mendukung tiga format file: JPEG (.jpg/.jpeg), PNG (.png), dan PDF (.pdf). Ukuran maksimum per file adalah 50MB.',
  },
  {
    q: 'Apakah file yang diupload bisa diakses oleh publik?',
    a: 'Ya. Setiap file yang diupload mendapatkan URL publik yang dapat dibagikan kepada siapapun. Anda bisa mengakses file melalui link tersebut tanpa perlu login.',
  },
  {
    q: 'Bagaimana keamanan data saya di FileVault?',
    a: 'File Anda disimpan di Supabase Storage yang dilindungi oleh Row Level Security (RLS). Kami menggunakan policy storage yang memastikan hanya operasi yang diizinkan yang bisa dilakukan.',
  },
  {
    q: 'Apakah saya bisa upload banyak file sekaligus?',
    a: 'Ya! FileVault mendukung multi-file upload. Anda bisa memilih beberapa file sekaligus dari dialog file picker, atau drag & drop beberapa file ke zona upload.',
  },
  {
    q: 'Bagaimana cara menghapus file yang sudah diupload?',
    a: 'Di daftar file yang sudah diupload, setiap file memiliki tombol "Hapus". Klik tombol tersebut dan file akan dihapus permanen dari Supabase Storage.',
  },
  {
    q: 'Apakah ada batas jumlah file yang bisa disimpan?',
    a: 'Batas penyimpanan mengikuti kuota project Supabase Anda. Pada tier gratis, Supabase menyediakan 1GB storage. Untuk kebutuhan lebih besar, upgrade ke plan berbayar.',
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Pertanyaan Seputar FileVault</h2>
        </div>
        <div className="faq__list">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${openIdx === i ? 'faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                aria-expanded={openIdx === i}
              >
                <span>{item.q}</span>
                <span className="faq__chevron">{openIdx === i ? '∧' : '∨'}</span>
              </button>
              {openIdx === i && (
                <div className="faq__answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
