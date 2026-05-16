'use client'

import { useState } from 'react'

import { Worksheet } from '@/lib/schemas'

import WorksheetForm from '@/components/WorksheetForm'

import WorksheetView from '@/components/WorksheetView'

export default function HomePage() {
  const [worksheet, setWorksheet] = useState<Worksheet | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const showForm = !worksheet && !isLoading
  const showResult = isLoading || worksheet

  return (
    <main className='min-h-screen p-4 md:p-8 bg-muted/30'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8 space-y-4'>
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
                onGenerate={setWorksheet}
                onLoading={setIsLoading}
              />
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
