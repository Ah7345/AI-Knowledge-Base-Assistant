from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import uvicorn
from ingest import Ingestor
from rag_pipeline import RAGPipeline

app = FastAPI(title="AI Knowledge Base Assistant")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG pipeline
rag_pipeline = None

# Request models
class QuestionRequest(BaseModel):
    question: str
    conversation_history: Optional[List[dict]] = []

class AnswerResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = []

@app.on_event("startup")
async def startup_event():
    """Initialize the RAG pipeline on startup"""
    global rag_pipeline
    try:
        # Get storage path from env or use default
        storage_path = os.getenv("PERSIST_DIR", "storage")
        if not os.path.exists(storage_path):
            os.makedirs(storage_path)
        rag_pipeline = RAGPipeline()
        print("RAG Pipeline initialized successfully")
    except Exception as e:
        print(f"Error initializing RAG pipeline: {e}")

@app.get("/")
async def root():
    return {"message": "AI Knowledge Base Assistant API", "status": "running"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "rag_ready": rag_pipeline is not None}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload and process documents"""
    try:
        if not rag_pipeline:
            raise HTTPException(status_code=500, detail="RAG pipeline not initialized")
        
        # Validate file type
        allowed_extensions = {'.pdf', '.docx', '.xlsx', '.txt', '.csv'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400, 
                detail=f"File type {file_ext} not supported. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # Save file temporarily
        upload_dir = "uploads"
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Ingest document
        ingestor = Ingestor(rag_pipeline)
        result = ingestor.ingest_document(file_path)
        
        # Clean up temp file
        os.remove(file_path)
        
        return {
            "message": "File processed successfully",
            "filename": file.filename,
            "chunks": result.get("chunks", 0)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    """Ask a question to the knowledge base"""
    try:
        if not rag_pipeline:
            raise HTTPException(status_code=500, detail="RAG pipeline not initialized")
        
        answer, sources = rag_pipeline.query(request.question, request.conversation_history)
        
        return AnswerResponse(answer=answer, sources=sources)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

@app.get("/documents")
async def list_documents():
    """List all ingested documents"""
    try:
        if not rag_pipeline:
            raise HTTPException(status_code=500, detail="RAG pipeline not initialized")
        
        documents = rag_pipeline.list_documents()
        return {"documents": documents}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing documents: {str(e)}")

@app.delete("/documents")
async def clear_documents():
    """Clear all documents from the knowledge base"""
    try:
        if not rag_pipeline:
            raise HTTPException(status_code=500, detail="RAG pipeline not initialized")
        
        rag_pipeline.clear_database()
        return {"message": "All documents cleared successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing documents: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

