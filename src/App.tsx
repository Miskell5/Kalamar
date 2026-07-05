import { useState, useCallback } from 'react'
import Header from './components/Header'
import VoiceModal from './components/VoiceModal'
import TransactionList from './components/TransactionList'
import { useVoiceInput, parseVoiceInput } from './hooks/useVoiceInput'
import { db } from './db/database'
import type { ParsedTransaction } from './db/types'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const { isListening, transcript, parsed, startListening, stopListening, resetParsed } = useVoiceInput()

  const saveTransaction = useCallback(async (data: ParsedTransaction) => {
    await db.transactions.add({
      type: data.type,
      amount: data.amount,
      description: data.description,
      category: data.category,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
    setShowModal(false)
    resetParsed()
  }, [resetParsed])

  const handleTextInput = useCallback((text: string) => {
    const result = parseVoiceInput(text)
    if (result) saveTransaction(result)
  }, [saveTransaction])

  const handleMicPress = useCallback(() => {
    setShowModal(true)
    setTimeout(() => startListening(), 300)
  }, [startListening])

  return (
    <div className="min-h-dvh bg-black text-white">
      <Header />
      <TransactionList />

      <button
        onClick={handleMicPress}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-rose-500 hover:bg-rose-400 active:scale-95 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-rose-500/30 transition-all"
      >
        🎤
      </button>

      {showModal && (
        <VoiceModal
          isListening={isListening}
          transcript={transcript}
          parsed={parsed}
          onStop={stopListening}
          onConfirm={saveTransaction}
          onCancel={() => { stopListening(); setShowModal(false); resetParsed() }}
          onTextInput={handleTextInput}
        />
      )}
    </div>
  )
}
