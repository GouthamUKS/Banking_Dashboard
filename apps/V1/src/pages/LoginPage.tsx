import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props { onLogin: () => void; onSignup: () => void }

export default function LoginPage({ onLogin, onSignup }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')

  const handleSubmit = async () => {
    if (!email || !password) { setErr('Please fill all fields'); return }
    setLoading(true); setErr('')
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    onLogin()
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[480px] flex-col card-wave relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
            {/* Abstract card illustration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 rounded-3xl bg-white/15 backdrop-blur-sm rotate-[-8deg] shadow-float" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 rounded-3xl bg-white/20 backdrop-blur-sm rotate-[4deg] shadow-float mt-6 ml-4" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 rounded-3xl bg-white/25 backdrop-blur-sm rotate-0 shadow-float mt-2">
              <div className="p-5">
                <div className="card-chip mb-4" />
                <div className="text-white/60 text-xs font-mono tracking-widest">1234  4331  ****  4848</div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <div className="text-white/50 text-[10px] uppercase tracking-widest">Balance</div>
                    <div className="text-white font-bold text-xl">$32,985.54</div>
                  </div>
                  <div className="text-white font-bold text-lg opacity-80">VISA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 p-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-auto">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-white text-lg">N</div>
            <span className="text-white font-bold text-xl">Nexus Pay</span>
          </div>
          <div className="mb-10">
            <h2 className="text-white font-bold text-3xl leading-tight mb-3">Your money,<br/>smarter & faster.</h2>
            <p className="text-white/60 text-sm leading-relaxed">AI-powered banking that understands your financial life. Send, receive, and manage money effortlessly.</p>
          </div>
          <div className="flex gap-3">
            {['Bank-grade security', 'AI Smart Fill', 'Instant transfers'].map(f => (
              <div key={f} className="bg-white/15 rounded-xl px-3 py-2 text-white/80 text-xs font-medium">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-2xl bg-[#1ABC9C] flex items-center justify-center font-bold text-white text-lg">N</div>
            <span className="font-bold text-xl text-[#1A1A2E]">Nexus Pay</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">Welcome back</h1>
            <p className="text-[#6B7280] text-sm">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="hans@nexuspay.com"
                className="input-teal w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3.5 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none transition-all shadow-card"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  className="input-teal w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3.5 pr-20 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none transition-all shadow-card"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#1ABC9C] hover:text-[#16A085]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button type="button" className="text-xs text-[#1ABC9C] font-medium hover:opacity-75 transition-opacity">Forgot password?</button>
              </div>
            </div>

            {err && <div role="alert" className="text-[#EF4444] text-xs bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{err}</div>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              aria-busy={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all bg-[#1ABC9C] hover:bg-[#16A085] shadow-teal hover:shadow-teal disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><span aria-hidden="true" className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Signing in...</>
              ) : 'Sign In'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#E5E7EB]" /></div>
              <div className="relative flex justify-center"><span className="px-3 text-xs text-[#9CA3AF] bg-[#F2F2F2]">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[{ icon: 'G', label: 'Google', bg: '#fff' }, { icon: '⌘', label: 'Apple', bg: '#1A1A2E' }].map(b => (
                <button type="button" key={b.label} onClick={onLogin} className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] transition-all shadow-card text-sm font-semibold text-[#1A1A2E]">
                  <span>{b.icon}</span> {b.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Don't have an account?{' '}
            <button type="button" onClick={onSignup} className="text-[#1ABC9C] font-semibold hover:opacity-75 transition-opacity">Create one</button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
