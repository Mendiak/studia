'use client'

import { useState } from 'react'
import { FileText, BookOpen, Target, Globe, Hash, Send, AlertCircle } from 'lucide-react'
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
  const [subject, setSubject] = useState('matemáticas')
  const [language, setLanguage] = useState('es')
  const [userLanguage, setUserLanguage] = useState('es')
  const [error, setError] = useState('')

  const isLanguageLocked = ['inglés', 'castellano', 'catalán'].includes(subject)

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextSubject = e.target.value
    setSubject(nextSubject)

    if (nextSubject === 'inglés') {
      setLanguage('en')
    } else if (nextSubject === 'castellano') {
      setLanguage('es')
    } else if (nextSubject === 'catalán') {
      setLanguage('ca')
    } else {
      setLanguage(userLanguage)
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = e.target.value
    setLanguage(nextLanguage)
    setUserLanguage(nextLanguage)
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    onLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      const payload = {
        subject: formData.get('subject'),
        topic: formData.get('topic'),
        difficulty: formData.get('difficulty'),
        language: language,
        grade: formData.get('grade'),
        region: formData.get('region'),
        gender: formData.get('gender'),
        worksheetStyle: formData.get('worksheetStyle'),
        duration: formData.get('duration'),
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
        setError(data.error || 'No hemos podido crear la ficha. Intentalo de nuevo.')
        return
      }

      onGenerate(data)
    } catch (error) {
      console.error('Error generating worksheet:', error)
      setError('No hemos podido conectar con el generador. Revisa la conexion e intentalo de nuevo.')
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
            value={subject}
            onChange={handleSubjectChange}
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='matemáticas'>Matemáticas</option>
            <option value='castellano'>Castellano (Lengua)</option>
            <option value='catalán'>Catalán (Llengua)</option>
            <option value='inglés'>Inglés (English)</option>
            <option value='ciencias naturales'>Ciencias Naturales</option>
            <option value='ciencias sociales'>Ciencias Sociales</option>
            <option value='geografía'>Geografía</option>
            <option value='historia'>Historia</option>
            <option value='música'>Música</option>
            <option value='arte'>Plástica / Arte</option>
            <option value='educación emocional'>Educación Emocional</option>
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
            <Target className='w-4 h-4 text-primary' />
            ¿Qué tipo de ficha quieres?
          </label>
          <select
            name='worksheetStyle'
            defaultValue='review'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='review'>Repaso equilibrado</option>
            <option value='exam'>Tipo prueba</option>
            <option value='game'>Retos con juego</option>
            <option value='support'>Refuerzo guiado</option>
            <option value='extension'>Ampliación</option>
          </select>
        </div>

        <div className='rounded-3xl border border-border bg-muted/50 p-4 transition-all duration-200 hover:border-primary/30 focus-within:border-primary/30'>
          <label className='flex items-center gap-2 text-sm font-bold text-muted-foreground mb-2'>
            <Hash className='w-4 h-4 text-primary' />
            ¿Cuánto tiempo tienes?
          </label>
          <select
            name='duration'
            defaultValue='20'
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
            required
          >
            <option value='10'>10 minutos</option>
            <option value='20'>20 minutos</option>
            <option value='30'>30 minutos</option>
          </select>
        </div>

        <div className={`rounded-3xl border border-border p-4 transition-all duration-200 ${isLanguageLocked ? 'bg-muted/30 border-muted-foreground/10' : 'bg-muted/50 hover:border-primary/30 focus-within:border-primary/30'}`}>
          <label className='flex items-center justify-between text-sm font-bold text-muted-foreground mb-2'>
            <span className='flex items-center gap-2'>
              <Globe className='w-4 h-4 text-primary' />
              ¿En qué idioma la prefieres?
            </span>
            {isLanguageLocked && (
              <span className='text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse'>
                Fijado por asignatura
              </span>
            )}
          </label>
          <select
            name='language'
            value={language}
            onChange={handleLanguageChange}
            disabled={isLanguageLocked}
            className='w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-muted/50'
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

        {error && (
          <div className='md:col-span-2 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700'>
            <AlertCircle className='mt-0.5 h-4 w-4 shrink-0' />
            <span>{error}</span>
          </div>
        )}

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
