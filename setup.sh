#!/bin/bash

echo "🚀 Setting up AI Knowledge Base Assistant..."

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Check for Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Setup backend
echo "📦 Setting up backend..."
cd backend
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp env.example .env
    echo "⚠️  Created .env file. Please add your OPENAI_API_KEY!"
fi

cd ..

# Setup frontend
echo "📦 Setting up frontend..."
cd frontend
npm install

cd ..

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Run 'cd backend && python app.py' in one terminal"
echo "3. Run 'cd frontend && npm run dev' in another terminal"
echo ""
echo "Or use Docker: docker-compose up"

