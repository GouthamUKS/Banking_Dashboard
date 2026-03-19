import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AISmartFill from '../components/AISmartFill'
import { getData } from '../services/data'
import type { Page, Payee } from '../types'

interface Props { onNavigate: (p: Page) => void }

export default function TransferPage({ onNavigate }: Props) {
  const [payees, setPayees] = useState<Payee[]>([])
  const [selected, setSelected] = useState<Payee | null>(null)
  const [amount, setAmount] = useState('')
  const [aiOpen, setAiOpen] = useState(false)
  const [form, setForm] = useState({ name: '', sortCode: '', accountNumber: '', reference: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [justFilled, setJustFilled] = useState<Set<string>>(new Set())
  const [typeField, setTypeField] = useState<string | null>(null)

  useEffect(() => { getData().then(d => { setPayees(d.payees); setSelected(d.payees[0]) }) }, [])

  const typeIn = async (updates: Record<string,string>) => {
    setJustFilled(new Set())
    for (const [k, v] of Object.entries(updates)) {
      if (!v) continue
      setTypeField(k)
      for (let i = 1; i <= v.length; i++) {
        await new Promise(r => setTimeout(r, 30 + Math.random() * 20))
        setForm(p => ({...p, [k]: v.slice(0, i)}))
      }
      setJustFilled(p => new Set([...p, k]))
      await new Promise(r => setTimeout(r, 100))
    }
    setTypeField(null)
  }

  const numpad = ['1','2','3','4','5','6','7','8','9','.','0','⌫']

  const pressKey = (k: string) => {
    if (k === '⌫') setAmount(a => a.slice(0, -1))
    else if (k === '.' && amount.includes('.')) return
    else if (amount.length < 8) setAmount(a => a + k)
  }

  const handleSend = async () => {
    if (!amount || !selected) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); setSuccess(true)
    setTimeout(() => { setSuccess(false); setAmount(''); onNavigate('home') }, 2500)
  }

  const ic = (field: string) => `w-full bg-[#F9FAFB] border rounded-2xl px-4 py-3 text-sm text-[#1A1A2E] outline-none transition-all ${justFilled.has(field) ? 'border-[#1ABC9C] bg-[#E8FBF7]' : 'border-[#E5E7EB] focus:border-[#1ABC9C] focus:shadow-[0_0_0_3px_rgba(26,188,156,0.12)]'} ${typeField === field ? 'border-[#1ABC9C]' : ''}`

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-5 lg:p-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Back to home" onClick={() => onNavigate('home')} className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#1A1A2E] shadow-card transition-all">←</button>
          <h1 className="text-xl font-bold text-[#1A1A2E]">Transfer</h1>
        </div>
      </div>

      {/* AI Banner */}
      <motion.button type="button" whileHover={{ y: -1 }} onClick={() => setAiOpen(true)}
        className="bg-gradient-to-r from-[#E8FBF7] to-[#F0FDF9] border border-[#B2EFE4] rounded-2xl p-4 flex items-center gap-3 mb-5 cursor-pointer shadow-card"
      >
        <motion.div animate={{ boxShadow: ['0 0 0 0 rgba(26,188,156,0.4)','0 0 0 8px rgba(26,188,156,0)','0 0 0 0 rgba(26,188,156,0)'] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="w-10 h-10 rounded-xl bg-[#1ABC9C] flex items-center justify-center text-white text-lg flex-shrink-0 shadow-teal-sm"
        >✦</motion.div>
        <div className="flex-1">
          <div className="font-bold text-sm text-[#1A1A2E]">AI Smart Fill</div>
          <div className="text-xs text-[#6B7280]">Paste text or scan screenshot to auto-fill</div>
        </div>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#6B7280] font-medium shadow-sm">📋</span>
          <span className="text-xs px-2 py-1 rounded-full bg-white border border-[#E5E7EB] text-[#6B7280] font-medium shadow-sm">📷</span>
        </div>
      </motion.button>

      <div className="grid lg:grid-cols-2 gap-6 w-full min-w-0">
        {/* Left: payee selection + form */}
        <div className="space-y-4 min-w-0">
          {/* Select payee */}
          {payees.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Select Payee</div>
              <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory max-w-full">
                {payees.map(p => (
                  <button type="button" key={p.id} onClick={() => { setSelected(p); typeIn({ name: p.name, sortCode: p.sortCode, accountNumber: p.accountNumber, reference: p.reference || '' }) }}
                    className={`snap-start flex-shrink-0 flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${selected?.id === p.id ? 'bg-[#E8FBF7] border-[#1ABC9C] text-[#1A1A2E]' : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#1ABC9C]'}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1ABC9C] flex items-center justify-center text-white text-xs font-bold">{p.avatar}</div>
                    {p.savedAs}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form fields */}
          <div>
            <label htmlFor="transfer-name" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Payee Name</label>
            <div className="relative">
              <input id="transfer-name" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Fleece Marigold" className={ic('name')} />
              {justFilled.has('name') && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1ABC9C] font-bold">✓</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="transfer-sort" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Sort Code</label>
              <div className="relative">
                <input id="transfer-sort" value={form.sortCode} onChange={e => setForm(p => ({...p, sortCode: e.target.value}))} placeholder="XX-XX-XX" maxLength={8} className={ic('sortCode')} />
                {justFilled.has('sortCode') && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1ABC9C] font-bold">✓</span>}
              </div>
            </div>
            <div>
              <label htmlFor="transfer-account" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Account No.</label>
              <div className="relative">
                <input id="transfer-account" value={form.accountNumber} onChange={e => setForm(p => ({...p, accountNumber: e.target.value}))} placeholder="12345678" maxLength={8} className={ic('accountNumber')} />
                {justFilled.has('accountNumber') && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1ABC9C] font-bold">✓</span>}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="transfer-reference" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Reference</label>
            <input id="transfer-reference" value={form.reference} onChange={e => setForm(p => ({...p, reference: e.target.value}))} placeholder="Optional reference" className={ic('reference')} />
          </div>

          {/* Selected bank card preview */}
          {selected && (
            <div className="card-wave-orange rounded-2xl p-4 relative overflow-hidden shadow-card">
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
              <div className="relative">
                <div className="text-white/60 text-[10px] uppercase tracking-widest mb-0.5">Your Bank</div>
                <div className="text-white font-bold">$500.50</div>
                <div className="text-white/60 text-xs font-mono mt-2">**** **** **** 4848</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: numpad + amount */}
        <div className="w-full min-w-0">
          {/* Amount display */}
          <div className="text-center mb-5">
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">Amount</div>
            <div className="font-bold text-[#1A1A2E] leading-none text-[clamp(2rem,9vw,3rem)]">
              ${amount || '0'}.<span className="text-[#9CA3AF] text-[0.62em]">00</span>
            </div>
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-2 mb-5 w-full">
            {numpad.map(k => (
              <button type="button" key={k} aria-label={k === '⌫' ? 'Delete digit' : `Enter ${k}`} onClick={() => pressKey(k)}
                className={`w-full h-14 rounded-2xl text-xl font-semibold transition-all active:scale-95 ${k === '⌫' ? 'text-[#EF4444] bg-red-50 hover:bg-red-100' : 'bg-white text-[#1A1A2E] hover:bg-[#E8FBF7] hover:text-[#1ABC9C] shadow-card'}`}
              >{k}</button>
            ))}
          </div>

          <button type="button" onClick={handleSend} disabled={!amount || loading} aria-busy={loading}
            className="w-full py-4 rounded-2xl font-bold text-white text-sm bg-[#1ABC9C] hover:bg-[#16A085] shadow-teal transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Processing...</> : 'SEND →'}
          </button>
        </div>
      </div>

      {/* AI Modal */}
      <AISmartFill isOpen={aiOpen} onClose={() => setAiOpen(false)} onApply={data => typeIn(data)} />

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 bg-[#1ABC9C] text-white px-6 py-3.5 rounded-2xl shadow-teal flex items-center gap-3 z-50"
          >
            <span className="text-xl">✓</span>
            <div>
              <div className="font-bold text-sm">Transfer Sent!</div>
              <div className="text-xs text-white/70">${amount} sent to {selected?.savedAs}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
