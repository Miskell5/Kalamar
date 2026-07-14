import { useState } from 'react'
import { db } from '../db/database'
import { DEFAULT_CATEGORIES } from '../db/categories'
import type { Transaction } from '../db/types'

interface Props {
  transaction: Transaction
  onClose: () => void
}

export default function EditTransactionModal({ transaction, onClose }: Props) {
  const [type, setType] = useState<'income' | 'expense'>(transaction.type)
  const [amount, setAmount] = useState(String(transaction.amount))
  const [description, setDescription] = useState(transaction.description)
  const [category, setCategory] = useState(transaction.category)
  const [date, setDate] = useState(transaction.date.split('T')[0])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const categories = DEFAULT_CATEGORIES.filter(c => c.type === type)

  const handleSave = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'))
    if (!numAmount || numAmount <= 0) return

    await db.transactions.update(transaction.id!, {
      type,
      amount: numAmount,
      description,
      category,
      date: new Date(date).toISOString(),
    })
    onClose()
  }

  const handleDelete = async () => {
    await db.transactions.delete(transaction.id!)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center">
      <button onClick={onClose} className="absolute top-12 right-6 text-neutral-400 text-xl">✕</button>

      <div className="w-full max-w-sm px-6">
        <h2 className="text-lg font-semibold mb-6">Editar movimiento</h2>

        <div className="space-y-4">
          <div className="flex bg-neutral-900 rounded-xl p-1">
            <button
              onClick={() => { setType('expense'); setCategory('Otros') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === 'expense' ? 'bg-rose-500 text-white' : 'text-neutral-400'}`}
            >
              Gasto
            </button>
            <button
              onClick={() => { setType('income'); setCategory('Salario') }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${type === 'income' ? 'bg-emerald-500 text-white' : 'text-neutral-400'}`}
            >
              Ingreso
            </button>
          </div>

          <div>
            <label className="text-xs text-neutral-500 mb-1 block">Monto</label>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={e => setAmount(e.currentTarget.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-rose-500/50"
            />
          </div>

          <div>
            <label className="text-xs text-neutral-500 mb-1 block">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-rose-500/50"
            />
          </div>

          <div>
            <label className="text-xs text-neutral-500 mb-1 block">Categoría</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    category === cat.name
                      ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/50'
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-neutral-500 mb-1 block">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.currentTarget.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-500/50"
            />
          </div>

          <button onClick={handleSave} className="w-full py-3 bg-rose-500 text-white rounded-xl font-medium">
            Guardar cambios
          </button>

          {!showDeleteConfirm ? (
            <button onClick={() => setShowDeleteConfirm(true)} className="w-full py-3 text-red-400 rounded-xl text-sm">
              Eliminar movimiento
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-neutral-900 text-neutral-400 rounded-xl text-sm">
                Cancelar
              </button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-sm font-medium">
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
