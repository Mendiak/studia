import { NextResponse } from 'next/server'

import { getWorksheetModel } from '@/lib/gemini'

import { buildPrompt } from '@/lib/prompts'

import { GenerationRequestSchema, WorksheetSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  try {
    let json: unknown

    try {
      json = await req.json()
    } catch {
      return NextResponse.json(
        {
          error: 'No hemos podido leer los datos del formulario. Intentalo de nuevo.'
        },
        {
          status: 400
        }
      )
    }

    const request = GenerationRequestSchema.safeParse(json)

    if (!request.success) {
      const firstIssue = request.error.issues[0]

      return NextResponse.json(
        {
          error: firstIssue?.message || 'Revisa los datos del formulario antes de crear la ficha.'
        },
        {
          status: 400
        }
      )
    }

    const body = request.data
    const prompt = buildPrompt(body)
    const model = getWorksheetModel()

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],

      generationConfig: {
        responseMimeType: 'application/json'
      }
    })

    const text = result.response.text()

    let parsed: Record<string, unknown>

    try {
      const parsedJson = JSON.parse(text) as unknown

      if (
        typeof parsedJson !== 'object' ||
        parsedJson === null ||
        Array.isArray(parsedJson)
      ) {
        throw new Error('Gemini response is not an object')
      }

      parsed = parsedJson as Record<string, unknown>
    } catch (error) {
      console.error('Gemini returned invalid JSON:', error)

      return NextResponse.json(
        {
          error: 'La ficha se genero con un formato inesperado. Prueba otra vez con el mismo tema.'
        },
        {
          status: 502
        }
      )
    }

    const validated = WorksheetSchema.parse({
      ...parsed,
      metadata: {
        subject: body.subject,
        topic: body.topic,
        difficulty: body.difficulty,
        language: body.language,
        grade: body.grade,
        gender: body.gender,
        worksheetStyle: body.worksheetStyle,
        duration: body.duration,
        region: body.region
      }
    })

    return NextResponse.json(validated)
  } catch (error) {
    console.error('Error generating worksheet:', error)

    if (error instanceof Error && error.message === 'Missing Gemini API key') {
      return NextResponse.json(
        {
          error: 'Falta configurar la clave de Gemini en el servidor.'
        },
        {
          status: 500
        }
      )
    }

    return NextResponse.json(
      {
        error: 'No hemos podido crear la ficha ahora mismo. Prueba con menos ejercicios o intenta de nuevo en unos segundos.'
      },
      {
        status: 500
      }
    )
  }
}
