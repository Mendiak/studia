'use client'

import { useState } from 'react'
import { FileText, BookOpen, Target, Globe, Hash, Send } from 'lucide-react'
import { Worksheet } from '@/lib/schemas'

interface Props {
  onGenerate: (worksheet: Worksheet) => void
  onLoading: (isLoading: boolean) => void
}

export default function WorksheetForm({
  onGenerate,
  onLoading
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()
    setIsLoading(true)
    onLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      const payload = {
        subject: formData.get('subject'),
        topic: formData.get('topic'),
        difficulty: formData.get('difficulty'),
        language: formData.get('language'),
        grade: formData.get('grade'),
        region: formData.get('region'),
        gender: formData.get('gender'),
        count: Number(formData.get('count'))
      }

      const res = await fetch('/api/generate', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || 'Error generating worksheet')
        return
      }

      onGenerate(data)
    } catch (error) {
      console.error('Error generating worksheet:', error)
      alert('Error generating worksheet')
    } finally {
      setIsLoading(false)
      onLoading(false)
    }
  }

  return (
    <div className='bg-background/80 backdrop-blur-xl border border-border/50 p-8 shadow-[0_24px_80px_-40px_rgba(37,99,235,0.25)] rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_24px_80px_-20px_rgba(37,99,235,0.35)] hover:border-primary/20'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm'>
          <FileText className='w-6 h-6' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-foreground font-heading'>¡Vamos a preparar tu ficha!</h2>
          <p className='text-sm text-muted-foreground font-accent font-medium'>Cuéntanos qué necesitas repasar hoy y nosotros nos encargamos del resto.</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'
      >
        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Hash className='w-4 h-4 text-primary' />
            ¿En qué curso estás?
          </label>
          <select
            name='grade'
            defaultValue='4º de primaria'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='1º de primaria'>1º de primaria</option>
            <option value='2º de primaria'>2º de primaria</option>
            <option value='3º de primaria'>3º de primaria</option>
            <option value='4º de primaria'>4º de primaria</option>
            <option value='5º de primaria'>5º de primaria</option>
            <option value='6º de primaria'>6º de primaria</option>
          </select>
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <BookOpen className='w-4 h-4 text-primary' />
            ¿Qué asignatura repasamos?
          </label>
          <select
            name='subject'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='matemáticas'>Matemáticas</option>
            <option value='catalán'>Catalán</option>
            <option value='castellano'>Castellano</option>
            <option value='ciencias'>Ciencias</option>
            <option value='historia'>Historia</option>
          </select>
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Target className='w-4 h-4 text-primary' />
            ¿De qué trata el tema?
          </label>
          <input
            name='topic'
            placeholder='Ej: Fracciones, los verbos, el sistema solar...'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          />
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Target className='w-4 h-4 text-primary' />
            ¿Cómo de difícil lo quieres?
          </label>
          <select
            name='difficulty'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='easy'>Fácil (para empezar)</option>
            <option value='medium'>Normal (un poco de todo)</option>
            <option value='hard'>Difícil (¡un buen reto!)</option>
          </select>
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Globe className='w-4 h-4 text-primary' />
            ¿Para un niño, una niña o neutro?
          </label>
          <select
            name='gender'
            defaultValue='neutral'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='boy'>Niño</option>
            <option value='girl'>Niña</option>
            <option value='neutral'>Neutro / Inclusivo</option>
          </select>
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Globe className='w-4 h-4 text-primary' />
            ¿En qué idioma la prefieres?
          </label>
          <select
            name='language'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='es'>Castellano</option>
            <option value='ca'>Català</option>
            <option value='en'>English</option>
          </select>
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Target className='w-4 h-4 text-primary' />
            ¿Alguna región o contexto? (Opcional)
          </label>
          <input
            name='region'
            placeholder='Ej: Catalunya, México, España, Madrid...'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
          />
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Hash className='w-4 h-4 text-primary' />
            ¿Cuántos ejercicios quieres?
          </label>
          <input
            type='number'
            name='count'
            defaultValue={6}
            min={1}
            max={20}
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='md:col-span-2 w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-primary to-sky-500 text-primary-foreground rounded-full shadow-lg shadow-sky-500/20 hover:from-sky-600 hover:to-cyan-500 active:scale-[0.98] focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium font-accent'
        >
          {isLoading ? (
            <>
              <div className='w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin' />
              Preparando tus ejercicios...
            </>
          ) : (
            <>
              <Send className='w-4 h-4' />
              ¡Crear mi ficha ahora!
            </>
          )}
        </button>
      </form>
    </div>
  )
}