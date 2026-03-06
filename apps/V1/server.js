import express from 'express'
import cors from 'cors'
import multer from 'multer'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

const delay = ms => new Promise(r => setTimeout(r, ms))

app.get('/api/health', (_, res) => res.json({ status: 'ok', version: '1.0.0' }))

app.get('/api/account', async (_, res) => {
  await delay(400)
  res.json({ success: true, data: { name: 'Hans Down', balance: 90545.90, availableBalance: 88340.00, iban: 'GB29 NWBK 6016 1331 9268 19', accountType: 'checking' } })
})

app.get('/api/transactions', async (_, res) => {
  await delay(300)
  res.json({ success: true, data: [] })
})

app.post('/api/transfer', async (req, res) => {
  await delay(900)
  res.json({ success: true, data: { reference: `TRF-${Date.now().toString(36).toUpperCase()}` } })
})

app.post('/api/ai/extract-text', async (req, res) => {
  await delay(700)
  const { text } = req.body
  if (!text?.trim()) return res.status(400).json({ success: false, message: 'No text' })
  const r = { name: null, sortCode: null, accountNumber: null, reference: null, confidence: 0, fieldsFound: [] }
  const nm = text.match(/(?:name|payee|to)[:\s]+([A-Za-z\s]+?)(?:\n|$|,)/i)
  const sm = text.match(/(\d{2}[-–]\d{2}[-–]\d{2})/)
  const am = text.match(/(?:account|acc)[:\s]*(\d{6,8})/i) || text.match(/\b(\d{8})\b/)
  const rm = text.match(/(?:ref|reference)[:\s]+([A-Za-z0-9 \-]+?)(?:\n|$)/i)
  if (nm) { r.name = nm[1].trim(); r.fieldsFound.push('name') }
  if (sm) { r.sortCode = sm[1]; r.fieldsFound.push('sortCode') }
  if (am) { r.accountNumber = am[1]; r.fieldsFound.push('accountNumber') }
  if (rm) { r.reference = rm[1].trim(); r.fieldsFound.push('reference') }
  r.confidence = Math.min(95, r.fieldsFound.length * 22 + 8)
  res.json({ success: true, data: r })
})

app.post('/api/ai/extract-image', upload.single('image'), async (req, res) => {
  await delay(1200)
  if (!req.file) return res.status(400).json({ success: false })
  const samples = [
    { name: 'Fleece Marigold', sortCode: '40-47-84', accountNumber: '82736450', reference: 'Rent Apr', confidence: 94, fieldsFound: ['name','sortCode','accountNumber','reference'] },
    { name: 'Justin Case', sortCode: '30-00-02', accountNumber: '87654321', reference: 'Invoice #12', confidence: 88, fieldsFound: ['name','sortCode','accountNumber'] },
  ]
  res.json({ success: true, data: samples[Math.floor(Math.random() * samples.length)] })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`\n  🏦 Nexus Pay API → http://localhost:${PORT}\n`))
