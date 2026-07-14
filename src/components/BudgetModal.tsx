import { useState } from 'react'
import { db } from '../db/database'
import { DEFAULT_CATEGORIES } from '../db/categories'
import type { Budget } from '../db/types'

interface Props {
  existing?: Budget
  month: string
  onClose: () => void
}

export default function BudgetModal({ existing, month, onClose }: Props) {
  const [category, setCategory] = useState(existing?.category || '')
  const [amount, setAmount] = useState(existing ? String(existing.amount) : '')

  const expenseCategories = DEFAULT_CATEGORIES.filter(c => c.type === 'expense')

  const handleSave = async () => {
    const numAmount = parseFloat(amount.replace(',', '.'))
    if (!numAmount || numAmount <= 0 || !category) return

    if (existing?.id) {
      await db.budgets.update(existing.id, { amount: numAmount })
    } else {
      await db.budgets.add({
        category,
        amount: numAmount,
        month,
        createdAt: new Date().toISOString(),
      })
    }
    onClose()
  }

  const handleDelete = async () => {
    if (existing?.id) {
      await db.budgets.delete(existing.id)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center">
      <button onClick={onClose} className="absolute top-12 right-6 text-neutral-400 text-xl">✕</button>

      <div className="w-full max-w-sm px-6">
        <h2 className="text-lg font-semibold mb-6">
          {existing ? 'Editar presupuesto' : 'Nuevo presupuesto'}
        </h2>

        <div className="space-y-4">
          {!existing && (
            <div>
              <label className="text-xs text-neutral-500 mb-2 block">Categoría</label>
              <div className="flex flex-wrap gap-2">
                {expenseCategories.map(cat => (
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
          )}

          <div>
            <label className="text-xs text-neutral-500 mb-1 block">
              Límite mensual para {existing?.category || '...'}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={e => setAmount(e.currentTarget.value)}
              placeholder="$0.00"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-rose-500/50"
            />
          </div>

          <button onClick={handleSave} className="w-full py-3 bg-rose-500 text-white rounded-xl font-medium">
            {existing ? 'Guardar cambios' : 'Crear presupuesto'}
          </button>

          {existing && (
            <button onClick={handleDelete} className="w-full py-3 text-red-400 rounded-xl text-sm">
              Eliminar presupuesto
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
