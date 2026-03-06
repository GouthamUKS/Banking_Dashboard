import { useState } from 'react'
import { motion } from 'framer-motion'

interface Props { onSignup: () => void; onLogin: () => void }

export default function SignupPage({ onSignup, onLogin }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(true)

  const set = (k: string, v: string) => setForm(p => ({...p, [k]: v}))

  const handleNext = async () => {
    if (step === 1) { setStep(2); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onSignup()
  }

  const inputCls = "input-teal w-full bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3.5 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none transition-all shadow-card"

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }} className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-[#1ABC9C] flex items-center justify-center font-bold text-white text-lg">N</div>
          <span className="font-bold text-xl text-[#1A1A2E]">Nexus Pay</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? 'bg-[#1ABC9C] text-white' : 'bg-white border-2 border-[#E5E7EB] text-[#9CA3AF]'}`}>{s >= step ? s : '✓'}</div>
              {s < 2 && <div className={`h-px w-16 transition-all ${step > s ? 'bg-[#1ABC9C]' : 'bg-[#E5E7EB]'}`} />}
            </div>
          ))}
          <span className="ml-2 text-xs text-[#9CA3AF]">Step {step} of 2</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1">{step === 1 ? 'Create your account' : 'Secure your account'}</h1>
          <p className="text-[#6B7280] text-sm">{step === 1 ? 'Start your financial journey today' : 'Set a strong password'}</p>
        </div>

        <div className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label htmlFor="signup-name" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Full Name</label>
                <input id="signup-name" type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Hans Down" className={inputCls} />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Email</label>
                <input id="signup-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="hans@nexuspay.com" className={inputCls} />
              </div>
              <div>
                <label htmlFor="signup-phone" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Phone Number</label>
                <input id="signup-phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+44 7700 900000" className={inputCls} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="signup-password" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Password</label>
                <input id="signup-password" type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 8 characters" className={inputCls} />
                {form.password && (
                  <div className="flex gap-1 mt-2">
                    {['length','upper','number','special'].map((c,i) => (
                      <div key={c} className={`h-1 flex-1 rounded-full transition-all ${i < Math.min(4, Math.floor(form.password.length / 2)) ? 'bg-[#1ABC9C]' : 'bg-[#E5E7EB]'}`} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="signup-confirm" className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">Confirm Password</label>
                <input id="signup-confirm" type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Repeat password" className={inputCls} />
              </div>
              <label htmlFor="signup-terms" className="flex items-start gap-3 cursor-pointer">
                <input
                  id="signup-terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1ABC9C]"
                />
                <span className="text-xs text-[#6B7280] leading-relaxed">
                  I agree to the{' '}
                  <a href="#" onClick={e => e.preventDefault()} className="text-[#1ABC9C] font-medium">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" onClick={e => e.preventDefault()} className="text-[#1ABC9C] font-medium">Privacy Policy</a>
                </span>
              </label>
            </>
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={loading || (step === 2 && !termsAccepted)}
            className="w-full py-4 rounded-2xl font-bold text-white text-sm bg-[#1ABC9C] hover:bg-[#16A085] shadow-teal transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Creating account...</>
            ) : step === 1 ? 'Continue →' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Already have an account?{' '}
          <button type="button" onClick={onLogin} className="text-[#1ABC9C] font-semibold hover:opacity-75 transition-opacity">Sign in</button>
        </p>
      </motion.div>
    </div>
  )
}
