from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.document_loaders import UnstructuredWordDocumentLoader, UnstructuredExcelLoader
from rag_pipeline import RAGPipeline
from typing import Dict
import os

class Ingestor:
    """Document ingestor for processing various file types"""
    
    def __init__(self, rag_pipeline: RAGPipeline):
        self.rag_pipeline = rag_pipeline
    
    def ingest_document(self, file_path: str) -> Dict:
        """
        Ingest a document and add it to the vector store
        
        Args:
            file_path: Path to the document file
        
        Returns:
            Dictionary with ingestion results
        """
        try:
            # Load document based on file type
            docs = self._load_document(file_path)
            
            if not docs or len(docs) == 0:
                return {"success": False, "chunks": 0, "error": "No content extracted from document"}
            
            # Split documents into chunks
            text_splitter = self.rag_pipeline.text_splitter
            chunks = text_splitter.split_documents(docs)
            
            # Prepare metadata
            base_filename = os.path.basename(file_path)
            metadatas = [{"source": base_filename} for _ in chunks]
            
            # Add to vector store
            self.rag_pipeline.add_documents(
                texts=[chunk.page_content for chunk in chunks],
                metadatas=metadatas
            )
            
            return {"success": True, "chunks": len(chunks)}
            
        except Exception as e:
            return {"success": False, "chunks": 0, "error": str(e)}
    
    def _load_document(self, file_path: str):
        """Load document using appropriate loader"""
        file_ext = os.path.splitext(file_path)[1].lower()
        
        try:
            print(f"Loading document: {file_path} with extension: {file_ext}")
            
            if file_ext == ".pdf":
                loader = PyPDFLoader(file_path)
                docs = loader.load()
                print(f"Loaded {len(docs)} pages from PDF")
                return docs
            
            elif file_ext == ".txt":
                loader = TextLoader(file_path, encoding="utf-8")
                docs = loader.load()
                print(f"Loaded {len(docs)} documents from text file")
                return docs
            
            elif file_ext == ".docx":
                loader = UnstructuredWordDocumentLoader(file_path)
                docs = loader.load()
                print(f"Loaded {len(docs)} elements from DOCX")
                return docs
            
            elif file_ext in [".xlsx", ".xls"]:
                loader = UnstructuredExcelLoader(file_path, mode="elements")
                docs = loader.load()
                print(f"Loaded {len(docs)} elements from Excel")
                return docs
            
            else:
                raise ValueError(f"Unsupported file type: {file_ext}")
        
        except Exception as e:
            print(f"Error loading document: {e}")
            import traceback
            traceback.print_exc()
            raise

