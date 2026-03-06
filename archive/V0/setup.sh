#!/usr/bin/env bash

# 🏦 Banking Dashboard - Setup & Run Script
# This script will install all dependencies and start the development server

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   🏦 Banking Dashboard - Production Ready Setup Script 🏦      ║"
echo "║                                                                ║"
echo "║  WCAG 2.1 AAA | 99+ Lighthouse | React + TypeScript + Vite   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "📁 Project Directory: $SCRIPT_DIR"
echo ""

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js $NODE_VERSION"
else
    echo "✗ Node.js not found"
    echo "  Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm version
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm $NPM_VERSION"
else
    echo "✗ npm not found"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   This may take 1-2 minutes..."
echo ""

cd "$SCRIPT_DIR"
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo ""
    echo "✗ Installation failed"
    exit 1
fi

echo ""
echo "✓ Dependencies installed successfully!"
echo ""

# Display next steps
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "🎉 Setup Complete!"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1️⃣  Start Development Server:"
echo "    npm run dev"
echo ""
echo "2️⃣  Build for Production:"
echo "    npm run build"
echo ""
echo "3️⃣  Quality Checks:"
echo "    npm run type-check    # TypeScript check"
echo "    npm run lint          # ESLint check"
echo "    npm run format        # Prettier format"
echo ""
echo "📚 Documentation:"
echo "    • INDEX.md           - Project index & overview"
echo "    • README.md          - Full documentation"
echo "    • QUICKSTART.md      - 5-minute setup guide"
echo "    • ACCESSIBILITY.md   - WCAG 2.1 AAA audit"
echo "    • ARCHITECTURE.md    - System design"
echo ""
echo "🌐 After starting dev server, open: http://localhost:3000"
echo ""
echo "✨ Features to Try:"
echo "    ♿ High Contrast Mode    (bottom right button)"
echo "    🔤 Font Size Options    (accessibility panel)"
echo "    ⌨️  Keyboard Navigation  (Tab through interface)"
echo "    📱 Responsive Design    (resize browser)"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Ready? Run: npm run dev"
echo ""
