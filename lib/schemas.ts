import { z } from 'zod'

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