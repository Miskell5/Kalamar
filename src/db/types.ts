/*
  Los moldes de los datos que usa toda la app.
  Aquí se definen cómo se ven: una transacción, una categoría y el resultado
  de lo que se interpreta cuando hablas o escribes.
  Casi todos los archivos importan esto.
  Importancia: 🔴 Alta (sin tipos no hay orden).
*/

export interface Transaction {
  id?: number
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  type: 'income' | 'expense'
  color?: string
}

export type ParsedTransaction = {
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
}
