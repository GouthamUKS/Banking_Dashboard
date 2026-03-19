import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getData } from '../services/data'
import type { Card } from '../types'

function CardUI({ card, active, onClick }: { card: Card; active: boolean; onClick: () => void }) {
  const teal = card.theme === 'teal'
  return (
    <motion.button type="button" whileHover={{ y: -4 }} onClick={onClick} aria-pressed={active}
      className={`w-full text-left relative overflow-hidden rounded-3xl p-5 sm:p-6 cursor-pointer transition-all ${teal ? 'card-wave shadow-teal' : 'card-wave-orange shadow-card'} ${active ? 'ring-2 ring-offset-2 ring-[#1ABC9C]' : ''}`}
    >
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/8" />
      <div className="relative">
        <div className="flex justify-between items-start mb-6">
          <div className="card-chip" />
          <div className="text-white/60 text-xs">{card.expiry}</div>
        </div>
        <div className="text-white/60 text-xs font-mono tracking-widest mb-3 break-all">{card.number}</div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Balance</div>
            <div className="text-white font-bold text-xl sm:text-2xl">${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="text-white font-bold text-base opacity-70 uppercase">{card.type}</div>
        </div>
      </div>
    </motion.button>
  )
}

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => { getData().then(d => { setCards(d.cards); setActive(d.cards[0]?.id) }) }, [])

  const activeCard = cards.find(c => c.id === active)

  return (
    <div className="p-5 lg:p-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1A1A2E]">My Cards</h1>
        <button type="button" aria-label="Add card" className="w-9 h-9 rounded-xl bg-[#1ABC9C] flex items-center justify-center text-white shadow-teal-sm hover:bg-[#16A085] transition-all">+</button>
      </div>

      {/* Mobile cards carousel */}
      <div className="mb-6 lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-5 px-5">
          {cards.map(card => (
            <div key={card.id} className="snap-center min-w-[88%]">
              <CardUI card={card} active={active === card.id} onClick={() => setActive(card.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop cards stack */}
      <div className="hidden lg:block space-y-3 mb-6 stagger">
        {cards.map(card => (
          <CardUI key={card.id} card={card} active={active === card.id} onClick={() => setActive(card.id)} />
        ))}
      </div>

      {/* Card details */}
      {activeCard && (
        <motion.div key={activeCard.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-5 shadow-card mb-4">
          <div className="text-sm font-bold text-[#1A1A2E] mb-4">Card Details</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Card Type', value: activeCard.type.toUpperCase() },
              { label: 'Card Number', value: activeCard.number },
              { label: 'Expiry', value: activeCard.expiry },
              { label: 'Available', value: `$${(activeCard.balance * 0.98).toLocaleString()}` },
            ].map(f => (
              <div key={f.label} className="bg-[#F9FAFB] rounded-2xl px-4 py-3">
                <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">{f.label}</div>
                <div className={`text-sm font-semibold text-[#1A1A2E] font-mono ${f.label === 'Card Number' ? 'break-all' : ''}`}>{f.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger">
        {[
          { icon: '🔒', label: 'Freeze Card' },
          { icon: '📊', label: 'Spending Limits' },
          { icon: '⚙️', label: 'Card Settings' },
        ].map(a => (
          <button type="button" key={a.label} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5">
            <span className="text-2xl">{a.icon}</span>
            <span className="text-xs font-medium text-[#6B7280]">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
