import Dexie, { type Table } from 'dexie'
import type { Transaction } from './types'

export class KalamarDB extends Dexie {
  transactions!: Table<Transaction, number>

  constructor() {
    super('kalamar')
    this.version(1).stores({
      transactions: '++id, type, category, date',
    })
  }
}

export const db = new KalamarDB()
