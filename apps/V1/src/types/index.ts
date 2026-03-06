export type Page = 'login' | 'signup' | 'home' | 'wallet' | 'statistics' | 'transfer' | 'transactions' | 'payees' | 'cards' | 'settings'

export interface Transaction {
  id: string; date: string; description: string; merchant: string
  amount: number; type: 'debit' | 'credit'; category: string; status: 'completed' | 'pending' | 'failed'; icon: string
}
export interface Card { id: string; balance: number; number: string; expiry: string; type: 'visa' | 'mastercard'; theme: 'teal' | 'orange' | 'dark' }
export interface Payee { id: string; name: string; sortCode: string; accountNumber: string; savedAs: string; avatar: string; lastUsed: string; reference?: string; accountType?: 'personal' | 'business' }
export interface SpendMonth { month: string; income: number; expense: number }
export interface AIResult { name?: string; sortCode?: string; accountNumber?: string; reference?: string; bankName?: string; confidence: number; fieldsFound: string[] }
export interface User { name: string; email: string; avatar: string }
