import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { DEFAULT_CATEGORIES } from '../db/categories'
import BudgetModal from './BudgetModal'
import type { Budget } from '../db/types'

function getMonthKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export default function BudgetList() {
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Budget | null>(null)
  const month = getMonthKey()

  const budgets = useLiveQuery(() =>
    db.budgets.where('month').equals(month).toArray()
  )

  const transactions = useLiveQuery(() =>
    db.transactions.toArray()
  )

  const spentByCategory: Record<string, number> = {}
  if (transactions) {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    for (const t of transactions) {
      if (t.type === 'expense') {
        const tDate = new Date(t.date)
        if (tDate >= monthStart) {
          spentByCategory[t.category] = (spentByCategory[t.category] || 0) + t.amount
        }
      }
    }
  }

  const getCategoryIcon = (catName: string) =>
    DEFAULT_CATEGORIES.find(c => c.name === catName)?.icon || '📦'

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Presupuestos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-rose-400 text-sm font-medium"
        >
          + Nuevo
        </button>
      </div>

      {(!budgets || budgets.length === 0) ? (
        <p className="text-neutral-500 text-sm text-center py-6">
          Crea un presupuesto mensual para controlar tus gastos
        </p>
      ) : (
        <div className="space-y-3">
          {budgets.map(b => {
            const spent = spentByCategory[b.category] || 0
            const progress = Math.min(spent / b.amount, 1)
            const remaining = b.amount - spent
            const isOver = remaining < 0

            return (
              <div
                key={b.id}
                onClick={() => setEditing(b)}
                className="bg-neutral-900 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(b.category)}</span>
                    <span className="text-sm font-medium">{b.category}</span>
                  </div>
                  <span className={`text-sm font-semibold ${isOver ? 'text-rose-400' : 'text-neutral-300'}`}>
                    ${spent.toFixed(0)} / ${b.amount.toFixed(0)}
                  </span>
                </div>

                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOver ? 'bg-rose-500' : progress > 0.8 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>

                <p className={`text-xs mt-1.5 ${isOver ? 'text-rose-400' : 'text-neutral-500'}`}>
                  {isOver
                    ? `$${Math.abs(remaining).toFixed(0)} por encima`
                    : `$${remaining.toFixed(0)} restantes`}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <BudgetModal month={month} onClose={() => setShowModal(false)} />
      )}

      {editing && (
        <BudgetModal
          existing={editing}
          month={month}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
