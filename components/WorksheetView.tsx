'use client'

import { FileText, CheckCircle, Lightbulb, BookOpen, GraduationCap, Target, BarChart, Globe, MapPin, Printer, PlusCircle, RefreshCw } from 'lucide-react'
import { Worksheet, Exercise } from '@/lib/schemas'

interface Props {
  worksheet: Worksheet | null
  isLoading: boolean
  onReset: () => void
}

const exerciseTypeLabels: Record<Exercise['type'], string> = {
  multiple_choice: 'Opción múltiple',
  short_answer: 'Respuesta corta',
  fill_blank: 'Completar hueco',
  reading_comprehension: 'Lectura comprensiva'
}

const difficultyLabels: Record<string, string> = {
  easy: 'Fácil',
  medium: 'Intermedio',
  hard: 'Retador'
}

const languageLabels: Record<string, string> = {
  ca: 'Català',
  es: 'Español',
  en: 'English'
}

const genderLabels: Record<string, string> = {
  boy: 'Para niño',
  girl: 'Para niña',
  neutral: 'Inclusivo'
}

function renderFillBlank(sentence?: string) {
  if (!sentence) return null

  const blankPattern = /\[BLANK\]|_{3,}/g
  const parts = sentence.split(blankPattern)
  const blanks = sentence.match(blankPattern) || []

  if (blanks.length === 0) {
    return <>{sentence}</>
  }

  return (
    <>
      {parts.flatMap((part, index) => {
        const nodes = [
          <span key={`part-${index}`}>
            {part}
          </span>
        ]

        if (index < blanks.length) {
          nodes.push(
            <span
              key={`blank-${index}`}
              className='font-bold text-primary underline decoration-primary/50 underline-offset-4'
            >
              _______
            </span>
          )
        }

        return nodes
      })}
    </>
  )
}

