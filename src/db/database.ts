/*
  La base de datos local que vive dentro de tu navegador (usando Dexie,
  que es una forma fácil de usar IndexedDB).
  Aquí se guardan todas las transacciones. No necesitas internet ni
  servidores. Los datos se quedan en tu dispositivo.
  Se importa en: App, Header, TransactionList.
  Importancia: 🔴 Alta (ahí vive todo).
*/

import Dexie, { type Table } from 'dexie'
import type { Transaction, Budget } from './types'

export class KalamarDB extends Dexie {
  transactions!: Table<Transaction, number>
  budgets!: Table<Budget, number>

  constructor() {
    super('kalamar')
    this.version(2).stores({
      transactions: '++id, type, category, date',
      budgets: '++id, category, month',
    })
  }
}

export const db = new KalamarDB()
