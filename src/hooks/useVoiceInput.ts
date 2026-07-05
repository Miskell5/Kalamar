/*
  El corazón de la entrada por voz.
  Aquí pasan dos cosas importantes:
  1) parseVoiceInput() — agarra un texto como "gasté 45 en uber" y lo
     convierte en {tipo, monto, descripción, categoría}.
  2) useVoiceInput() — es un hook de React que maneja el micrófono:
     prende/apaga el reconocimiento de voz y guarda lo que se dijo.
  Se importa en: App (tanto el hook como el parser directo).
  Importancia: 🔴 Alta (sin esto no hay magia).
*/

import { useState, useCallback, useRef } from 'react'
import type { ParsedTransaction } from '../db/types'

const COMMON_CATEGORIES: Record<string, string> = {
  comida: 'Comida', super: 'Supermercado', supermercado: 'Supermercado',
  cena: 'Comida', almuerzo: 'Comida', desayuno: 'Comida', restaurante: 'Comida',
  uber: 'Transporte', taxi: 'Transporte', transporte: 'Transporte',
  gasolina: 'Transporte', bus: 'Transporte',
  casa: 'Casa', renta: 'Casa', alquiler: 'Casa',
  luz: 'Servicios', agua: 'Servicios', internet: 'Servicios', telefono: 'Servicios',
  netflix: 'Suscripciones', spotify: 'Suscripciones',
  salario: 'Salario', sueldo: 'Salario', nomina: 'Salario',
  freelance: 'Freelance', regalo: 'Regalos', salud: 'Salud', gym: 'Salud',
  ropa: 'Ropa', educacion: 'Educación', curso: 'Educación',
  viaje: 'Viajes', vacaciones: 'Viajes',
}

export function parseVoiceInput(text: string): ParsedTransaction | null {
  const lower = text.toLowerCase().trim()
  let type: 'income' | 'expense' = 'expense'
  let amount = 0
  let description = ''
  let category = 'Otros'

  const gastoPatterns = [
    /(?:gast[eé]|compr[eé]|pag[ué]|cost[oó]|gasto)\s+(\d+[.,]?\d*)\s*(?:de|en|para|)/i,
    /(\d+[.,]?\d*)\s*(?:de|en|para|)\s*(.+)/i,
  ]

  const ingresoPatterns = [
    /(?:recib[ií]|gan[eé]|ingreso|cobr[eé]|recibi)\s+(\d+[.,]?\d*)\s*(?:de|en|para|)/i,
  ]

  if (/ingreso|recib[ií]|gan[eé]|salario|sueldo|nomina/i.test(lower)) {
    type = 'income'
  }

  const patterns = type === 'income' ? ingresoPatterns : gastoPatterns
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      amount = parseFloat(match[1].replace(',', '.'))
      description = match[2] || match[1] || ''
      break
    }
  }

  if (!amount) {
    const numMatch = lower.match(/(\d+[.,]?\d*)/)
    if (numMatch) amount = parseFloat(numMatch[1].replace(',', '.'))
  }

  if (!description && amount) {
    const afterAmount = lower.replace(/.*?\d+[.,]?\d*\s*/, '')
    description = afterAmount || text
  }

  for (const [key, cat] of Object.entries(COMMON_CATEGORIES)) {
    if (lower.includes(key)) { category = cat; break }
  }

  if (amount <= 0) return null
  return { type, amount, description: description.trim() || text, category }
}

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [parsed, setParsed] = useState<ParsedTransaction | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return

    const recognition = new SpeechRecognitionAPI()
    recognition.lang = 'es-ES'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      setParsed(parseVoiceInput(text))
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const resetParsed = useCallback(() => {
    setTranscript('')
    setParsed(null)
  }, [])

  return { isListening, transcript, parsed, startListening, stopListening, resetParsed }
}
