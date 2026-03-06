# Contributing to Banking Dashboard

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`

## Development Guidelines

### Code Style

- Use TypeScript with strict mode enabled
- Follow ESLint rules
- Format code with Prettier: `npm run format`
- Use meaningful variable names
- Add comments for complex logic

### Component Guidelines

1. **Wrap with React.memo**
   ```typescript
   export const MyComponent = memo(function MyComponent(props) {
     return <div>...</div>;
   });
   ```

2. **Add displayName**
   ```typescript
   MyComponent.displayName = 'MyComponent';
   ```

3. **Use TypeScript interfaces**
   ```typescript
   interface MyComponentProps {
     title: string;
     onAction: () => void;
   }
   ```

4. **Ensure accessibility**
   - Add ARIA labels
   - Test with screen readers
   - Ensure keyboard navigation
   - Verify color contrast

### Accessibility Checklist

- [ ] Component tested with keyboard navigation
- [ ] Screen reader tested (NVDA or VoiceOver)
- [ ] Color contrast verified (AAA standard)
- [ ] ARIA labels added where needed
- [ ] Focus indicators visible
- [ ] Motion respects prefers-reduced-motion

### Performance Checklist

- [ ] No unnecessary re-renders (React.memo used)
- [ ] Callbacks memoized (useCallback)
- [ ] Heavy calculations memoized (useMemo)
- [ ] Lighthouse score checked
- [ ] Bundle size monitored
- [ ] Images optimized

## Commit Messages

Follow conventional commits:

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Format code
refactor: Restructure code
perf: Improve performance
test: Add tests
chore: Update dependencies
```

## Pull Request Process

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test thoroughly
3. Run: `npm run lint` and `npm run type-check`
4. Commit with conventional messages
5. Push and create Pull Request
6. Ensure CI/CD passes

## Testing

### Manual Testing

- Test on multiple browsers
- Test on mobile devices
- Test accessibility features
- Check performance metrics

### Lighthouse Audit

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Run Lighthouse in Chrome DevTools
4. Ensure all scores > 90

## Performance Standards

- **Lighthouse**: 99+
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **Bundle Size**: < 150KB (gzipped)

## Accessibility Standards

- **WCAG 2.1 Level AAA** compliance
- All interactive elements keyboard accessible
- Proper color contrast (7:1 minimum)
- Screen reader tested
- Mobile touch targets (44x44px minimum)

## Questions?

Open an issue or check existing documentation in README.md
