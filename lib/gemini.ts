import { GoogleGenerativeAI } from '@google/generative-ai'

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
}

export function getWorksheetModel() {
  const apiKey = getGeminiApiKey()

  if (!apiKey) {
    throw new Error('Missing Gemini API key')
  }

  const genAI = new GoogleGenerativeAI(apiKey)

  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash'
  })
}
