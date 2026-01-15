#!/bin/bash

# Banking Dashboard - Installation Script
# Run this script to install dependencies and start development

echo "🏦 Banking Dashboard - Installation Guide"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project directory
cd "$(dirname "$0")" || exit

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Next steps:"
    echo ""
    echo "1. Start development server:"
    echo "   npm run dev"
    echo ""
    echo "2. Build for production:"
    echo "   npm run build"
    echo ""
    echo "3. Run type checking:"
    echo "   npm run type-check"
    echo ""
    echo "4. Lint code:"
    echo "   npm run lint"
    echo ""
    echo "5. Format code:"
    echo "   npm run format"
    echo ""
    echo "📖 Documentation:"
    echo "   - README.md - Full documentation"
    echo "   - QUICKSTART.md - 5-minute setup"
    echo "   - ACCESSIBILITY.md - A11y audit"
    echo "   - ARCHITECTURE.md - System design"
    echo ""
    echo "Happy coding! 🎉"
else
    echo "❌ Installation failed"
    exit 1
fi
