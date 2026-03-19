import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { getData } from '../services/data'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 shadow-card text-xs">
      <div className="text-[#9CA3AF] mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2"><span style={{ color: p.color }}>●</span><span className="text-[#6B7280]">{p.name}:</span><span className="font-semibold text-[#1A1A2E]">${p.value.toLocaleString()}</span></div>
      ))}
    </div>
  )
}

export default function StatisticsPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getData>> | null>(null)
  const [tab, setTab] = useState<'expenses' | 'income'>('expenses')
  const [period, setPeriod] = useState('Monthly')

  useEffect(() => { getData().then(setData) }, [])

  if (!data) return <div className="p-6 space-y-3">{[...Array(4)].map((_,i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>

  const { spend, transactions } = data
  const totalIncome = transactions.filter(t => t.type === 'credit').reduce((a,t) => a+t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'debit').reduce((a,t) => a+t.amount, 0)

  const categories = [
    { name: 'Shopping', amount: 542.54, icon: '🛍️', pct: 33 },
    { name: 'Groceries', amount: 1223.54, icon: '🛒', pct: 74 },
    { name: 'Subscription', amount: 130.00, icon: '🎨', pct: 8 },
  ]

  return (
    <div className="p-5 lg:p-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl font-bold text-[#1A1A2E]">Statistics</h1>
        <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-card overflow-x-auto self-start max-w-full">
          {['Weekly', 'Monthly', 'Yearly'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? 'bg-[#1ABC9C] text-white' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Main balance */}
      <div className="mb-5 stagger">
        <div className="text-3xl font-bold text-[#1A1A2E]">$25,500.00</div>
        <div className="text-[#1ABC9C] text-xs font-medium mt-0.5">+2.32% From last week</div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-3xl p-5 shadow-card mb-5">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={spend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Plus Jakarta Sans' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={tab === 'expenses' ? 'expense' : 'income'} fill="#1ABC9C" radius={[6,6,0,0]}
              label={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Income/Expense summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 stagger">
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8FBF7] flex items-center justify-center text-sm">↑</div>
            <span className="text-xs text-[#6B7280] font-medium">Total Income</span>
          </div>
          <div className="text-lg font-bold text-[#1ABC9C]">${totalIncome.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-sm">↓</div>
            <span className="text-xs text-[#6B7280] font-medium">Total Expense</span>
          </div>
          <div className="text-lg font-bold text-[#EF4444]">${totalExpense.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
        </div>
      </div>

      {/* Details / breakdown */}
      <div className="bg-white rounded-3xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-[#1A1A2E]">Details</div>
          <div className="flex gap-1 bg-[#F2F2F2] rounded-xl p-1 overflow-x-auto">
            {['Expenses','Income'].map(t => (
              <button key={t} onClick={() => setTab(t.toLowerCase() as 'expenses' | 'income')}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t.toLowerCase() ? 'bg-white text-[#1A1A2E] shadow-sm' : 'text-[#9CA3AF]'}`}
              >{t}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.name} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F2F2F2] flex items-center justify-center flex-shrink-0">{cat.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-[#1A1A2E]">{cat.name}</span>
                  <span className="text-sm font-semibold text-[#EF4444]">-${cat.amount.toFixed(2)}</span>
                </div>
                <div className="h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[#1ABC9C] transition-all" style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
