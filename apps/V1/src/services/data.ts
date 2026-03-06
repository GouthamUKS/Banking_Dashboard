import type { Transaction, Card, Payee, SpendMonth } from '../types'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

export const mockCards: Card[] = [
  { id: 'c1', balance: 32985.54, number: '1234 4331 **** 4848', expiry: '08/26', type: 'visa', theme: 'teal' },
  { id: 'c2', balance: 8450.00, number: '5512 8844 **** 7721', expiry: '03/27', type: 'mastercard', theme: 'orange' },
]

export const mockTransactions: Transaction[] = [
  { id: 't1', date: '2026-03-05T14:30:00Z', description: 'Dribbble Subscription', merchant: 'Dribbble', amount: 34.54, type: 'debit', category: 'subscription', status: 'completed', icon: '🎨' },
  { id: 't2', date: '2026-03-05T07:20:00Z', description: 'Indigo Violet Transfer', merchant: 'Indigo Violet', amount: 550.00, type: 'credit', category: 'transfer', status: 'completed', icon: '💸' },
  { id: 't3', date: '2026-03-04T10:00:00Z', description: 'Apple Store', merchant: 'Apple', amount: 122.43, type: 'debit', category: 'shopping', status: 'completed', icon: '🍎' },
  { id: 't4', date: '2026-03-03T16:00:00Z', description: 'Justin Case', merchant: 'Justin Case', amount: 890.32, type: 'credit', category: 'transfer', status: 'completed', icon: '👤' },
  { id: 't5', date: '2026-03-03T09:00:00Z', description: 'Intercity Travel', merchant: 'Intercity', amount: 30.00, type: 'debit', category: 'transport', status: 'completed', icon: '✈️' },
  { id: 't6', date: '2026-03-02T12:00:00Z', description: 'International Travel', merchant: 'Intl Travel', amount: 120.00, type: 'debit', category: 'transport', status: 'completed', icon: '🌍' },
  { id: 't7', date: '2026-03-01T18:00:00Z', description: 'Netflix', merchant: 'Netflix', amount: 15.99, type: 'debit', category: 'entertainment', status: 'completed', icon: '🎬' },
  { id: 't8', date: '2026-02-28T09:00:00Z', description: 'Salary Deposit', merchant: 'Nexus Corp', amount: 4850.00, type: 'credit', category: 'salary', status: 'completed', icon: '💰' },
]

export const mockSpend: SpendMonth[] = [
  { month: 'Jan', income: 4100, expense: 2100 },
  { month: 'Feb', income: 4850, expense: 2900 },
  { month: 'Mar', income: 4850, expense: 3542 },
  { month: 'Apr', income: 5200, expense: 1642 },
  { month: 'May', income: 4850, expense: 3100 },
  { month: 'Jun', income: 4850, expense: 2400 },
  { month: 'Jul', income: 6000, expense: 3800 },
  { month: 'Aug', income: 4850, expense: 2600 },
]

export const mockPayees: Payee[] = [
  { id: 'p1', name: 'Fleece Marigold', sortCode: '40-47-84', accountNumber: '82736450', savedAs: 'Fleece', avatar: 'FM', lastUsed: '2026-03-04', reference: 'Rent' },
  { id: 'p2', name: 'Indigo Violet', sortCode: '20-45-78', accountNumber: '12345678', savedAs: 'Indigo', avatar: 'IV', lastUsed: '2026-03-05', accountType: 'personal' },
  { id: 'p3', name: 'Justin Case', sortCode: '30-00-02', accountNumber: '87654321', savedAs: 'Justin', avatar: 'JC', lastUsed: '2026-03-03', reference: 'Invoice' },
  { id: 'p4', name: 'Apple Inc', sortCode: '60-16-13', accountNumber: '31926819', savedAs: 'Apple', avatar: 'AP', lastUsed: '2026-02-28', accountType: 'business' },
]

export const getData = () => delay(500).then(() => ({ cards: mockCards, transactions: mockTransactions, spend: mockSpend, payees: mockPayees, totalBalance: 90545.90, availableBalance: 88340.00 }))

export const extractFromText = async (text: string) => {
  await delay(900)
  const r: { name?: string; sortCode?: string; accountNumber?: string; reference?: string; bankName?: string; confidence: number; fieldsFound: string[] } = { confidence: 0, fieldsFound: [] }
  const nm = text.match(/(?:name|payee|to|recipient)[:\s]+([A-Za-z][A-Za-z\s]+?)(?:\n|$|,)/i) || text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/)
  if (nm) { r.name = nm[1].trim(); r.fieldsFound.push('name') }
  const sm = text.match(/(\d{2}[-–]\d{2}[-–]\d{2})/)
  if (sm) { r.sortCode = sm[1]; r.fieldsFound.push('sortCode') }
  const am = text.match(/(?:account|acc)[:\s]*(\d{6,8})/i) || text.match(/\b(\d{8})\b/)
  if (am) { r.accountNumber = am[1]; r.fieldsFound.push('accountNumber') }
  const rm = text.match(/(?:ref|reference)[:\s]+([A-Za-z0-9 \-]+?)(?:\n|$)/i)
  if (rm) { r.reference = rm[1].trim(); r.fieldsFound.push('reference') }
  r.confidence = Math.min(95, r.fieldsFound.length * 22 + 8)
  if (r.fieldsFound.length === 0) return { name: 'John Smith', sortCode: '40-47-84', accountNumber: '12345678', confidence: 82, fieldsFound: ['name', 'sortCode', 'accountNumber'] }
  return r
}

export const extractFromImage = async () => {
  await delay(1400)
  const samples = [
    { name: 'Fleece Marigold', sortCode: '40-47-84', accountNumber: '82736450', reference: 'Rent Apr', bankName: 'HSBC', confidence: 94, fieldsFound: ['name','sortCode','accountNumber','reference'] },
    { name: 'Justin Case', sortCode: '30-00-02', accountNumber: '87654321', reference: 'Invoice #12', bankName: 'Barclays', confidence: 88, fieldsFound: ['name','sortCode','accountNumber','reference'] },
  ]
  return samples[Math.floor(Math.random() * samples.length)]
}
