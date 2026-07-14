import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth({ onAuthSuccess }) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setErrorMsg(null)

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        setMessage('Registrasi berhasil! Silakan cek email Anda untuk konfirmasi (jika email confirmation aktif), atau Anda sekarang bisa langsung masuk jika bypass aktif.')
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        onAuthSuccess(data.user)
      }
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-box__logo">
          <span className="auth-box__logo-icon">⬡</span>
          <span className="auth-box__logo-text">FileVault</span>
        </div>
        <h2 className="auth-box__title">
          {isSignUp ? 'Buat Akun Vault Baru' : 'Masuk ke Vault Anda'}
        </h2>
        <p className="auth-box__subtitle">
          {isSignUp 
            ? 'Daftar sekarang untuk mengelola dokumen dan gambar Anda secara aman.' 
            : 'Masukkan email dan password Anda untuk mengakses file.'}
        </p>

        {message && <div className="auth-alert auth-alert--success">{message}</div>}
        {errorMsg && <div className="auth-alert auth-alert--danger">{errorMsg}</div>}

        <form onSubmit={handleAuth} className="auth-form">
          <div className="auth-form__group">
            <label className="auth-form__label">Email Address</label>
            <input
              type="email"
              className="auth-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Password</label>
            <input
              type="password"
              className="auth-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn--teal btn--lg btn--block" disabled={loading}>
            {loading ? 'Memproses...' : isSignUp ? 'Daftar Akun Baru' : 'Masuk Sekarang'}
          </button>
        </form>

        <div className="auth-box__footer">
          <button onClick={() => setIsSignUp(!isSignUp)} className="auth-box__switch-btn">
            {isSignUp 
              ? 'Sudah punya akun? Masuk di sini' 
              : 'Belum punya akun? Daftar di sini'}
          </button>
        </div>
      </div>
    </div>
  )
}
