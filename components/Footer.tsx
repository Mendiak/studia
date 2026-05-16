import { ExternalLink, Brain, BookOpen, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='mt-auto border-t border-border/50 bg-background/50 backdrop-blur-xl'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Columna 1: Sobre el proyecto */}
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Brain className='w-5 h-5' />
              </div>
              <span className='font-heading font-bold text-xl'>StudIA</span>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed'>
              Generador inteligente de fichas de repaso para primaria. Ayudamos a familias y docentes a crear material educativo de alta calidad de forma instantánea y personalizada.
            </p>
          </div>

          {/* Columna 2: Cómo funciona */}
          <div className='space-y-4'>
            <h3 className='font-heading font-bold text-sm uppercase tracking-wider text-foreground'>¿Cómo funciona?</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3 text-sm text-muted-foreground'>
                <div className='mt-1 p-1 rounded-md bg-muted'>
                  <BookOpen className='w-3 h-3 text-primary' />
                </div>
                <span>Elige la asignatura, el tema y el nivel educativo del alumno.</span>
              </li>
              <li className='flex items-start gap-3 text-sm text-muted-foreground'>
                <div className='mt-1 p-1 rounded-md bg-muted'>
                  <Sparkles className='w-3 h-3 text-primary' />
                </div>
                <span>Nuestra IA genera una ficha única con ejercicios adaptados.</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces y Autor */}
          <div className='space-y-4'>
            <h3 className='font-heading font-bold text-sm uppercase tracking-wider text-foreground'>Enlaces</h3>
            <div className='flex flex-col gap-3'>
              <a
                href='https://github.com/Mendiak/studia'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit'
              >
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='w-4 h-4'
                >
                  <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
                </svg>
                Repositorio en GitHub
              </a>
              <a
                href='https://mendiak.github.io/portfolio/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit'
              >
                <ExternalLink className='w-4 h-4' />
                Desarrollado por Mikel Aramendia
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-muted-foreground/60'>
            © {new Date().getFullYear()} StudIA. Creado con fines educativos.
          </p>
          <div className='flex items-center gap-6'>
            <span className='text-xs text-muted-foreground/40'>Next.js + Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
