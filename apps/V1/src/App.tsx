import { Suspense, lazy, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import LoginPage from './pages/LoginPage'
import type { Page, User } from './types'

const SignupPage = lazy(() => import('./pages/SignupPage'))
const Layout = lazy(() => import('./components/Layout'))
const HomePage = lazy(() => import('./pages/HomePage'))
const WalletPage = lazy(() => import('./pages/WalletPage'))
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'))
const TransferPage = lazy(() => import('./pages/TransferPage'))
const CardsPage = lazy(() => import('./pages/CardsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
}

const mockUser: User = { name: 'Hans Down', email: 'hans@nexuspay.com', avatar: 'HD' }

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F2F2]">
      <div role="status" aria-live="polite" className="text-sm font-semibold text-[#6B7280]">Loading...</div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('login')
  const [user, setUser] = useState<User | null>(null)

  const navigate = (p: Page) => setPage(p)

  const handleLogin = () => { setUser(mockUser); setPage('home') }
  const handleLogout = () => { setUser(null); setPage('login') }

  const renderPage = () => {
    switch (page) {
      case 'login': return <LoginPage onLogin={handleLogin} onSignup={() => navigate('signup')} />
      case 'signup': return <SignupPage onSignup={handleLogin} onLogin={() => navigate('login')} />
      default: return (
        <Layout page={page} onNavigate={navigate} user={user!} onLogout={handleLogout}>
          {page === 'home' && <HomePage onNavigate={navigate} />}
          {page === 'wallet' && <WalletPage onNavigate={navigate} />}
          {page === 'statistics' && <StatisticsPage />}
          {page === 'transfer' && <TransferPage onNavigate={navigate} />}
          {page === 'cards' && <CardsPage />}
          {page === 'settings' && <SettingsPage user={user!} onLogout={handleLogout} />}
        </Layout>
      )
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div key={page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <Suspense fallback={<PageFallback />}>
            {renderPage()}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
