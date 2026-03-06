import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getData } from '../services/data'
import type { Page, Transaction } from '../types'

const categoryIcon: Record<string,string> = { subscription:'🎨', transport:'✈️', shopping:'🛍️', entertainment:'🎬', salary:'💰', transfer:'💸', food:'🍕', payment:'💳' }

function QuickActionBtn({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-2xl bg-[#E8FBF7] flex items-center justify-center text-xl hover:bg-[#B2EFE4] transition-colors shadow-card">{icon}</div>
      <span className="text-xs text-[#6B7280] font-medium">{label}</span>
    </button>
  )
}

interface Props { onNavigate: (p: Page) => void }

export default function HomePage({ onNavigate }: Props) {
  const [data, setData] = useState<Awaited<ReturnType<typeof getData>> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { getData().then(d => { setData(d); setLoading(false) }) }, [])

  if (loading) return (
    <div className="p-6 space-y-4">
      <div className="skeleton h-8 w-48 rounded" />
      <div className="skeleton h-48 w-full rounded-3xl" />
      <div className="grid grid-cols-4 gap-3">{[...Array(4)].map((_,i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}</div>
      <div className="space-y-3">{[...Array(4)].map((_,i) => <div key={i} className="skeleton h-16 rounded-2xl" />)}</div>
    </div>
  )

  const { cards, transactions, totalBalance } = data!
  const card = cards[0]
  const recent = transactions.slice(0, 4)

  return (
    <div className="p-5 lg:p-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 stagger">
        <div>
          <div className="text-[#9CA3AF] text-sm mb-0.5">Good Morning ☀️</div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">Hi, Hans Down</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1ABC9C] flex items-center justify-center text-white font-bold text-sm shadow-teal-sm">HD</div>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="card-wave rounded-3xl p-6 mb-5 relative overflow-hidden shadow-teal"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/8" />
          <div className="absolute -top-8 right-20 w-32 h-32 rounded-full bg-white/5" />
        </div>
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-white/60 text-xs uppercase tracking-widest mb-1">Your Balance</div>
              <div className="text-white font-bold text-3xl">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')}</div>
            </div>
            <div className="card-chip" />
          </div>
          <div className="text-white/60 text-sm font-mono tracking-widest mb-3">{card.number}</div>
          <div className="flex items-center justify-between">
            <div className="text-white/50 text-xs">Validity Period <span className="text-white/80 font-medium ml-1">{card.expiry}</span></div>
            <div className="flex gap-1">
              {[0,1,2,3].map(d => <div key={d} className={`w-1.5 h-1.5 rounded-full ${d === 0 ? 'bg-white' : 'bg-white/30'}`} />)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1A1A2E]">Services</h2>
        </div>
        <div className="grid grid-cols-4 gap-2 stagger">
          <QuickActionBtn icon="⇄" label="Transfer" onClick={() => onNavigate('transfer')} />
          <QuickActionBtn icon="🎟️" label="Voucher" />
          <QuickActionBtn icon="📋" label="Bills" />
          <QuickActionBtn icon="••" label="More" />
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1A1A2E]">Transactions</h2>
          <button onClick={() => onNavigate('statistics')} className="text-xs text-[#1ABC9C] font-semibold hover:opacity-75">View All</button>
        </div>
        <div className="space-y-2 stagger">
          {recent.map(tx => (
            <motion.div
              key={tx.id}
              whileHover={{ x: 2 }}
              className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-card cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F2] flex items-center justify-center text-lg flex-shrink-0">
                {categoryIcon[tx.category] || '💳'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-[#1A1A2E] truncate">{tx.merchant}</div>
                <div className="text-xs text-[#9CA3AF] mt-0.5">
                  {new Date(tx.date).toLocaleDateString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className={`font-bold text-sm ${tx.type === 'credit' ? 'text-[#1ABC9C]' : 'text-[#1A1A2E]'}`}>
                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
