import { z } from 'zod'

const optionalText = z.preprocess(
  (value) => typeof value === 'string' && value.trim() === '' ? undefined : value,
  z.string().trim().optional()
)

export const GenerationRequestSchema = z.object({
  subject: z.string().trim().min(1, 'Elige una asignatura'),
  topic: z.string().trim().min(2, 'Escribe un tema un poco mas concreto'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  language: z.enum(['es', 'ca', 'en']),
  grade: z.enum([
    '1º de primaria',
    '2º de primaria',
    '3º de primaria',
    '4º de primaria',
    '5º de primaria',
    '6º de primaria'
  ]),
  gender: z.enum(['boy', 'girl', 'neutral']).default('neutral'),
  worksheetStyle: z.enum(['review', 'exam', 'game', 'support', 'extension']).default('review'),
  duration: z.enum(['10', '20', '30']).default('20'),
  region: optionalText,
  count: z.coerce.number().int().min(1).max(20)
})

export const ExerciseSchema = z.object({
  type: z.enum([
    'multiple_choice',
    'short_answer',
    'fill_blank',
    'reading_comprehension'
  ]),

  question: z.string().optional(),

  sentence: z.string().optional(),

  text: z.string().optional(),

  options: z.array(z.string()).optional(),

  answer: z.string(),

  explanation: z.string()
})

export const WorksheetMetadataSchema = z.object({
  subject: z.string(),
  topic: z.string(),
  difficulty: z.string(),
  language: z.string(),
  grade: z.string(),
  gender: z.string().optional(),
  worksheetStyle: z.string().optional(),
  duration: z.string().optional(),
  region: z.string().optional()
})

export const WorksheetSchema = z.object({
  title: z.string(),

  learningObjective: z.string(),

  instructions: z.string(),

  metadata: WorksheetMetadataSchema,

  exercises: z.array(ExerciseSchema)
})

export type Exercise = z.infer<typeof ExerciseSchema>
export type Worksheet = z.infer<typeof WorksheetSchema>
export type GenerationRequest = z.infer<typeof GenerationRequestSchema>