export default function WorksheetView({
  worksheet,
  isLoading,
  onReset
}: Props) {
  if (!worksheet || !worksheet.exercises) {
    return (
      <div className='bg-muted/50 border-2 border-dashed border-border p-8 rounded-lg text-center'>
        {isLoading ? (
          <div className='space-y-6'>
            <div className='mx-auto flex flex-col items-center gap-4'>
              <div className='relative w-16 h-16'>
                <div className='absolute inset-0 rounded-full border-4 border-primary/40' />
                <div className='absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin' />
              </div>
              <div className='space-y-2'>
                <div className='h-4 w-48 mx-auto rounded-full bg-muted-foreground/20 animate-pulse' />
                <div className='h-3 w-64 mx-auto rounded-full bg-muted-foreground/20 animate-pulse' />
              </div>
            </div>

            <div className='grid gap-4'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='rounded-3xl border border-border bg-background p-6 shadow-sm'
                >
                  <div className='h-4 w-36 rounded-full bg-muted-foreground/20 animate-pulse' />
                  <div className='mt-5 space-y-3'>
                    <div className='h-3 rounded-full bg-muted-foreground/20 animate-pulse' />
                    <div className='h-3 w-5/6 rounded-full bg-muted-foreground/20 animate-pulse' />
                    <div className='h-3 w-4/6 rounded-full bg-muted-foreground/20 animate-pulse' />
                  </div>
                </div>
              ))}
            </div>

            <p className='text-sm text-muted-foreground'>
              ¡Un segundito! Estamos preparando tus ejercicios con mucho cariño...
            </p>
          </div>
        ) : (
          <>
            <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium text-muted-foreground mb-2'>
              Aún no hemos empezado
            </h3>
            <p className='text-sm text-muted-foreground'>
              Rellena los datos arriba y nos ponemos manos a la obra con tu ficha.
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className='relative bg-white border border-border p-10 shadow-[0_32px_120px_-40px_rgba(15,23,42,0.1)] rounded-[2rem] transition-all duration-500 hover:shadow-2xl print-page overflow-hidden print:shadow-none print:border-none print:p-0 print:rounded-none'>
      {/* Notebook margin effect */}
      <div className='absolute left-0 top-0 bottom-0 w-8 bg-slate-50 border-r border-dashed border-slate-200 no-print' />
      <div className='absolute left-3 top-0 bottom-0 w-px bg-red-200 no-print' />

      <div className='relative z-10'>
        {isLoading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-4xl'>
            <div className='flex flex-col items-center gap-3'>
              <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin' />
              <p className='text-lg font-bold text-slate-900'>Casi lo tenemos listo...</p>
            </div>
          </div>
        )}
        <div className='mb-10'>
          <div className='max-w-4xl'>
            <h1 className='text-4xl md:text-5xl font-black text-slate-900 mb-6 font-heading tracking-tight leading-tight'>
              {worksheet.title}
            </h1>

            {/* Recap Badges */}
            <div className='flex flex-wrap gap-2 mb-6'>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-600 border border-slate-200/50 shadow-xs'>
                <GraduationCap className='w-3.5 h-3.5 text-slate-500' />
                {worksheet.metadata.grade}
              </div>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-slate-600 border border-slate-200/50 shadow-xs'>
                <FileText className='w-3.5 h-3.5 text-slate-500' />
                {genderLabels[worksheet.metadata.gender || 'neutral']}
              </div>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-blue-700 border border-blue-100/50 shadow-xs'>
                <BookOpen className='w-3.5 h-3.5 text-blue-500' />
                {worksheet.metadata.subject}
              </div>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-purple-700 border border-purple-100/50 shadow-xs'>
                <Target className='w-3.5 h-3.5 text-purple-500' />
                {worksheet.metadata.topic}
              </div>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-green-700 border border-green-100/50 shadow-xs'>
                <BarChart className='w-3.5 h-3.5 text-green-500' />
                {difficultyLabels[worksheet.metadata.difficulty] || worksheet.metadata.difficulty}
              </div>
              <div className='inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-orange-700 border border-orange-100/50 shadow-xs'>
                <Globe className='w-3.5 h-3.5 text-orange-500' />
                {languageLabels[worksheet.metadata.language] || worksheet.metadata.language}
              </div>
              {worksheet.metadata.region && (
                <div className='inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-red-700 border border-red-100/50 shadow-xs'>
                  <MapPin className='w-3.5 h-3.5 text-red-500' />
                  {worksheet.metadata.region}
                </div>
              )}
            </div>

            <div className='mb-6 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800 ring-1 ring-amber-200/50 shadow-sm'>
              <Lightbulb className='w-5 h-5 text-amber-600' />
              <span>
                <span className='opacity-70 font-black uppercase tracking-widest text-[10px] block mb-0.5'>Objetivo Pedagógico</span>
                {worksheet.learningObjective}
              </span>
            </div>
            <p className='text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-wrap border-l-4 border-slate-100 pl-4 py-1'>
              {worksheet.instructions}
            </p>
          </div>
        </div>

        {/* Sección de Ejercicios */}
        <div className='mb-16'>
          <div className='flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-100'>
            <BookOpen className='w-6 h-6 text-primary' />
            <h2 className='text-2xl font-black text-slate-900 font-heading'>Ejercicios de repaso</h2>
          </div>

          <div className='space-y-8'>
            {worksheet.exercises.map(
              (exercise: Exercise, index: number) => (
                <div key={index} className='group relative border-2 border-slate-100 rounded-[2rem] p-8 bg-white transition-all duration-300 hover:border-primary/20 hover:shadow-lg'>
                  <div className='mb-6 flex items-start justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                      <span className='bg-primary text-white rounded-xl w-10 h-10 flex items-center justify-center text-lg font-black shadow-[0_4px_0_0_rgba(37,99,235,0.2)]'>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className='font-black text-xl text-slate-900'>
                          Reto {index + 1}
                        </h3>
                        <div className='mt-1 inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600'>
                          {exerciseTypeLabels[exercise.type]}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    {exercise.type === 'fill_blank' ? (
                      <div>
                        <p className='text-slate-900 font-bold mb-3 text-lg'>📝 Completa los huecos:</p>
                        <div className='rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-6 text-xl text-slate-800 leading-loose'>
                          {renderFillBlank(exercise.sentence)}
                        </div>
                      </div>
                    ) : exercise.type === 'reading_comprehension' ? (
                      <div className='space-y-6'>
                        <div>
                          <p className='text-slate-900 font-bold mb-3 text-lg'>📖 Lee con atención:</p>
                          <div className='rounded-2xl border-2 border-primary/10 bg-primary/5 p-6 text-xl text-slate-800 leading-relaxed italic'>
                            {exercise.text}
                          </div>
                        </div>
                        {exercise.question && (
                          <div>
                            <p className='text-slate-900 font-bold mb-3 text-lg'>❓ Ahora responde:</p>
                            <p className='text-slate-800 text-xl font-medium leading-relaxed'>{exercise.question}</p>
                          </div>
                        )}
                      </div>
                    ) : exercise.question ? (
                      <div>
                        <p className='text-slate-900 font-bold mb-3 text-lg'>❓ Pregunta:</p>
                        <p className='text-slate-800 text-xl font-medium leading-relaxed'>{exercise.question}</p>
                      </div>
                    ) : null}

                    {exercise.type !== 'fill_blank' && exercise.sentence ? (
                      <div className='bg-amber-50/30 border-l-4 border-amber-200 p-4 rounded-r-2xl'>
                        <p className='text-slate-900 font-bold mb-2'>👀 Observa con atención:</p>
                        <p className='text-slate-800 italic text-lg leading-relaxed'>{exercise.sentence}</p>
                      </div>
                    ) : null}

                    {exercise.options && exercise.options.length > 0 && (
                      <div>
                        <p className='text-slate-900 font-bold mb-4 text-lg'>🎯 Elige la respuesta correcta:</p>
                        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                          {exercise.options.map((option: string, optionIndex: number) => (
                            <li
                              key={optionIndex}
                              className='flex items-center gap-4 rounded-2xl border-2 border-slate-100 bg-white px-6 py-4 text-slate-800 font-bold transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 shadow-sm'
                            >
                              <span className='w-8 h-8 shrink-0 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center text-sm font-black'>
                                {String.fromCharCode(97 + optionIndex).toUpperCase()}
                              </span>
                              <span className='text-lg'>{option}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className='mt-8 pt-6 border-t-2 border-dashed border-slate-100'>
                      <p className='text-slate-400 text-sm font-bold uppercase tracking-widest mb-4'>Tu respuesta aquí:</p>
                      <div className='h-24 w-full rounded-2xl bg-slate-50/50 border-2 border-slate-100' />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Sección de Soluciones */}
        <div className='border-t-4 border-slate-100 pt-16 mt-8'>
          <div className='flex items-center gap-3 mb-10'>
            <div className='bg-green-100 p-2 rounded-xl'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <h2 className='text-3xl font-black text-slate-900 font-heading'>¡Comprobamos resultados!</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {worksheet.exercises.map(
              (exercise: Exercise, index: number) => (
                <div key={`solution-${index}`} className='group border-2 border-green-100 rounded-[2rem] p-8 bg-green-50/20 transition-all duration-300 hover:bg-green-50/40'>
                  <div className='flex items-center gap-4 mb-6'>
                    <span className='bg-green-600 text-white rounded-xl w-8 h-8 flex items-center justify-center text-sm font-black shadow-[0_4px_0_0_rgba(22,163,74,0.2)]'>
                      {index + 1}
                    </span>
                    <h3 className='font-black text-lg text-slate-900'>
                      Solución del reto {index + 1}
                    </h3>
                  </div>

                  <div className='space-y-6'>
                    <div className='bg-white p-5 rounded-2xl border-2 border-green-100 shadow-sm'>
                      <div className='flex items-center gap-2 mb-2'>
                        <CheckCircle className='w-4 h-4 text-green-600' />
                        <p className='text-[10px] font-black text-green-700 uppercase tracking-widest'>Respuesta correcta</p>
                      </div>
                      <p className='text-slate-900 font-black text-xl'>{exercise.answer}</p>
                    </div>

                    <div className='flex items-start gap-4 px-2'>
                      <div className='bg-amber-100 p-2 rounded-lg mt-1'>
                        <Lightbulb className='w-4 h-4 text-amber-700' />
                      </div>
                      <div>
                        <p className='text-[10px] font-black text-amber-700 uppercase tracking-widest mb-1'>¿Por qué es así?</p>
                        <p className='text-slate-700 leading-relaxed font-bold text-base'>{exercise.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Action Bar Flotante */}
      <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-white/90 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] no-print animate-in fade-in slide-in-from-bottom-8 duration-700'>
        <button
          onClick={onReset}
          className='flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors rounded-xl hover:bg-slate-100'
        >
          <PlusCircle className='w-5 h-5 text-slate-500' />
          Nueva ficha
        </button>

        <div className='w-px h-8 bg-slate-200 mx-1' />

        <button
          onClick={() => window.print()}
          className='flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95'
        >
          <Printer className='w-5 h-5' />
          Imprimir ficha
        </button>
      </div>
    </div>
  )
}