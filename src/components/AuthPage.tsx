import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function AuthPage() {
  const { signIn, signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (isRegister) {
      const msg = await signUp(email, password)
      if (msg) {
        setError(msg)
      } else {
        setSuccess('Revisa tu correo para confirmar la cuenta')
      }
    } else {
      const msg = await signIn(email, password)
      if (msg) setError(msg)
    }
  }

  return (
    <div className="min-h-dvh bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Kalamar</h1>
          <p className="text-neutral-500 text-sm mt-1">Control de gastos personal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-rose-500/50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-rose-500/50"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-emerald-400 text-sm text-center">{success}</p>}

          <button type="submit" className="w-full py-3 bg-rose-500 text-white rounded-xl font-medium">
            {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>

          <p className="text-center text-sm text-neutral-500">
            {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => { setIsRegister(!isRegister); setError(''); setSuccess('') }}
              className="text-rose-400 hover:underline"
            >
              {isRegister ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
