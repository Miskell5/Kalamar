/*
  La ventana que aparece cuando tocas el micrófono.
  Tiene tres modos:
  - Grabando: muestra la animación de escucha y un botón para detener.
  - Resultado: muestra lo que entendió (tipo, monto, categoría) y pide confirmación.
  - Texto: si no hay voz disponible, puedes escribir directamente.
  Se comunica con: App (recibe datos y funciones por props).
  Importancia: 🟡 Media (es la interfaz de entrada nomás).
*/

import type { ParsedTransaction } from '../db/types'

interface Props {
  isListening: boolean
  transcript: string
  parsed: ParsedTransaction | null
  onStop: () => void
  onConfirm: (data: ParsedTransaction) => void
  onCancel: () => void
  onTextInput: (text: string) => void
}

export default function VoiceModal({ isListening, transcript, parsed, onStop, onConfirm, onCancel, onTextInput }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center">
      <button onClick={onCancel} className="absolute top-12 right-6 text-neutral-400 text-xl">
        ✕
      </button>

      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${isListening ? 'bg-rose-500/20 scale-110' : 'bg-neutral-800'}`}>
        <div className={`text-4xl transition-all ${isListening ? 'animate-pulse' : ''}`}>
          {isListening ? '🎤' : '✏️'}
        </div>
      </div>

      <div className="w-full max-w-sm px-6 space-y-4">
        {!isListening && !parsed && (
          <>
            <input
              type="text"
              placeholder="Escribe: gasté 45 en supermercado"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-rose-500/50"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  onTextInput(e.currentTarget.value)
                }
              }}
            />
            <button
              onClick={onStop}
              className="w-full py-3 bg-rose-500/20 text-rose-400 rounded-xl font-medium"
            >
              Usar voz
            </button>
          </>
        )}

        {isListening && (
          <>
            <div className="flex items-center gap-2 mb-4 justify-center">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-neutral-400 text-sm">Escuchando...</span>
            </div>
            <button onClick={onStop} className="w-full py-3 bg-rose-500/20 text-rose-400 rounded-xl font-medium">
              Detener
            </button>
          </>
        )}

        {parsed && (
          <div className="space-y-4">
            <p className="text-neutral-400 text-sm text-center">"{transcript}"</p>
            <div className="bg-neutral-900 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Tipo</span>
                <span className={parsed.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>
                  {parsed.type === 'income' ? 'Ingreso' : 'Gasto'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Monto</span>
                <span className="text-white font-semibold">${parsed.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Descripción</span>
                <span className="text-white text-right max-w-[60%] truncate">{parsed.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Categoría</span>
                <span className="text-white">{parsed.category}</span>
              </div>
            </div>
            <button onClick={() => onConfirm(parsed)} className="w-full py-3 bg-rose-500 text-white rounded-xl font-medium">
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
