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
