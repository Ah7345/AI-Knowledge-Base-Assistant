# AI Knowledge Base Assistant

A smart assistant for businesses that responds from their documents (PDFs, Docs, Excel). Built with LangChain, FastAPI, ChromaDB, and React.

## Features

- **Document Upload**: Upload PDF, DOCX, TXT, and XLSX files
- **RAG-based Q&A**: Ask questions about your documents
- **Conversational AI**: Maintains conversation context
- **Source Citations**: Shows which documents were used for answers
- **Modern UI**: Clean and professional React interface

## Tech Stack

- **Backend**: FastAPI, LangChain, ChromaDB, OpenAI
- **Frontend**: React, Vite, Axios
- **Database**: ChromaDB (vector database)
- **LLM**: OpenAI GPT-3.5-turbo

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- OpenAI API key

### Setup Instructions

1. **Clone and navigate to the project**
```bash
cd ai-kb-assistant
```

2. **Setup Backend**

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file from the example:
```bash
cp env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Setup Frontend**

```bash
cd ../frontend
npm install
```

4. **Run the Application**

**Option A: Run separately**

Terminal 1 (Backend):
```bash
cd backend
python app.py
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

**Option B: Use Docker Compose**
```bash
docker-compose up -d
```

5. **Access the Application**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Usage

1. **Upload Documents**: Click "Upload Documents" and select a file (PDF, DOCX, TXT, XLSX)
2. **Ask Questions**: Type your question in the chat interface
3. **Get Answers**: Receive AI-powered responses based on your documents

## Project Structure

```
ai-kb-assistant/
├── backend/
│   ├── app.py                 # FastAPI application
│   ├── rag_pipeline.py       # RAG implementation
│   ├── ingest.py              # Document ingestion
│   ├── requirements.txt       # Python dependencies
│   ├── env.example            # Environment variables template
│   └── storage/               # ChromaDB persistent storage
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx           # Entry point
│   │   ├── App.jsx            # Main app component
│   │   ├── api.js             # API client
│   │   └── components/
│   │       ├── Chat.jsx        # Chat interface
│   │       └── Uploader.jsx   # Document uploader
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml         # Docker orchestration
└── README.md
```

## API Endpoints

- `GET /` - API status
- `GET /health` - Health check
- `POST /upload` - Upload documents
- `POST /ask` - Ask questions
- `GET /documents` - List uploaded documents
- `DELETE /documents` - Clear all documents

## Environment Variables

### Backend (.env)
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:8000)

## Development

### Backend Development
```bash
cd backend
python app.py
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose up --build
```

## Limitations

- Requires OpenAI API key (not free)
- Documents are stored locally
- First-time setup requires API key configuration

## License

MIT License

