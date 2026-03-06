import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { User } from '../types'

interface Props { user: User; onLogout: () => void }

interface ToggleProps { value: boolean; onChange: (v: boolean) => void; label: string }
function Toggle({ value, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${value ? 'bg-[#1ABC9C]' : 'bg-[#E5E7EB]'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function SettingsPage({ user, onLogout }: Props) {
  const [notifs, setNotifs] = useState({ push: true, email: false, sms: true, marketing: false })
  const [security, setSecurity] = useState({ biometric: true, twofa: false, autologout: true })
  const [privacy, setPrivacy] = useState({ analytics: true, personalised: false })
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden mb-3">
      <button
        type="button"
        aria-expanded={activeSection === id}
        aria-controls={`settings-section-${id}`}
        onClick={() => setActiveSection(activeSection === id ? null : id)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F9FAFB] transition-colors"
      >
        <span className="font-semibold text-[#1A1A2E] text-sm">{title}</span>
        <motion.span animate={{ rotate: activeSection === id ? 180 : 0 }} className="text-[#9CA3AF] text-sm">↓</motion.span>
      </button>
      <AnimatePresence>
        {activeSection === id && (
          <motion.div id={`settings-section-${id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-[#F5F5F5] pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const Row = ({ icon, label, sub, right }: { icon: string; label: string; sub?: string; right?: React.ReactNode }) => (
    <div className="flex items-center gap-3 py-3 border-b border-[#F5F5F5] last:border-none">
      <div className="w-9 h-9 rounded-xl bg-[#E8FBF7] flex items-center justify-center flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-[#1A1A2E]">{label}</div>
        {sub && <div className="text-xs text-[#9CA3AF] mt-0.5">{sub}</div>}
      </div>
      {right || <span className="text-[#9CA3AF] text-sm">›</span>}
    </div>
  )

  return (
    <div className="p-5 lg:p-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
      <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">Settings</h1>

      {/* Profile card */}
      <div className="bg-white rounded-3xl p-5 shadow-card mb-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#1ABC9C] flex items-center justify-center text-white font-bold text-xl shadow-teal-sm flex-shrink-0">{user.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#1A1A2E] text-base">{user.name}</div>
          <div className="text-xs text-[#9CA3AF] mt-0.5">{user.email}</div>
          <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-[#E8FBF7] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1ABC9C]" />
            <span className="text-xs text-[#1ABC9C] font-medium">Verified Account</span>
          </div>
        </div>
        <button type="button" className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:border-[#1ABC9C] hover:text-[#1ABC9C] transition-all">Edit</button>
      </div>

      {/* Sections */}
      <Section id="account" title="Account">
        <Row icon="👤" label="Personal Information" sub="Name, email, phone" />
        <Row icon="🏦" label="Bank Accounts" sub="Linked accounts" />
        <Row icon="💳" label="Payment Methods" sub="Cards & wallets" />
        <Row icon="📍" label="Address" sub="Billing & delivery" />
      </Section>

      <Section id="notifications" title="Notifications">
        <Row icon="🔔" label="Push Notifications" right={<Toggle label="Push notifications" value={notifs.push} onChange={v => setNotifs(p => ({...p, push: v}))} />} />
        <Row icon="📧" label="Email Alerts" right={<Toggle label="Email alerts" value={notifs.email} onChange={v => setNotifs(p => ({...p, email: v}))} />} />
        <Row icon="💬" label="SMS Alerts" right={<Toggle label="SMS alerts" value={notifs.sms} onChange={v => setNotifs(p => ({...p, sms: v}))} />} />
        <Row icon="📣" label="Marketing" right={<Toggle label="Marketing messages" value={notifs.marketing} onChange={v => setNotifs(p => ({...p, marketing: v}))} />} />
      </Section>

      <Section id="security" title="Security">
        <Row icon="👆" label="Biometric Login" sub="Face ID / Fingerprint" right={<Toggle label="Biometric login" value={security.biometric} onChange={v => setSecurity(p => ({...p, biometric: v}))} />} />
        <Row icon="🔐" label="Two-Factor Auth" sub="SMS or Authenticator app" right={<Toggle label="Two-factor authentication" value={security.twofa} onChange={v => setSecurity(p => ({...p, twofa: v}))} />} />
        <Row icon="⏱" label="Auto Logout" sub="After 15 minutes" right={<Toggle label="Auto logout" value={security.autologout} onChange={v => setSecurity(p => ({...p, autologout: v}))} />} />
        <Row icon="🔑" label="Change Password" />
        <Row icon="📱" label="Trusted Devices" sub="Manage devices" />
      </Section>

      <Section id="privacy" title="Privacy">
        <Row icon="📊" label="Analytics" sub="Help improve the app" right={<Toggle label="Analytics data sharing" value={privacy.analytics} onChange={v => setPrivacy(p => ({...p, analytics: v}))} />} />
        <Row icon="🎯" label="Personalised Ads" right={<Toggle label="Personalised ads" value={privacy.personalised} onChange={v => setPrivacy(p => ({...p, personalised: v}))} />} />
        <Row icon="📋" label="Data Export" sub="Download your data" />
        <Row icon="🗑️" label="Delete Account" sub="Permanent action" />
      </Section>

      <Section id="support" title="Help & Support">
        <Row icon="💬" label="Live Chat" sub="Usually replies in minutes" />
        <Row icon="📖" label="FAQ" sub="Common questions" />
        <Row icon="🐛" label="Report a Bug" />
        <Row icon="⭐" label="Rate the App" />
      </Section>

      {/* App info */}
      <div className="bg-white rounded-3xl px-5 py-4 shadow-card mb-4">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-[#6B7280]">App Version</span>
          <span className="text-xs font-mono text-[#9CA3AF]">v1.0.0</span>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-[#F5F5F5]">
          <span className="text-sm text-[#6B7280]">Build</span>
          <span className="text-xs font-mono text-[#9CA3AF]">2026.03.05</span>
        </div>
      </div>

      {/* Logout */}
      <button type="button" onClick={onLogout} className="w-full py-4 rounded-2xl border-2 border-[#EF4444]/20 bg-red-50 text-[#EF4444] font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2 mb-4">
        <span>→</span> Sign Out
      </button>

      <div className="text-center text-xs text-[#9CA3AF] pb-4">
        © 2026 Nexus Pay. All rights reserved.<br/>
        <a href="#" onClick={e => e.preventDefault()} className="text-[#1ABC9C] mt-1">Privacy Policy</a> · <a href="#" onClick={e => e.preventDefault()} className="text-[#1ABC9C]">Terms of Service</a>
      </div>
    </div>
  )
}
