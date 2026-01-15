# Quick Start Guide

## 🚀 Installation & Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd Banking
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The app automatically opens at `http://localhost:3000`

### Step 3: Explore the Dashboard

- View account balance and transactions
- Toggle **High Contrast Mode** in the floating accessibility button
- Adjust font sizes (Small/Medium/Large)
- Test keyboard navigation (Tab, Enter, Escape)
- Try the **Skip to Content** link (press Tab on page load)

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/features/Dashboard.tsx` | Main app layout |
| `src/components/Navbar.tsx` | Top navigation bar |
| `src/components/BalanceCard.tsx` | Account balance display |
| `src/components/TransactionTable.tsx` | Transactions list |
| `src/services/mock-account.service.ts` | Fake API (500ms delay) |
| `src/context/AccessibilityContext.tsx` | A11y state management |
| `src/constants/design-system.ts` | Colors, fonts, spacing |

---

## 🎨 Customization

### Change Colors

Edit `src/constants/design-system.ts`:

```typescript
export const COLOR_PALETTE = {
  primary: {
    dark: '#0B5345',      // Change this
    // ...
  }
}
```

### Change Font Size

Edit `src/index.css`:

```css
:root {
  font-size: 16px; /* Change base size */
}
```

### Modify Mock Data

Edit `src/services/mock-account.service.ts`:

```typescript
const MOCK_ACCOUNT: Account = {
  accountName: 'Your Name', // Change this
  // ...
}
```

---

## 🧪 Testing Your Changes

### Type Check
```bash
npm run type-check
```

### Lint
```bash
npm run lint
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## ♿ Accessibility Testing

### Keyboard Navigation
1. Press **Tab** to navigate
2. Press **Enter/Space** to activate
3. Press **Escape** to close modals
4. Use **Arrow Keys** for form controls

### Screen Reader (macOS)
1. Press **Cmd + F5** to enable VoiceOver
2. Use VoiceOver commands to navigate
3. Check ARIA labels

### High Contrast Mode
1. Click the floating accessibility button (bottom right)
2. Toggle "High Contrast Mode"
3. Verify colors have sufficient contrast

---

## 📊 Key Features

| Feature | Location | How to Use |
|---------|----------|-----------|
| Skip to Content | Top-left (keyboard) | Press Tab once on page load |
| High Contrast | Floating button | Click to toggle |
| Font Size | Accessibility panel | Select Small/Medium/Large |
| Account Balance | Main card | Shows total and available balance |
| Transactions | Table | Sorted by date, filterable |
| Error Handling | Auto | Graceful error messages |
| Loading States | Auto | Skeleton loaders while fetching |

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`

---

## 📚 Useful Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- --port 3001
```

### Dependencies not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build failing?
```bash
npm run type-check
npm run lint
```

### Lighthouse score low?
1. Run `npm run build`
2. Run `npm run preview`
3. Check Chrome DevTools → Lighthouse
4. Review performance tips

---

## 📞 Getting Help

1. Check [README.md](./README.md) for full documentation
2. Review [CONTRIBUTING.md](./CONTRIBUTING.md) for dev guidelines
3. Check component JSDoc comments
4. Review TypeScript interfaces in `src/types/index.ts`

---

**Happy coding! 🎉**
