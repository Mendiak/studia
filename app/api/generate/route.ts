import { NextResponse } from 'next/server'

import { model } from '@/lib/gemini'

import { buildPrompt } from '@/lib/prompts'

import { WorksheetSchema } from '@/lib/schemas'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const prompt = buildPrompt(body)

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

    const parsed = JSON.parse(text)

    const validated = WorksheetSchema.parse({
      ...parsed,
      metadata: {
        subject: body.subject,
        topic: body.topic,
        difficulty: body.difficulty,
        language: body.language,
        grade: body.grade,
        gender: body.gender,
        region: body.region
      }
    })

    return NextResponse.json(validated)
  } catch (error) {
    console.error('Error generating worksheet:', error)

    return NextResponse.json(
      {
        error: 'Error generating worksheet'
      },
      {
        status: 500
      }
    )
  }
}