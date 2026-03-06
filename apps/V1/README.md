# 🏦 Nexus Pay — Banking App

Teal/mint palette inspired by the banking-wallet Figma design. Full-stack React + Express with AI Smart Fill.

## Quick Start

```bash
npm install
npm run dev          # starts client (3000) + server (4000)
npm run dev:client   # frontend only (uses client mock)
```

## Pages
- **Login** — split panel with animated card illustration
- **Sign Up** — 2-step flow with password strength indicator
- **Home** — balance card, quick services, recent transactions
- **Wallet** — card overview, linked accounts, transaction list
- **Statistics** — bar chart, income/expense summary, category breakdown
- **Transfer** — payee selection, numpad, AI Smart Fill
- **Cards** — visual card stack, card details, freeze/settings
- **Settings** — profile, notifications, security, privacy (all toggles working)

## AI Smart Fill
- **Paste Text** — NLP extracts name, sort code, account number, reference
- **Scan Image** — upload screenshot, AI returns detected fields
- Typewriter animation fills form field-by-field with green ✓ indicators

## Color Palette (from Figma)
- Primary teal: `#1ABC9C`
- Teal light: `#E8FBF7`
- Background: `#F2F2F2`
- Card: `#FFFFFF`
- Text: `#1A1A2E`
- Muted: `#6B7280`
- Danger: `#EF4444`
