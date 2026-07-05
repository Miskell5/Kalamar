/*
  La base de datos local que vive dentro de tu navegador (usando Dexie,
  que es una forma fácil de usar IndexedDB).
  Aquí se guardan todas las transacciones. No necesitas internet ni
  servidores. Los datos se quedan en tu dispositivo.
  Se importa en: App, Header, TransactionList.
  Importancia: 🔴 Alta (ahí vive todo).
*/

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
