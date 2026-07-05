/*
  Estos son los "planos" de la API de voz del navegador.
  Normalmente TypeScript ya sabe cómo funcionan, pero como la API de
  reconocimiento de voz es experimental, hay que decirle a TypeScript
  cómo se ve. Es como darle un instructivo para que no se queje.
  Se importa en: useVoiceInput.ts (aunque es automático por estar en types/).
  Importancia: 🟢 Baja (puro adorno para que TS no grite).
*/

interface SpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void; stop(): void; abort(): void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean; length: number
}

interface SpeechRecognitionAlternative {
  transcript: string; confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string; message: string
}

interface Window {
  SpeechRecognition: typeof SpeechRecognition
  webkitSpeechRecognition: typeof SpeechRecognition
}
