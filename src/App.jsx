import { useState, useEffect, useRef } from 'react'
import { supabase, BUCKET_NAME } from './supabaseClient'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import ProblemSection from './components/ProblemSection'
import FeaturesGrid from './components/FeaturesGrid'
import AddonsSection from './components/AddonsSection'
import Testimonial from './components/Testimonial'
import MidCta from './components/MidCta'
import BenefitsSection from './components/BenefitsSection'
import FaqSection from './components/FaqSection'
import UploadSection from './components/UploadSection'
import ResourcesSection from './components/ResourcesSection'
import FooterCta from './components/FooterCta'
import Footer from './components/Footer'
import Auth from './components/Auth'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [notification, setNotification] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [loadingFiles, setLoadingFiles] = useState(true)
  const [previewFile, setPreviewFile] = useState(null)
  
  // Realtime States
  const [realtimeStatus, setRealtimeStatus] = useState('CONNECTING')
  const [activeUsers, setActiveUsers] = useState(1)
  const channelRef = useRef(null)
  
  const fileInputRef = useRef()

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  const fetchFiles = async (userId = user?.id) => {
    const activeUid = userId || user?.id
    if (!activeUid) {
      setFiles([])
      setLoadingFiles(false)
      return
    }

    setLoadingFiles(true)
    // Ambil list file di folder user
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(activeUid, {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    })

    if (error) {
      showNotification('Gagal memuat file: ' + error.message, 'error')
      setLoadingFiles(false)
    } else {
      const filteredFiles = (data || []).filter(f => f.name !== '.emptyFolderPlaceholder')
      
      if (filteredFiles.length === 0) {
        setFiles([])
        setLoadingFiles(false)
        return
      }

      // Optimasi 1: Gunakan Signed URL karena RLS SELECT diaktifkan
      // Kita buat batch signed URLs dengan masa kadaluarsa 1 jam (3600 detik)
      const filePaths = filteredFiles.map(f => `${activeUid}/${f.name}`)
      const { data: signedUrls, error: signedError } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrls(filePaths, 3600)

      if (signedError) {
        showNotification('Gagal memproses link aman file: ' + signedError.message, 'error')
        // Fallback ke file mentah tanpa link jika signedUrl gagal
        setFiles(filteredFiles.map(f => ({ ...f, publicUrl: '' })))
      } else {
        // Gabungkan info file dengan signed URL-nya
        const withUrls = filteredFiles.map((file, idx) => {
          const matchedUrl = signedUrls[idx]?.signedUrl || ''
          return { ...file, publicUrl: matchedUrl }
        })
        setFiles(withUrls)
      }
      setLoadingFiles(false)
    }
  }

  // 1. Cek User Session & Subscribe Realtime
  useEffect(() => {
    // A. Check Auth Session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        fetchFiles(user.id)
      }
      // Selesai memeriksa session pertama kali
      setCheckingSession(false)
    }).catch(() => {
      setCheckingSession(false)
    })

    // B. Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)
      if (currentUser) {
        fetchFiles(currentUser.id)
      } else {
        setFiles([])
      }
      setCheckingSession(false)
    })

    // C. Realtime Channel Setup
    const channel = supabase.channel('filevault-hub', {
      config: {
        presence: {
          key: 'user_' + Math.random().toString(36).substr(2, 9),
        },
      },
    })

    channelRef.current = channel

    channel
      .on('broadcast', { event: 'file-event' }, (payload) => {
        console.log('Realtime update received:', payload)
        if (user?.id) {
          fetchFiles(user.id)
        }
        showNotification(payload.payload.message, 'info')
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState()
        const userCount = Object.keys(state).length
        setActiveUsers(userCount)
      })
      .subscribe((status) => {
        setRealtimeStatus(status)
        if (status === 'SUBSCRIBED') {
          channel.track({ online_at: new Date().toISOString() })
        }
      })

    return () => {
      subscription.unsubscribe()
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [user?.id])

  const broadcastChange = (message) => {
    if (channelRef.current && realtimeStatus === 'SUBSCRIBED') {
      channelRef.current.send({
        type: 'broadcast',
        event: 'file-event',
        payload: { message },
      })
    }
  }

  const handleUpload = async (selectedFiles) => {
    if (!user) {
      showNotification('Silakan masuk terlebih dahulu.', 'error')
      return
    }
    if (!selectedFiles || selectedFiles.length === 0) return

    // Optimasi 3: Validasi tipe file dan ukuran file (< 50MB) langsung di sisi klien
    const allowed = []
    const oversized = []

    for (let f of Array.from(selectedFiles)) {
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(f.type)) {
        continue // Lewati format yang tidak didukung
      }
      if (f.size > 50 * 1024 * 1024) {
        oversized.push(f.name)
      } else {
        allowed.push(f)
      }
    }

    if (oversized.length > 0) {
      showNotification(`File berikut terlalu besar (Maks 50MB): ${oversized.join(', ')}`, 'error')
    }

    if (allowed.length === 0) {
      if (oversized.length === 0) {
        showNotification('Hanya file JPG, PNG, atau PDF yang diizinkan.', 'error')
      }
      return
    }

    setUploading(true)
    setUploadProgress(0)
    let successCount = 0
    for (let i = 0; i < allowed.length; i++) {
      const file = allowed[i]
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const fileName = `${Date.now()}_${safeName}`
      
      // Upload ke uploads/USER_ID/filename
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`${user.id}/${fileName}`, file, { upsert: false })

      if (error) {
        showNotification(`Gagal upload "${file.name}": ${error.message}`, 'error')
      } else {
        successCount++
      }
      setUploadProgress(Math.round(((i + 1) / allowed.length) * 100))
    }
    setUploading(false)
    setUploadProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
    if (successCount > 0) {
      showNotification(`${successCount} file berhasil diupload!`)
      fetchFiles(user.id)
      broadcastChange(`File baru telah diupload oleh pengguna lain.`)
    }
  }

  const handleDelete = async (fileName) => {
    if (!user) return
    setDeletingId(fileName)
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([`${user.id}/${fileName}`])

    if (error) {
      showNotification('Gagal menghapus: ' + error.message, 'error')
    } else {
      showNotification('File berhasil dihapus.')
      setFiles(prev => prev.filter(f => f.name !== fileName))
      broadcastChange(`File telah dihapus oleh pengguna lain.`)
    }
    setDeletingId(null)
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      showNotification('Gagal keluar: ' + error.message, 'error')
    } else {
      setUser(null)
      showNotification('Anda telah keluar.')
    }
  }

  // Optimasi 2: Layar Loading Premium saat memeriksa Sesi Supabase Auth
  if (checkingSession) {
    return (
      <div className="splash-screen">
        <div className="splash-screen__inner">
          <div className="spinner-ring" />
          <h3 className="splash-screen__title">Membuka FileVault...</h3>
          <p className="splash-screen__desc">Menghubungkan ke layanan penyimpanan aman Supabase</p>
        </div>
      </div>
    )
  }

  return (
    <div className="site">
      {notification && (
        <div className={`toast toast--${notification.type}`}>
          {notification.type === 'success' ? '✓' : notification.type === 'error' ? '✕' : 'ℹ'} {notification.message}
        </div>
      )}

      {previewFile && (
        <div className="modal-overlay" onClick={() => setPreviewFile(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPreviewFile(null)}>✕</button>
            {/\.(jpg|jpeg|png)$/i.test(previewFile.name)
              ? <img src={previewFile.publicUrl} alt={previewFile.name} className="modal-img" />
              : <iframe src={previewFile.publicUrl} title={previewFile.name} className="modal-pdf" />
            }
            <p className="modal-name">{previewFile.name.replace(/^\d+_/, '')}</p>
          </div>
        </div>
      )}

      <Navbar activeUsers={activeUsers} realtimeStatus={realtimeStatus} user={user} onSignOut={handleSignOut} />
      
      {!user ? (
        <>
          <Hero user={user} />
          <StatsBar />
          <FeaturesGrid />
          <div id="auth">
            <Auth onAuthSuccess={(u) => setUser(u)} />
          </div>
          <FaqSection />
          <Footer />
        </>
      ) : (
        <>
          <Hero user={user} />
          <StatsBar />
          <ProblemSection />
          <FeaturesGrid />
          <AddonsSection />
          <Testimonial
            quote='"Dengan FileVault, tim kami bisa mengelola dokumen proyek dari mana saja. Upload, preview, dan berbagi file jadi jauh lebih mudah dan aman."'
            author="Andi Pratama"
            role="Project Manager, Enuma Digital"
          />
          <BenefitsSection />
          <MidCta />
          <Testimonial
            quote='"FileVault mengubah cara kami menyimpan dan mengakses dokumen klien. Semua tersimpan rapi di cloud dan bisa diakses kapan saja."'
            author="Sari Dewi"
            role="CEO, Kreasi Nusantara"
            variant="alt"
          />
          <FaqSection />
          <UploadSection
            files={files}
            uploading={uploading}
            uploadProgress={uploadProgress}
            loadingFiles={loadingFiles}
            deletingId={deletingId}
            fileInputRef={fileInputRef}
            onUpload={handleUpload}
            onDelete={handleDelete}
            onPreview={setPreviewFile}
            onRefresh={() => fetchFiles(user.id)}
          />
          <ResourcesSection />
          <FooterCta />
          <Footer />
        </>
      )}
    </div>
  )
}
