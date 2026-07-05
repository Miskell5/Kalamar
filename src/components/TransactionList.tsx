import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'
import { DEFAULT_CATEGORIES } from '../db/categories'

export default function TransactionList() {
  const transactions = useLiveQuery(() =>
    db.transactions.orderBy('date').reverse().toArray()
  )

  if (!transactions?.length) {
    return (
      <div className="px-6 py-12 text-center">
        <p className="text-neutral-500">Sin movimientos aún</p>
        <p className="text-neutral-600 text-sm mt-1">Toca el micrófono o escribe tu primer gasto</p>
      </div>
    )
  }

  const getCategoryInfo = (catName: string) =>
    DEFAULT_CATEGORIES.find(c => c.name === catName)

  return (
    <div className="px-6 pb-24">
      <h2 className="text-lg font-semibold mb-4">Movimientos</h2>
      <div className="space-y-1">
        {transactions.map((t) => {
          const cat = getCategoryInfo(t.category)
          return (
            <div key={t.id} className="flex items-center gap-3 py-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-lg">
                {cat?.icon || '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.description}</p>
                <p className="text-xs text-neutral-500">{t.category}</p>
              </div>
              <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-emerald-400' : ''}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
