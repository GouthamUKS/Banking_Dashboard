import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getData } from '../services/data'
import type { Page, Transaction } from '../types'

const categoryIcon: Record<string,string> = { subscription:'🎨', transport:'✈️', shopping:'🛍️', entertainment:'🎬', salary:'💰', transfer:'💸', food:'🍕', payment:'💳' }

interface Props { onNavigate: (p: Page) => void }

export default function WalletPage({ onNavigate }: Props) {
  const [data, setData] = useState<Awaited<ReturnType<typeof getData>> | null>(null)

  useEffect(() => { getData().then(setData) }, [])

  if (!data) return <div className="p-6 space-y-3">{[...Array(5)].map((_,i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}</div>

  const { cards, transactions } = data
  const [card] = cards

  return (
    <div className="p-5 lg:p-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1A1A2E]">Wallet</h1>
        <button type="button" aria-label="Wallet options" className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#1A1A2E]">⋯</button>
      </div>

      {/* My Wallet section */}
      <div className="mb-5">
        <div className="text-sm font-semibold text-[#1A1A2E] mb-3">My Wallet</div>

        {/* Primary card */}
        <motion.div whileHover={{ y: -2 }} className="card-wave rounded-3xl p-5 mb-3 relative overflow-hidden shadow-teal cursor-pointer">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/8" />
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white/60 text-[10px] uppercase tracking-widest mb-0.5">Your Bank</div>
                <div className="text-white font-bold text-2xl">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="text-white/70 text-xs">{card.expiry}</div>
            </div>
            <div className="text-white/60 text-xs font-mono tracking-widest">{card.number}</div>
          </div>
        </motion.div>

        {/* Apple pay entry */}
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F2F2F2] flex items-center justify-center text-sm">🍎</div>
            <div>
              <div className="text-sm font-semibold text-[#1A1A2E]">Apple Inc</div>
              <div className="text-xs text-[#9CA3AF]">$500.50</div>
            </div>
          </div>
          <button type="button" aria-label="Apple Pay enabled" aria-pressed={true} className="w-10 h-6 rounded-full bg-[#E5E7EB] relative cursor-pointer">
            <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-[#1A1A2E]">Recent Transactions</div>
          <button type="button" className="text-xs text-[#1ABC9C] font-semibold">View All</button>
        </div>
        <div className="space-y-2 stagger">
          {transactions.slice(0, 5).map(tx => (
            <motion.div key={tx.id} whileHover={{ x: 2 }} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#F2F2F2] flex items-center justify-center text-base flex-shrink-0">{categoryIcon[tx.category] || '💳'}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#1A1A2E] truncate">{tx.merchant}</div>
                <div className="text-xs text-[#9CA3AF]">{new Date(tx.date).toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div className={`font-bold text-sm ${tx.type === 'credit' ? 'text-[#1ABC9C]' : 'text-[#EF4444]'}`}>
                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
