# Quick Start & Testing Guide

## Running the App

```bash
# Start development server
npm run dev

# Open browser to
http://localhost:3000
```

## Demo Accounts

### Pre-verified Demo Account (Email Already Verified)
```
Email: user@example.com
Password: password123
Status: Ready to use immediately
```

### Create New Account (Requires Email Verification)
```
1. Go to /signup
2. Fill form with:
   - Full Name: Any name
   - Email: Any email (e.g., test@example.com)
   - Password: password123
   - Confirm: password123
3. Click "Create Account"
4. Redirected to /verify-email
5. Enter code: 123456 (mock - any 6-digit number works in demo)
6. Click "Verify Email"
7. Auto-login → Dashboard
```

## Testing Scenarios

### Login Flow
1. Visit `http://localhost:3000`
2. Redirects to `/login`
3. Enter demo credentials
4. Click "Login"
5. Redirected to `/dashboard`

### Sign Up with Verification
1. On login page, click "Create account"
2. Fill and submit sign up form
3. Enter any 6-digit code (demo accepts any)
4. Verify and login

### Currency Features (After Login)
1. From dashboard, click "Currencies" in navbar
2. Search for currencies:
   - Type "USD" → US Dollar
   - Type "euro" → EUR
   - Type "pound" → GBP
3. View trending currencies section
4. Toggle high contrast mode in navbar

### Logout
1. From any authenticated page
2. Click "Logout" button in navbar
3. Redirected to `/login`

## Route Structure

```
Public Routes (No Auth Required):
  /login → Login page
  /signup → Sign up page
  /verify-email → Email verification

Protected Routes (Auth Required):
  /dashboard → Main dashboard
  /currencies → Currency search & trending
  / → Redirect to /dashboard
```

## Styling

### Color Palette (Blue Theme)
- Primary Dark: `#003F7F` (Buttons, Links)
- Primary Base: `#0056B3`
- Primary Light: `#0E7FFF` (Hover states)
- Primary Lighter: `#E7F1FE` (Backgrounds)
- Success: `#0D5F2A` (Green for positive)
- Error: `#8B0000` (Red for errors)
- Neutral Gray: `#505050` (Text)

## Accessibility Features (WCAG 2.1 AAA)
- ✅ High contrast mode toggle
- ✅ Font size scaling
- ✅ Keyboard navigation
- ✅ ARIA labels and descriptions
- ✅ 44px+ touch targets
- ✅ Semantic HTML
- ✅ Focus indicators

## Features Overview

### Authentication
- Login with email/password
- Sign up with verification
- Email verification (6-digit code)
- Session persistence (localStorage)
- Logout functionality

### Currency System
- Real-time search by code/name
- Trending currencies display
- 10 mock currencies (USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, SGD)
- Rate and 24h change display
- Trend indicators (up/down/stable)

### Responsive Design
- Mobile-first design
- Tablets: 2-column layouts
- Desktop: 3-column layouts
- Responsive navigation

## Performance Metrics
- Build time: 1.35s
- Bundle size: 236 KB (gzip: 72.6 KB)
- Dev server startup: 187ms
- Mock API delay: 300-500ms (simulated)

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Dev server not starting?
```bash
rm -rf node_modules
npm install
npm run dev
```

### Build errors?
```bash
npm run build
```

### Port 3000 in use?
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
npm run dev
```

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

## Logo & Branding
- Logo text: "B"
- App name: "Banking"
- Color: Deep Blue (#003F7F)
- Used in navbar and auth pages

## Notes
- All authentication is mocked (in-memory storage)
- Email verification code is not actually sent
- Demo uses 6-digit code validation
- Production would need real backend and email service
