# Poney Club Desportis

Official website for Poney Club Desportis in Cadenet, France.

🌐 **Live Site:** https://poneyclubdesportis-cadenet.fr

## Features

- 🌍 Bilingual (French/English)
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 AA accessibility compliant
- ⚡ Optimized performance (Next.js 16)
- 🎨 Modern design with Tailwind CSS

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing

```bash
# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests with coverage
npm run test:coverage

# View test report
npm run test:e2e:report
```

## Documentation

- [Testing Guide](docs/TESTING.md)
- [Translation Documentation](docs/TRANSLATION-COMPLETION-SUMMARY.md)
- [Project Specs](.kiro/specs/poney-club-website-improvements/)

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS
- **Internationalization:** next-intl
- **Testing:** Playwright
- **Deployment:** Vercel

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
├── docs/            # Documentation
├── e2e/             # E2E tests
├── lib/             # Utilities and helpers
├── messages/        # i18n translations
├── public/          # Static assets
└── .kiro/specs/     # Project specifications
```

## License

© 2024 Poney Club Desportis. All rights reserved.
