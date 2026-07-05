/*
  Las categorías que vienen por defecto en Kalamar.
  Cada una tiene un nombre, un emoji y si es de ingreso o gasto.
  Esto se usa al mostrar movimientos para poner el icono correcto.
  Se importa en: TransactionList.
  Importancia: 🟡 Media (puras categorías).
*/

import type { Category } from './types'

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'comida', name: 'Comida', icon: '🍔', type: 'expense' },
  { id: 'super', name: 'Supermercado', icon: '🛒', type: 'expense' },
  { id: 'transporte', name: 'Transporte', icon: '🚗', type: 'expense' },
  { id: 'casa', name: 'Casa', icon: '🏠', type: 'expense' },
  { id: 'servicios', name: 'Servicios', icon: '💡', type: 'expense' },
  { id: 'suscripciones', name: 'Suscripciones', icon: '📺', type: 'expense' },
  { id: 'salud', name: 'Salud', icon: '💊', type: 'expense' },
  { id: 'ropa', name: 'Ropa', icon: '👕', type: 'expense' },
  { id: 'educacion', name: 'Educación', icon: '📚', type: 'expense' },
  { id: 'viajes', name: 'Viajes', icon: '✈️', type: 'expense' },
  { id: 'regalos', name: 'Regalos', icon: '🎁', type: 'expense' },
  { id: 'otros', name: 'Otros', icon: '📦', type: 'expense' },
  { id: 'salario', name: 'Salario', icon: '💰', type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: '💻', type: 'income' },
  { id: 'inversiones', name: 'Inversiones', icon: '📈', type: 'income' },
]
