'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Send, AlertCircle, Sparkles } from 'lucide-react'
import { login } from './actions'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await login(password)
      if (res.success) {
        // Redirect to homepage and force refresh to let middleware pick up the cookie
        router.push('/')
        router.refresh()
      } else {
        setError(res.error || 'Contraseña incorrecta')
      }
    } catch {
      setError('Algo ha salido mal. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='min-h-screen flex items-center justify-center p-4 bg-transparent font-accent'>
      <div className='w-full max-w-md bg-background/80 backdrop-blur-xl border border-border/50 p-8 shadow-[0_24px_80px_-40px_rgba(37,99,235,0.25)] rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_24px_80px_-20px_rgba(37,99,235,0.35)] hover:border-primary/20 animate-in fade-in zoom-in-95 duration-500'>
        
        {/* Encabezado */}
        <div className='text-center mb-8 space-y-3'>
          <div className='inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm mb-2 relative group'>
            <div className='absolute inset-0 rounded-3xl bg-primary/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity' />
            <Lock className='w-6 h-6 relative z-10 animate-pulse' />
          </div>
          
          <div className='flex items-center justify-center gap-1.5'>
            <h1 className='text-3xl font-black text-foreground font-heading tracking-tight'>
              StudIA Privado
            </h1>
            <Sparkles className='w-5 h-5 text-amber-500 animate-bounce' />
          </div>
          
          <p className='text-sm text-muted-foreground font-medium max-w-xs mx-auto'>
            Introduce la contraseña escolar para proteger tu ficha de ejercicios y la clave de Gemini.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
            <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
              ¿Cuál es la contraseña?
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña escolar'
              className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-hidden'
              required
              autoFocus
            />
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className='flex items-center gap-2.5 p-4 text-sm text-red-600 bg-red-50 rounded-2xl border border-red-100 font-bold animate-in fade-in slide-in-from-top-2 duration-300'>
              <AlertCircle className='w-4 h-4 shrink-0' />
              <span>{error}</span>
            </div>
          )}

          {/* Botón de Envío */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-linear-to-r from-primary to-sky-500 text-primary-foreground rounded-full shadow-lg shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-500 active:scale-[0.98] focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold'
          >
            {isLoading ? (
              <>
                <div className='w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin' />
                Verificando...
              </>
            ) : (
              <>
                <Send className='w-4 h-4' />
                Entrar a StudIA
              </>
            )}
          </button>
        </form>

        <div className='text-center mt-6'>
          <span className='text-[10px] font-black uppercase tracking-wider text-muted-foreground/50'>
            © 2026 StudIA · Todos los derechos reservados
          </span>
        </div>
      </div>
    </main>
  )
}
