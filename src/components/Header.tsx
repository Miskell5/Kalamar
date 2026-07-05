/*
  El encabezado principal que se ve arriba de todo.
  Muestra el balance total, los ingresos y gastos del período.
  Usa useLiveQuery para mantenerse actualizado automáticamente cuando
  agregas o quitas transacciones en la base de datos.
  Se comunica con: database.ts (para leer los datos).
  Importancia: 🟡 Media (solo muestra info, no hace nada más).
*/

import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/database'

export default function Header() {
  const transactions = useLiveQuery(() => db.transactions.toArray())

  const totals = transactions?.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += t.amount
      else acc.expense += t.amount
      return acc
    },
    { income: 0, expense: 0 }
  ) ?? { income: 0, expense: 0 }

  const balance = totals.income - totals.expense

  return (
    <header className="px-6 pt-12 pb-6">
      <p className="text-sm text-neutral-400 font-medium tracking-wide">Balance total</p>
      <h1 className="text-4xl font-semibold tracking-tight mt-1">
        ${balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
      </h1>
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-emerald-400 font-medium">
            +${totals.income.toLocaleString('es-MX', { minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-rose-400 font-medium">
            -${totals.expense.toLocaleString('es-MX', { minimumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </header>
  )
}
