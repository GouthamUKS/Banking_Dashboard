import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Page, User } from '../types'

interface LayoutProps { page: Page; onNavigate: (p: Page) => void; user: User; onLogout: () => void; children: ReactNode }

const navItems: { id: Page; icon: string; label: string }[] = [
  { id: 'home', icon: '⊞', label: 'Home' },
  { id: 'statistics', icon: '↗', label: 'Stats' },
  { id: 'transfer', icon: '⇄', label: 'Transfer' },
  { id: 'wallet', icon: '◎', label: 'Wallet' },
  { id: 'settings', icon: '⊙', label: 'Settings' },
]

const sideItems: { id: Page; icon: string; label: string }[] = [
  { id: 'home', icon: '⊞', label: 'Home' },
  { id: 'wallet', icon: '◎', label: 'Wallet' },
  { id: 'statistics', icon: '↗', label: 'Statistics' },
  { id: 'transfer', icon: '⇄', label: 'Transfer' },
  { id: 'cards', icon: '▭', label: 'Cards' },
  { id: 'settings', icon: '⊙', label: 'Settings' },
]

export default function Layout({ page, onNavigate, user, onLogout, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F2F2F2] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] bg-white border-r border-[#F0F0F0] shadow-card fixed h-full z-20">
        <div className="px-5 py-6 border-b border-[#F5F5F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1ABC9C] flex items-center justify-center font-bold text-white text-sm">N</div>
            <span className="font-bold text-[#1A1A2E] text-base">Nexus Pay</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {sideItems.map(item => {
            const active = page === item.id
            return (
              <button type="button" key={item.id} onClick={() => onNavigate(item.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all group relative">
                {active && <motion.div layoutId="sidebar-pill" className="absolute inset-0 rounded-xl bg-[#E8FBF7]" transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />}
                <span className={`relative text-base transition-colors ${active ? 'text-[#1ABC9C]' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'}`}>{item.icon}</span>
                <span className={`relative text-sm font-medium transition-colors ${active ? 'text-[#1A1A2E]' : 'text-[#6B7280] group-hover:text-[#1A1A2E]'}`}>{item.label}</span>
                {active && <span className="relative ml-auto w-1.5 h-1.5 rounded-full bg-[#1ABC9C]" />}
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-[#F5F5F5]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1ABC9C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{user.avatar}</div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#1A1A2E] truncate">{user.name}</div>
              <div className="text-[11px] text-[#9CA3AF] truncate">{user.email}</div>
            </div>
            <button type="button" aria-label="Sign out" onClick={onLogout} className="ml-auto text-[#9CA3AF] hover:text-[#EF4444] transition-colors text-sm" title="Logout">→</button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-[220px] pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0 overflow-y-auto min-h-screen">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F0F0F0] z-20 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-float">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map(item => {
            const active = page === item.id
            return (
              <button type="button" key={item.id} onClick={() => onNavigate(item.id)} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative">
                {active && <motion.div layoutId="bottom-pill" className="absolute inset-0 rounded-xl bg-[#E8FBF7]" />}
                <span className={`relative text-lg ${active ? 'text-[#1ABC9C]' : 'text-[#9CA3AF]'}`}>{item.icon}</span>
                <span className={`relative text-[10px] font-semibold ${active ? 'text-[#1ABC9C]' : 'text-[#9CA3AF]'}`}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
