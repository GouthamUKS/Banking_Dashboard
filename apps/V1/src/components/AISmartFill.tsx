import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { extractFromText, extractFromImage } from '../services/data'

interface Props { isOpen: boolean; onClose: () => void; onApply: (d: Record<string,string>) => void }
type Tab = 'paste' | 'scan'
type Stage = 'input' | 'processing' | 'done'

const STEPS = [
  { id: 1, text: 'Reading content...', delay: 300 },
  { id: 2, text: 'Identifying fields...', delay: 900 },
  { id: 3, text: 'Validating data...', delay: 1500 },
]

export default function AISmartFill({ isOpen, onClose, onApply }: Props) {
  const [tab, setTab] = useState<Tab>('paste')
  const [stage, setStage] = useState<Stage>('input')
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [activeSteps, setActiveSteps] = useState<number[]>([])
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [result, setResult] = useState<Record<string,string> | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const reset = () => { setStage('input'); setText(''); setFile(null); setPreview(null); setActiveSteps([]); setDoneSteps([]); setResult(null) }
  const handleClose = () => { onClose(); setTimeout(reset, 350) }

  const handleFile = (f: File) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = e => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }

  const runAI = useCallback(async (isImage: boolean) => {
    setStage('processing')
    for (const step of STEPS) {
      await new Promise(r => setTimeout(r, step.delay))
      setActiveSteps(prev => [...prev, step.id])
    }
    await new Promise(r => setTimeout(r, 500))
    setDoneSteps([1,2,3])

    const raw = isImage ? await extractFromImage() : await extractFromText(text)
    const mapped: Record<string,string> = {}
    if (raw.name) mapped.name = raw.name
    if (raw.sortCode) mapped.sortCode = raw.sortCode
    if (raw.accountNumber) mapped.accountNumber = raw.accountNumber
    if (raw.reference) mapped.reference = raw.reference

    await new Promise(r => setTimeout(r, 300))
    setResult(mapped)
    setStage('done')
  }, [text])

  const fields = result ? [
    { k: 'name', label: 'Payee Name', icon: '👤' },
    { k: 'sortCode', label: 'Sort Code', icon: '🏦' },
    { k: 'accountNumber', label: 'Account No.', icon: '💳' },
    { k: 'reference', label: 'Reference', icon: '📝' },
  ].filter(f => result[f.k]) : []

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
            className="relative w-full max-w-md mx-4 mb-0 sm:mb-4 bg-white rounded-t-3xl sm:rounded-3xl shadow-float overflow-hidden"
          >
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-[#1ABC9C] to-[#16A085]" />

            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  animate={{ boxShadow: ['0 0 0 0 rgba(26,188,156,0.3)','0 0 0 8px rgba(26,188,156,0)','0 0 0 0 rgba(26,188,156,0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-11 h-11 rounded-2xl bg-[#1ABC9C] flex items-center justify-center text-xl text-white flex-shrink-0 shadow-teal-sm"
                >
                  ✦
                </motion.div>
                <div>
                  <div className="font-bold text-[#1A1A2E]">AI Smart Fill</div>
                  <div className="text-xs text-[#9CA3AF]">Powered by Nexus AI</div>
                </div>
                <button type="button" aria-label="Close AI Smart Fill" onClick={handleClose} className="ml-auto w-8 h-8 rounded-xl bg-[#F2F2F2] flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] text-sm">✕</button>
              </div>

              {/* Tabs */}
              {stage === 'input' && (
                <div className="flex gap-1 bg-[#F2F2F2] rounded-xl p-1 mb-4">
                  {(['paste','scan'] as Tab[]).map(t => (
                    <button type="button" key={t} onClick={() => setTab(t)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t ? 'bg-white text-[#1A1A2E] shadow-sm' : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
                    >{t === 'paste' ? '📋 Paste Text' : '📷 Scan Image'}</button>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* Input stage */}
                {stage === 'input' && (
                  <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {tab === 'paste' ? (
                      <>
                        <textarea value={text} onChange={e => setText(e.target.value)}
                          placeholder="Paste text with bank details...\n\nE.g. Name: John Smith\nSort: 40-47-84\nAccount: 12345678"
                          rows={5}
                          className="input-teal w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none resize-none mb-3 leading-relaxed"
                        />
                        <button type="button" onClick={() => runAI(false)} disabled={!text.trim()}
                          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm bg-[#1ABC9C] hover:bg-[#16A085] shadow-teal-sm transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                        ><span>✦</span> Analyse with AI</button>
                      </>
                    ) : (
                      <>
                        {preview ? (
                          <div className="relative rounded-2xl overflow-hidden mb-3 border border-[#E5E7EB]">
                            <img src={preview} className="w-full h-32 object-cover opacity-80" alt="Uploaded transfer details preview" />
                            <button type="button" aria-label="Remove uploaded image" onClick={() => { setFile(null); setPreview(null) }} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 text-[#6B7280] text-xs flex items-center justify-center">✕</button>
                          </div>
                        ) : (
                          <>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
                            <button type="button" onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-[#B2EFE4] rounded-2xl p-6 text-center cursor-pointer hover:border-[#1ABC9C] hover:bg-[#E8FBF7] transition-all mb-3">
                              <div className="text-3xl mb-2">📷</div>
                              <div className="text-sm font-semibold text-[#1ABC9C] mb-1">Upload Screenshot</div>
                              <div className="text-xs text-[#9CA3AF]">PNG · JPG · HEIC supported</div>
                            </button>
                          </>
                        )}
                        <button type="button" onClick={() => file && runAI(true)} disabled={!file}
                          className="w-full py-3.5 rounded-2xl font-bold text-sm text-[#1ABC9C] bg-[#E8FBF7] border border-[#B2EFE4] hover:bg-[#B2EFE4] transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                        ><span>✦</span> Scan with AI</button>
                      </>
                    )}
                  </motion.div>
                )}

                {/* Processing */}
                {stage === 'processing' && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-5 flex flex-col items-center gap-4">
                    <div className="relative w-14 h-14">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-2 border-[#1ABC9C]/20 border-t-[#1ABC9C]" />
                      <div className="absolute inset-0 flex items-center justify-center text-xl">✦</div>
                    </div>
                    <div className="text-sm font-semibold text-[#1A1A2E]">Nexus AI Processing...</div>
                    <div className="w-full space-y-2">
                      {STEPS.map(s => (
                        <motion.div key={s.id} initial={{ opacity: 0, x: -8 }} animate={activeSteps.includes(s.id) ? { opacity: 1, x: 0 } : {}}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${doneSteps.includes(s.id) ? 'text-[#1ABC9C] bg-[#E8FBF7]' : activeSteps.includes(s.id) ? 'text-[#6B7280] bg-[#F9FAFB]' : 'text-[#D1D5DB] bg-[#F9FAFB]'}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />{s.text}
                          {doneSteps.includes(s.id) && <span className="ml-auto font-bold">✓</span>}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                {stage === 'done' && result && (
                  <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-3">Fields Detected</div>
                    <div className="space-y-2 mb-4">
                      {fields.map((f, i) => (
                        <motion.div key={f.k} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#E8FBF7] border border-[#B2EFE4]"
                        >
                          <span>{f.icon}</span>
                          <div className="flex-1">
                            <div className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">{f.label}</div>
                            <div className="text-sm font-semibold text-[#1A1A2E]">{result[f.k]}</div>
                          </div>
                          <span className="text-[#1ABC9C] font-bold">✓</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { setStage('input'); setResult(null) }} className="flex-1 py-3 rounded-2xl border border-[#E5E7EB] text-[#6B7280] hover:text-[#1A1A2E] font-semibold text-sm transition-all">Try again</button>
                      <button type="button" onClick={() => { onApply(result!); handleClose() }} className="flex-[2] py-3 rounded-2xl bg-[#1ABC9C] hover:bg-[#16A085] text-white font-bold text-sm shadow-teal-sm transition-all">
                        ✓ Apply to Form
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
