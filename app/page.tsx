'use client'

import { useState } from 'react'
import { Clock, FileText, Trash2 } from 'lucide-react'

import { Worksheet } from '@/lib/schemas'

import WorksheetForm from '@/components/WorksheetForm'

import WorksheetView from '@/components/WorksheetView'

const HISTORY_STORAGE_KEY = 'studia-worksheet-history'
const MAX_HISTORY_ITEMS = 8

type SavedWorksheet = {
  id: string
  savedAt: string
  worksheet: Worksheet
}

export default function HomePage() {
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<SavedWorksheet[]>(() => {
    try {
      if (typeof window === 'undefined') {
        return []
      }

      const storedHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY)

      if (storedHistory) {
        return JSON.parse(storedHistory)
      }
    } catch (error) {
      console.error('Error loading worksheet history:', error)
    }

    return []
  })

  const showForm = !worksheet && !isLoading
  const showResult = isLoading || worksheet

  const saveHistory = (nextHistory: SavedWorksheet[]) => {
    setHistory(nextHistory)
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory))
  }

  const handleGenerate = (generatedWorksheet: Worksheet) => {
    const savedWorksheet = {
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
      worksheet: generatedWorksheet
    }

    const nextHistory = [
      savedWorksheet,
      ...history
    ].slice(0, MAX_HISTORY_ITEMS)

    saveHistory(nextHistory)
    setWorksheet(generatedWorksheet)
  }

  const handleDeleteHistoryItem = (id: string) => {
    saveHistory(history.filter((item) => item.id !== id))
  }

  const handleClearHistory = () => {
    saveHistory([])
  }

  const formatSavedAt = (savedAt: string) => {
    return new Intl.DateTimeFormat('es', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(savedAt))
  }

  return (
    <main className='min-h-screen p-4 md:p-8 bg-transparent'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8 space-y-4 no-print'>
          <div className='inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium font-accent shadow-sm ring-1 ring-primary/15'>
            <span className='inline-flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse' />
            1.º a 6.º de Primaria · Global
          </div>

          <h1 className='text-6xl md:text-7xl font-bold mb-4 font-heading tracking-tight text-gradient py-2'>
            StudIA
          </h1>

          <p className='mx-auto max-w-2xl text-muted-foreground text-xl font-accent leading-relaxed'>
            ¡Hola! Estamos aquí para ayudarte a repasar de forma fácil y divertida. Crea tus propias fichas de ejercicios personalizadas en un momento.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8'>
          {showForm && (
            <div className='mx-auto w-full max-w-3xl'>
              <WorksheetForm
                onGenerate={handleGenerate}
                onLoading={setIsLoading}
              />

              <section className='mt-6 rounded-[2rem] border border-border/50 bg-background/80 p-5 shadow-[0_16px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl no-print'>
                <div className='mb-4 flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                      <Clock className='h-5 w-5' />
                    </div>
                    <div>
                      <h2 className='font-heading text-xl font-bold text-foreground'>
                        Fichas recientes
                      </h2>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Recupera tus ultimas fichas sin volver a generarlas.
                      </p>
                    </div>
                  </div>

                  {history.length > 0 && (
                    <button
                      type='button'
                      onClick={handleClearHistory}
                      className='inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                    >
                      <Trash2 className='h-4 w-4' />
                      Vaciar
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className='rounded-2xl border border-dashed border-border bg-muted/35 px-4 py-6 text-center'>
                    <FileText className='mx-auto mb-3 h-6 w-6 text-muted-foreground' />
                    <p className='font-bold text-foreground'>
                      Aun no hay fichas guardadas
                    </p>
                    <p className='mx-auto mt-1 max-w-md text-sm font-medium text-muted-foreground'>
                      Cuando generes una ficha, la guardaremos aqui automaticamente en este navegador.
                    </p>
                  </div>
                ) : (
                  <div className='grid gap-3'>
                    {history.map((item) => (
                      <article
                        key={item.id}
                        className='flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between'
                      >
                        <button
                          type='button'
                          onClick={() => setWorksheet(item.worksheet)}
                          className='flex min-w-0 flex-1 items-start gap-3 text-left'
                        >
                          <FileText className='mt-1 h-5 w-5 shrink-0 text-primary' />
                          <span className='min-w-0'>
                            <span className='block truncate font-bold text-foreground'>
                              {item.worksheet.title}
                            </span>
                            <span className='mt-1 block text-sm font-medium text-muted-foreground'>
                              {item.worksheet.metadata.grade} · {item.worksheet.metadata.subject} · {formatSavedAt(item.savedAt)}
                            </span>
                          </span>
                        </button>

                        <button
                          type='button'
                          onClick={() => handleDeleteHistoryItem(item.id)}
                          className='inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-700 sm:self-auto'
                          aria-label={`Borrar ${item.worksheet.title}`}
                        >
                          <Trash2 className='h-4 w-4' />
                          Borrar
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {showResult && (
            <div className='mx-auto w-full max-w-5xl'>
              <WorksheetView
                worksheet={worksheet}
                isLoading={isLoading}
                onReset={() => setWorksheet(null)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
