import { useState } from 'react'

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '—'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { day:'2-digit', month:'short', year:'numeric' })
}

function isImage(name) {
  return /\.(jpg|jpeg|png)$/i.test(name)
}

function FileCard({ file, onPreview, onDelete, deletingId }) {
  return (
    <div className="file-card">
      <div className="file-card__thumb" onClick={() => onPreview(file)}>
        {isImage(file.name)
          ? <img src={file.publicUrl} alt={file.name} className="file-card__img" />
          : (
            <div className="file-card__pdf-thumb">
              <span className="file-card__pdf-icon">📄</span>
              <span className="file-card__pdf-label">PDF</span>
            </div>
          )
        }
        <div className="file-card__thumb-hover">🔍 Preview</div>
      </div>
      <div className="file-card__body">
        <p className="file-card__name" title={file.name}>
          {file.name.replace(/^\d+_/, '')}
        </p>
        <div className="file-card__meta">
          {file.metadata?.size && <span>{formatBytes(file.metadata.size)}</span>}
          {file.created_at && <span>{formatDate(file.created_at)}</span>}
        </div>
        <div className="file-card__actions">
          <a href={file.publicUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--outline">
            Buka Link
          </a>
          <button
            className="btn btn--sm btn--danger"
            onClick={() => onDelete(file.name)}
            disabled={deletingId === file.name}
          >
            {deletingId === file.name ? '...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function UploadSection({
  files, uploading, uploadProgress, loadingFiles,
  deletingId, fileInputRef, onUpload, onDelete, onPreview, onRefresh
}) {
  const [dragOver, setDragOver] = useState(false)

  return (
    <section className="upload-sect" id="upload">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Coba Sekarang</p>
          <h2 className="section-title">Upload & Kelola File Anda</h2>
          <p className="section-subtitle">
            Upload file JPG, PNG, atau PDF ke Supabase Storage dan kelola langsung di sini.
          </p>
        </div>

        {/* Drop Zone */}
        <div
          className={`dropzone ${dragOver ? 'dropzone--active' : ''} ${uploading ? 'dropzone--uploading' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); onUpload(e.dataTransfer.files) }}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={e => onUpload(e.target.files)}
            style={{ display: 'none' }}
          />
          {uploading ? (
            <div className="dropzone__progress">
              <div className="spinner-ring" />
              <p className="dropzone__progress-text">Mengupload... {uploadProgress}%</p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          ) : (
            <div className="dropzone__idle">
              <div className="dropzone__icon">{dragOver ? '📂' : '📤'}</div>
              <p className="dropzone__primary">{dragOver ? 'Lepaskan file untuk upload' : 'Drag & drop file di sini'}</p>
              <p className="dropzone__secondary">atau klik untuk memilih file</p>
              <div className="dropzone__tags">
                <span className="tag tag--img">JPG / PNG</span>
                <span className="tag tag--pdf">PDF</span>
                <span className="tag tag--size">Maks. 50MB</span>
              </div>
            </div>
          )}
        </div>

        {/* File List */}
        <div className="files-header">
          <h3 className="files-header__title">
            File Tersimpan <span className="files-header__count">({files.length})</span>
          </h3>
          <button className="btn btn--sm btn--outline" onClick={onRefresh} disabled={loadingFiles}>
            {loadingFiles ? 'Memuat...' : '↺ Refresh'}
          </button>
        </div>

        {loadingFiles ? (
          <div className="state-center">
            <div className="spinner-ring" />
            <p>Memuat file...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="state-center state-center--empty">
            <div className="state-empty-icon">🗂️</div>
            <h4>Belum ada file tersimpan</h4>
            <p>Upload file pertama Anda menggunakan form di atas.</p>
          </div>
        ) : (
          <div className="files-grid">
            {files.map(f => (
              <FileCard
                key={f.name}
                file={f}
                onPreview={onPreview}
                onDelete={onDelete}
                deletingId={deletingId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
